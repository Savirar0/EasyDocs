import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
} from "@xyflow/react";
import "../index.css";

function Boards() {
  const { role, companyId, companyName, token } = useAuth();
  const [board, setBoard] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  

  const mapBoardNodes = (galaxiesList=[]) => {
    const flowNodes = []

    galaxiesList.forEach((galaxy)=>{
      flowNodes.push({
        id: String(galaxy.id),
        position: {
          x: Number(galaxy.x_position) || 0,
          y: Number(galaxy.y_position) || 0
        },
        style: {
          width: Number(galaxy.width) || 500,
          height: Number(galaxy.height) || 500,
          backgroundColor: "rgba(241, 245, 249, 0.6)",
          border: "1px dashed #94a3b8",
          borderRadius: "12px",
        },
        data: {
          label: galaxy.name,
          nodeCategory: "galaxy",
        }
      });

      (galaxy.assets||[]).forEach((asset)=>{
        flowNodes.push({
          id: String(asset.id),
          parentId: String(galaxy.id),
          extent: "parent",
          position: {
            x: Number(asset.x_position) || 20,
            y: Number(asset.y_position) || 40,
          },
          data: {
            label: asset.name,
            file: asset.file,
            uploadedBy: asset.uploaded_by,
            nodeCategory: "asset",
          },
        });
      });

    });
    return flowNodes
  }; 
  

  const getPrimaryBoard = async ()=>{
    if (!token){
        return{
            success: false,
            error: "Cannot access this data."
        }
    }else{
      try {
        const response = await fetch('http://127.0.0.1:8000/api/workspace/board/', {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + token,
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("Fetched Primary board data: ", data);
        setBoard(data.id);
        setNodes(mapBoardNodes(data.galaxies));
      } catch (error) {
        console.error('Dashboard Fetch Error:', error);
      }
    }
  }
  
  useEffect(()=>{
    getPrimaryBoard();
  }, [token])

  return (
    <div className="w-screen h-screen bg-slate-50">
      {board && (
        <div className="absolute top-4 left-4 z-10 rounded-lg bg-white/80 backdrop-blur px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
          {board.company} · {board.board}
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background variant="dots" gap={20} size={3} color="#cbd5e1" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Boards;