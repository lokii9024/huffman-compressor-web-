const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

// define a simple node
class Node{
    constructor(char,freq,left=null,right=null){
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

// define the minHeap class
class MinHeap{
    constructor(){
        this.heap = [];
    }

    insert(node){
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp(){
        let index = this.heap.length - 1; // new node's index
        while(index > 0){
            let parentIndex = Math.floor((index - 1)/2);
            if(this.heap[parentIndex].freq > this.heap[index].freq){
                [this.heap[parentIndex],this.heap[index]] = [this.heap[index],this.heap[parentIndex]];
                index = parentIndex;
            }
            else{
                break;
            }
        }
    }

    extractMin(){
        if(this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index){
        let left = 2*index + 1;
        let right = 2*index + 2;
        let smallest = index;

        if(left < this.heap.length && this.heap[left].freq < this.heap[smallest].freq){
            smallest = left;
        }

        if(right < this.heap.length && this.heap[right].freq < this.heap[smallest].freq){
            smallest = right;
        }

        if(smallest !== index){
            [this.heap[smallest],this.heap[index]] = [this.heap[index],this.heap[smallest]];
            this.bubbleDown(smallest);
        }
    }

    size(){
        return this.heap.length;
    }
}

// function to build the huffman tree
function buildHuffmanTree(freqMap){
    const minHeap = new MinHeap();

    for(const [char,freq] of freqMap.entries()){
        minHeap.insert(new Node(char,freq));
    }

    while(minHeap.size() > 1){
        let left = minHeap.extractMin();
        let right = minHeap.extractMin();
        let merged = new Node(null,left.freq + right.freq,left,right);
        minHeap.insert(merged);
    }

    return minHeap.extractMin();
}