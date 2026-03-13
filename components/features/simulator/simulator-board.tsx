"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  Connection,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Sidebar } from "@/components/features/simulator/sidebar";
import { SystemNode } from "@/components/features/simulator/system-node";
import { Button } from "@/components/ui/button";
import { Play, Save, Trash2 } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const nodeTypes = {
  system: SystemNode,
};

let id = 0;
const getId = () => `node_${id++}`;

export function SimulatorBoard({ initialData }: { initialData: any }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges || []);
  const [isRunning, setIsRunning] = useState(false);
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const { getToken } = useAuth();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: isRunning }, eds)),
    [isRunning, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = { x: event.clientX - 300, y: event.clientY - 100 };
      const newNode = {
        id: getId(),
        type: "system",
        position,
        data: { label: `${type.replace('_', ' ')}`, type: type, isRunning: false },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await getToken({ template: "supabase" });
      const supabase = createSupabaseClient(token || undefined);
      
      const { error } = await supabase
        .from("simulations")
        .update({
          nodes,
          edges,
        })
        .eq("id", params.id);

      if (error) throw error;
      toast.success("Simulation saved!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save simulation.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSimulation = () => {
    const newState = !isRunning;
    setIsRunning(newState);
    
    // Update all edges and nodes visual state
    setEdges((eds) => eds.map((e) => ({ ...e, animated: newState, style: { stroke: newState ? "#00FF00" : undefined } })));
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, isRunning: newState } })));
    
    if (newState) {
      toast.success("Simulation started! Data is flowing...");
    } else {
      toast.info("Simulation stopped.");
    }
  };

  const deleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  }, [setNodes, setEdges]);

  return (
    <div className="flex h-full w-full bg-background overflow-hidden border rounded-xl shadow-2xl">
      <Sidebar />
      <div className="flex-grow h-full relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={() => {}}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          className="bg-muted/5"
        >
          <Background color="#ccc" variant={"dots" as any} gap={20} />
          <Controls />
          
          <Panel position="top-right" className="flex gap-2">
            <Button variant="outline" size="sm" onClick={deleteSelected} className="gap-2 bg-card">
              <Trash2 className="w-4 h-4 text-destructive" /> Delete
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="gap-2 bg-card">
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
            </Button>
            <Button onClick={toggleSimulation} variant={isRunning ? "destructive" : "default"} size="sm" className="gap-2 shadow-lg">
              <Play className={isRunning ? "fill-current" : ""} size={16} /> 
              {isRunning ? "Stop simulation" : "Run simulation"}
            </Button>
          </Panel>

          <Panel position="top-left" className="flex gap-2">
             <div className="px-4 py-2 bg-card border rounded-lg shadow-sm flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span className="text-xs font-mono font-bold uppercase tracking-widest">{initialData.name}</span>
             </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default function SimulatorContainer({ initialData }: { initialData: { nodes: any[], edges: any[], name: string } }) {
  return (
    <ReactFlowProvider>
      <SimulatorBoard initialData={initialData} />
    </ReactFlowProvider>
  );
}
