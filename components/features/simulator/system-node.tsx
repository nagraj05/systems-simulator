"use client";

import { Handle, Position } from "@xyflow/react";
import { Terminal, Cpu, Database, Cloud, HardDrive, Share2, Layers, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  client: Terminal,
  server: Cpu,
  database: Database,
  api_gateway: Share2,
  cache: Zap,
  cdn: Cloud,
  lb: Layers,
  mq: HardDrive,
};

const colorMap = {
  client: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  server: "text-primary bg-primary/10 border-primary/20",
  database: "text-green-500 bg-green-500/10 border-green-500/20",
  api_gateway: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  cache: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  cdn: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  lb: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  mq: "text-amber-500 bg-amber-500/10 border-amber-500/20",
};

export function SystemNode({ data, selected }: any) {
  const Icon = iconMap[data.type as keyof typeof iconMap] || Cpu;
  const colors = colorMap[data.type as keyof typeof colorMap] || colorMap.server;

  return (
    <div className={cn(
      "px-4 py-2 shadow-md rounded-md bg-card border-2 transition-all min-w-[140px]",
      selected ? "border-primary shadow-lg ring-1 ring-primary/50" : "border-border",
      data.isRunning ? "animate-pulse ring-2 ring-primary/20" : ""
    )}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-muted-foreground border-none" />
      
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg border", colors)}>
          <Icon size={18} />
        </div>
        <div className="flex-grow">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{data.type.replace('_', ' ')}</div>
          <div className="text-sm font-semibold">{data.label}</div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-primary border-none" />
    </div>
  );
}
