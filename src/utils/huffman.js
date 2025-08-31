const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

let nodeId = 0; // global counter for unique IDs

// define a simple node
class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
        this.id = nodeId++; // unique ID for tie-breaking
    }
}

// define the minHeap class
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if (
                this.heap[parentIndex].freq > this.heap[index].freq ||
                (this.heap[parentIndex].freq === this.heap[index].freq &&
                 this.heap[parentIndex].id > this.heap[index].id)
            ) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if (
            left < this.heap.length &&
            (this.heap[left].freq < this.heap[smallest].freq ||
             (this.heap[left].freq === this.heap[smallest].freq &&
              this.heap[left].id < this.heap[smallest].id))
        ) {
            smallest = left;
        }

        if (
            right < this.heap.length &&
            (this.heap[right].freq < this.heap[smallest].freq ||
             (this.heap[right].freq === this.heap[smallest].freq &&
              this.heap[right].id < this.heap[smallest].id))
        ) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            this.bubbleDown(smallest);
        }
    }

    size() {
        return this.heap.length;
    }
}

// function to build the huffman tree
function buildHuffmanTree(freqMap) {
    const minHeap = new MinHeap();

    for (const [char, freq] of freqMap.entries()) {
        minHeap.insert(new Node(char, freq));
    }

    while (minHeap.size() > 1) {
        let left = minHeap.extractMin();
        let right = minHeap.extractMin();
        let merged = new Node(null, left.freq + right.freq, left, right);
        minHeap.insert(merged);
    }

    return minHeap.extractMin();
}

//generate codes from the huffman tree
function generateCodes(node,prefix = "",codeMap = new Map()){
    if(!node) return;
    if(node.char != null){
        codeMap.set(node.char,prefix);
    }

    generateCodes(node.left,prefix + "0",codeMap);
    generateCodes(node.right,prefix + "1",codeMap);

    return codeMap;
}

// function to read file
async function readFile(file){
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reader(reject(reader.error))
        reader.readAsText(file);
    })
}

//build the frequency map
function buildFrequencyMap(text){
    const freqMap = new Map();
    for(const char of text){
        freqMap.set(char,(freqMap.get(char) || 0) + 1);
    }

    return freqMap;
}

//excode the text into bit string
function encodeText(text){
    const freqMap = buildFrequencyMap(text);
    const root = buildHuffmanTree(freqMap);
    const codeMap = generateCodes(root);

    let bitString = "";
    for(const char of text){
        bitString += codeMap.get(char);
    }
    return {bitString,freqMap};
}

//pack bits
function packBits(bitString){
    let byteArray = [];

    for(let i = 0;i<bitString.length;i += 8){
        let byte = bitString.substring(i,i+8);

        while(byte.length < 8){
            byte += "0";
        }

        byteArray.push(parseInt(byte,2));
    }

    return new Uint8Array(byteArray);
}

//compress function
export async function compress(file){
    const text = await readFile(file);
    const {bitString,freqMap} = encodeText(text);
    const packedData = packBits(bitString);

    // Prepare frequency map for storage
    const freqJson = JSON.stringify(Object.fromEntries(freqMap));
    const headerObj = {
        textLength: text.length,
        validBits: bitString.length % 8 === 0 ? 8 : bitString.length % 8,
        freqMap: freqJson
    }    

    const headerStr = JSON.stringify(headerObj)
    const headerBytes = textEncoder.encode(headerStr);

    //final file
    const finalData = new Uint8Array(headerBytes.length + 1 + packedData.length);
    finalData.set(headerBytes,0);
    finalData.set([10],headerBytes.length);
    finalData.set(packedData,headerBytes.length + 1);

    //save the file
    const blob = new Blob([finalData],{
        type: "application/octet-stream"
    })

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name + ".huff";
    a.click()
}