import { Navbar } from "@/components/shared/navbar";
import { Hero } from "@/components/features/landing/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* How it works section */}
        <section id="how-it-works" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">How it works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                SYS-SIM simplifies complex architecture design with real-time feedback and visualization.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Design", desc: "Drag and drop components to build your architecture.", icon: Rocket },
                { title: "Simulate", desc: "Run your simulation and watch data flow across nodes.", icon: Zap },
                { title: "Analyze", desc: "Identify bottlenecks and points of failure instantly.", icon: Shield }
              ].map((feature, i) => (
                <Card key={i} className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Transparent Pricing</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the plan that fits your needs. Start for free, upgrade when you&apos;re ready.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-border/50 relative overflow-hidden group">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <CardDescription>Perfect for students and beginners</CardDescription>
                  <div className="text-4xl font-bold mt-6 tracking-tighter">$0 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 my-8">
                    <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary" /> 3 Active Simulations</li>
                    <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary" /> Standard Component Library</li>
                    <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary" /> Basic Data Flow Analysis</li>
                    <li className="flex items-center gap-3 text-sm text-muted-foreground/50"><Rocket className="w-4 h-4" /> Multi-region simulation</li>
                  </ul>
                  <Button className="w-full h-11" variant="outline">Current Plan</Button>
                </CardContent>
              </Card>
              <Card className="border-primary relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] px-3 py-1 rounded-bl-lg font-bold uppercase tracking-widest">Best Value</div>
                <CardHeader>
                  <CardTitle className="text-2xl">Architect</CardTitle>
                  <CardDescription>For professionals and teams</CardDescription>
                  <div className="text-4xl font-bold mt-6 tracking-tighter">$19 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 my-8">
                    <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary" /> Unlimited Simulations</li>
                    <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary" /> Advanced Metrics & Reports</li>
                    <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary" /> Custom Node Implementation</li>
                    <li className="flex items-center gap-3 text-sm"><Check className="w-4 h-4 text-primary" /> Export to Mermaid/Terraform</li>
                  </ul>
                  <Button className="w-full h-11" disabled>Coming Soon</Button>
                  <p className="text-[10px] text-center mt-4 text-muted-foreground uppercase tracking-widest">Waitlist Open</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 border-t bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-bold tracking-tighter mb-4">
             <span className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs">S</span>
             SYS-SIM
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SYS-SIM. The ultimate playground for system design.
          </p>
        </div>
      </footer>
    </div>
  );
}
