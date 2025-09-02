import Tree from "react-d3-tree";
import { buildTreeDataForCompression, buildTreeDataForDecompression } from "../utils/treeData.js";
import { useState, useEffect } from "react";

export default function HuffmanTree({ file,action }) {
  const [treeData, setTreeData] = useState(null);
  useEffect(() => {
    async function fetchTreeData() {
      let tree;
      if( action === "Compression" ) {
        tree = await buildTreeDataForCompression(file);
      } else if( action === "Decompression" ) {
        tree = await buildTreeDataForDecompression(file);
      }
      setTreeData(tree);
    }
    if (file && action) {
      fetchTreeData();
    }
  },[action,file]);

  if(!treeData || !treeData.children || treeData.children.length === 0){
    return <div style={{textAlign:"center",color:"black",paddingTop:"20px"}}>Tree data not available</div>
  }
  // Custom node renderer with edge labels
  const renderCustomNode = ({ nodeDatum, hierarchyPointNode }) => (
    <g>
      <circle r={15} fill="#4CAF50" stroke="white" strokeWidth="2" />
      <text fill="white" x={20} dy=".35em" fontSize="12">
        {nodeDatum.name}
      </text>
      {hierarchyPointNode.parent && (
        <text
          x={(hierarchyPointNode.parent.x - hierarchyPointNode.x) / 2}
          y={(hierarchyPointNode.parent.y - hierarchyPointNode.y) / 2}
          textAnchor="middle"
          fill="yellow"
          fontSize="12"
        >
          {nodeDatum.attributes?.edge}
        </text>
      )}
    </g>
  );

  return (
    <div style={{ width: "100%", height: "500px", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>
      <Tree
        data={treeData}
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode}
      />
    </div>
  );
}
