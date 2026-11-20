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
  const [galaxies, setGalaxies] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  

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
            setGalaxies(data.galaxies);
            } catch (error) {
                console.error('Dashboard Fetch Error:', error);
            }
        }
    }


  return (
    <div className="w-screen h-screen bg-slate-50">
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