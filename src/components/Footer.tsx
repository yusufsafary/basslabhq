import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              BassLab HQ
            </span>
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} BassLabHQ.com
            </span>
          </div>
          
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/generator" className="hover:text-primary transition-colors">Generator</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}