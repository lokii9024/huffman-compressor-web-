import {buildHuffmanTree,buildFrequencyMap,readFile} from "./huffman.js";

function convertToTreeData(node, edgeLabel = ""){
    if(!node) return null;

    const label = node.char === null ? `* (${node.freq})` : `${node.char} (${node.freq})`;

    return {
        name : label,
        attributes: {
            edge:edgeLabel,
        },
        children: [
            convertToTreeData(node.left, "0"),
            convertToTreeData(node.right,"1")
        ].filter(Boolean)
    }
}

export const buildTreeDataForCompression = async (file) => {
    const text = await readFile(file);
    const freqMap = buildFrequencyMap(text);
    const root = buildHuffmanTree(freqMap);

    const treeData = convertToTreeData(root);
    console.log(treeData)
    return treeData;
}

export const buildTreeDataForDecompression = async (file) => {
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

    const root = buildHuffmanTree(freqMap);
    const treeData = convertToTreeData(root);
    console.log(treeData)
    return treeData;
}


