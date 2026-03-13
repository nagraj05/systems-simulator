"use client";

import { Terminal, Cpu, Database, Share2, Zap, Cloud, Layers, HardDrive } from "lucide-react";
import { Card } from "@/components/ui/card";

const elements = [
  { type: "client", label: "Client", icon: Terminal, color: "text-blue-500" },
  { type: "api_gateway", label: "API Gateway", icon: Share2, color: "text-purple-500" },
  { type: "lb", label: "Load Balancer", icon: Layers, color: "text-rose-500" },
  { type: "server", label: "Web Server", icon: Cpu, color: "text-primary" },
  { type: "cache", label: "Redis Cache", icon: Zap, color: "text-orange-500" },
  { type: "database", label: "Database", icon: Database, color: "text-green-500" },
  { type: "cdn", label: "CDN", icon: Cloud, color: "text-sky-500" },
  { type: "mq", label: "Msg Queue", icon: HardDrive, color: "text-amber-500" },
];

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 border-r bg-card h-full p-4 overflow-y-auto">
      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Components</h3>
      <div className="grid gap-3">
        {elements.map((el) => (
          <div
            key={el.type}
            className="group cursor-grab active:cursor-grabbing"
            onDragStart={(event) => onDragStart(event, el.type)}
            draggable
          >
            <Card className="p-3 flex items-center gap-3 hover:border-primary transition-colors border-dashed bg-muted/20">
              <div className={`p-2 rounded-lg bg-background ${el.color} border border-border group-hover:border-primary/50 transition-colors`}>
                <el.icon size={18} />
              </div>
              <span className="text-sm font-medium">{el.label}</span>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-4 rounded-xl bg-primary/5 border border-primary/20">
         <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
           <Zap size={10} /> Pro Tip
         </p>
         <p className="text-xs text-muted-foreground leading-relaxed">
           Drag components onto the canvas and link them from bottom to top handles to define data flow.
         </p>
      </div>
    </aside>
  );
}
