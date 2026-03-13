"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Plus, Layout, Clock, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { CreateSimulationModal } from "@/components/features/dashboard/create-simulation-modal";
import { useQuery } from "@tanstack/react-query";
import { createSupabaseClient } from "@/lib/supabase";
import { SimulationSkeleton } from "@/components/skeletons/simulation-skeleton";

export default function Dashboard() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch simulations
  const { data: simulations, isLoading } = useQuery({
    queryKey: ["simulations", user?.id],
    queryFn: async () => {
      const token = await getToken({ template: "supabase" });
      const supabase = createSupabaseClient(token || undefined);
      
      const { data, error } = await supabase
        .from("simulations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.firstName || "Architect"}.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" /> Create Simulation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Simulations Used</CardTitle>
                <div className="text-2xl font-bold">{simulations?.length || 0} / 3</div>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all" 
                    style={{ width: `${Math.min(((simulations?.length || 0) / 3) * 100, 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            {/* Additional stats cards can go here */}
          </div>

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Layout className="w-5 h-5 text-primary" /> Recent Simulations
          </h2>

          {isLoading ? (
             <SimulationSkeleton />
          ) : simulations && simulations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {simulations.map((sim) => (
                <Card key={sim.id} className="hover:border-primary transition-colors group cursor-pointer overflow-hidden">
                  <CardHeader className="pb-3 text-left">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {sim.name}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">{sim.description || "No description provided."}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(sim.created_at).toLocaleDateString()}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-card">
               <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
               <h3 className="text-lg font-medium mb-2">No simulations yet</h3>
               <p className="text-muted-foreground mb-6">Create your first system design simulation to get started.</p>
               <Button onClick={() => setIsModalOpen(true)} variant="outline">Create Simulation</Button>
            </div>
          )}
        </div>
      </main>

      <CreateSimulationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        simCount={simulations?.length || 0}
      />
    </div>
  );
}
