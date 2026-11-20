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