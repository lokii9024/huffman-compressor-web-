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
export function buildHuffmanTree(freqMap) {
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
export async function readFile(file){
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reader(reject(reader.error))
        reader.readAsText(file);
    })
}

//build the frequency map
export function buildFrequencyMap(text){
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
export async function compressFile(file){
    const text = await readFile(file);
    const {bitString,freqMap} = encodeText(text);
    const packedData = packBits(bitString);

    // Prepare header
    const entries = Array.from(freqMap.entries())
    const headerSize = 2 + entries.length * (1 + 4) + 5;
    // 2 for count, (1+4) per entry, +5 for metadata

    const header = new Uint8Array(headerSize);
    let offset = 0;

    //number of unique symbols
    header[offset++] = entries.length & 0xff;
    header[offset++] = (entries.length >> 8) & 0xff

    //store metadata (valid bits and text length)
    const textLength = text.length
    const validBits = bitString.length % 8 === 0 ? 8 : bitString.length % 8;

    header[offset++] = validBits;
    header[offset++] = textLength & 0xff;
    header[offset++] = (textLength >> 8) & 0xff;
    header[offset++] = (textLength >> 16) & 0xff;
    header[offset++] = (textLength >> 24) & 0xff;
    
    //store frequency map
    for(const [char,freq] of entries){
        header[offset++] = char.charCodeAt(0) & 0xff;
        header[offset++] = (freq >> 0) & 0xff;
        header[offset++] = (freq >> 8) & 0xff;
        header[offset++] = (freq >> 16) & 0xff;
        header[offset++] = (freq >> 24) & 0xff;
    }

    //final file
    const finalData = new Uint8Array(header.length + 1 + packedData.length);
    finalData.set(header,0);
    finalData.set([10],header.length);
    finalData.set(packedData,header.length + 1);

    //analytics
    const originalSize = file.size;
    const compressedSize = finalData.length;
    const ratio = ((originalSize/compressedSize)*100).toFixed(2)
    const saved = ((1 - compressedSize/originalSize)*100).toFixed(2);
    console.log("originalSize:",originalSize,"compressedSize:",compressedSize,"ratio:",ratio,"saved:",saved);

    //save the file
    const blob = new Blob([finalData],{
        type: "application/octet-stream"
    })

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name + ".huff";
    a.click()
    
    const result = {
        originalSize,
        compressedSize,
        ratio,
        saved
    }

    return result;
}

export async function decompressFile(file){
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    let offset = 0;
    const uniqueSymbols = data[offset++] | (data[offset++] << 8);

    const validBits = data[offset++];
    const textLength = data[offset++] | (data[offset++] << 8) | (data[offset++] << 16) | (data[offset++] << 24);

    const freqMap = new Map();
    for(let i = 0;i<uniqueSymbols;i++){
        const char = String.fromCharCode(data[offset++]);
        const freq = data[offset++] | (data[offset++] << 8) | (data[offset++] << 16) | (data[offset++] << 24);
        freqMap.set(char,freq);
    }

    //skip the delimiter
    offset++;

    const packedData = data.slice(offset);
    //unpack bits
    let bitString = "";
    for(let i = 0;i<packedData.length;i++){
        let byte = packedData[i].toString(2).padStart(8,"0")
        if(i === packedData.length - 1){
            byte = byte.slice(0,validBits)
        }
        bitString += byte;
    }

    //rebuild huffman tree
    const root = buildHuffmanTree(freqMap);

    //decode the bit string
    let result = "";
    let currentNode = root;

    for(const bit of bitString){
        currentNode = bit === "0"? currentNode.left : currentNode.right;

        if(currentNode.char != null){
            result += currentNode.char;
            currentNode = root;
            if(result.length === textLength) break;
        }
    }

    //analytics
    const originalSize = file.size;
    const decompressedSize = textEncoder.encode(result).length;
    const ratio = ((decompressedSize/originalSize)*100).toFixed(2)
    const saved = ((1 - originalSize/decompressedSize)*100).toFixed(2);
    console.log("originalSize:",originalSize,"decompressedSize:",decompressedSize,"ratio:",ratio,"saved:",saved);

    const decompressionResult = {
        originalSize,
        decompressedSize,
        ratio,
        saved
    }

    //save the file
    const blob = new Blob([textEncoder.encode(result)],{
        type: "text/plain"
    })

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name.replace(/\.huff$/,"") || "decompressed.txt";
    a.click();

    return decompressionResult;
}