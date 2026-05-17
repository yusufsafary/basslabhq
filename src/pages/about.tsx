import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Code, Anchor } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/50 font-mono tracking-wider">
          INITIATIVE 001
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          The Story of BassLab HQ
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
      </div>

      <div className="prose prose-invert prose-lg max-w-none font-sans">
        <p className="text-xl text-muted-foreground leading-relaxed mb-10 text-center">
          We build precision tools for players who take virtual fishing seriously. No fluff, no guesswork — just data-driven tactical advantages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 not-prose">
          <Card className="bg-card/50 border-border rounded-none">
            <CardContent className="pt-6">
              <Activity className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Data Driven</h3>
              <p className="text-sm text-muted-foreground">
                We analyze simulation heuristics to determine exactly what works and what does not.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border rounded-none">
            <CardContent className="pt-6">
              <Code className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Developer Built</h3>
              <p className="text-sm text-muted-foreground">
                Created by software engineers who spend way too much time in fishing simulators.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border rounded-none">
            <CardContent className="pt-6">
              <Anchor className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p className="text-sm text-muted-foreground">
                Built for the community, shaped by feedback, and constantly evolving.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2>Our Mission</h2>
        <p>
          Fishing simulators have evolved from simple arcade games into complex ecosystems with dynamic weather, intricate fish AI, and thousands of tackle combinations. We realized that to truly master these games, players needed better tools than scattered forum posts and outdated spreadsheets.
        </p>
        <p>
          BassLab HQ was born out of frustration with the status quo. We wanted a central hub where players could input their current game state and get actionable, high-probability advice instantly. 
        </p>
        <p>
          We do not guarantee you will catch a trophy every cast — that takes skill. But we do guarantee you will be in the right place, with the right gear, at the right time.
        </p>

        <div className="mt-16 p-8 bg-primary/10 border border-primary/30 rounded-none text-center not-prose">
          <h3 className="text-2xl font-bold mb-2 text-foreground font-mono">Join the Lab</h3>
          <p className="text-muted-foreground mb-0 font-mono text-sm">
            We are always looking for data contributions from tournament players. Contact us to get involved.
          </p>
        </div>
      </div>
    </div>
  );
}