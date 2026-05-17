import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Anchor, Compass, Target, Fish } from 'lucide-react';

const features = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Precision Coordinates",
    description: "Get exactly where you need to be. Pinpoint locations tailored to species, weather, and time of day."
  },
  {
    icon: <Anchor className="h-8 w-8 text-secondary" />,
    title: "Optimized Loadouts",
    description: "Stop guessing your tackle. We provide the highest-probability rig setups for any given condition."
  },
  {
    icon: <Compass className="h-8 w-8 text-primary" />,
    title: "Dynamic Modifiers",
    description: "Whether it is a rainy dawn or a sunny afternoon, adjust the parameters to match your current game state."
  },
  {
    icon: <Fish className="h-8 w-8 text-secondary" />,
    title: "Tournament Grade",
    description: "Built for players who want to win. Our generator uses advanced heuristics to mimic real simulation data."
  }
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-32 lg:py-48 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Dive Deeper into <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Fishing Simulation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 font-mono">
              Precision Tools for Fishing Simulation Players
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generator" data-testid="link-hero-generator">
                <Button size="lg" className="text-lg px-8 py-6 rounded-none font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
                  Launch Generator
                </Button>
              </Link>
              <Link href="/about" data-testid="link-hero-about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-none font-bold border-primary/50 hover:bg-primary/10 hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-y border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Ultimate Tactical Advantage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our tools are designed to remove the guesswork from your sessions, letting you focus on the fight.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 bg-background rounded border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="mb-4 bg-card w-16 h-16 flex items-center justify-center rounded border border-border group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}