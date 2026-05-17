import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, Share2, MapPin, Fish, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const LAKES = ['Mirror Lake', 'Thunder Bay', 'Crystal Cove', 'Deep Haven'];
const SPECIES = ['Largemouth Bass', 'Striped Bass', 'Trout', 'Catfish', 'Northern Pike'];
const DIFFICULTIES = ['Novice', 'Intermediate', 'Expert', 'Tournament'];
const WEATHER = ['Sunny', 'Cloudy', 'Rainy', 'Storm'];
const TIME_OF_DAY = ['Dawn', 'Morning', 'Afternoon', 'Dusk', 'Night'];
const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

const formSchema = z.object({
  lake: z.string().min(1, { message: "Lake is required" }),
  species: z.string().min(1, { message: "Species is required" }),
  difficulty: z.string().min(1, { message: "Difficulty is required" }),
  weather: z.string().min(1, { message: "Weather is required" }),
  timeOfDay: z.string().min(1, { message: "Time of day is required" }),
  season: z.string().min(1, { message: "Season is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface GeneratedResult {
  title: string;
  recommendedBait: string;
  hotspot: string;
  depthZone: string;
  catchRate: number;
  difficultyRating: string;
  tips: string[];
}

function generateLoot(data: FormValues): GeneratedResult {
  // Deterministic-ish generation based on inputs to simulate a real tool
  const r1 = Math.random();
  const r2 = Math.random();
  
  const latitude = (20 + (data.lake.length * 3) + (r1 * 10)).toFixed(1);
  const longitude = (10 + (data.species.length * 2) + (r2 * 10)).toFixed(1);
  
  const baseRate = data.difficulty === 'Novice' ? 85 : data.difficulty === 'Tournament' ? 35 : 60;
  const weatherMod = data.weather === 'Rainy' || data.weather === 'Cloudy' ? 10 : 0;
  const timeMod = data.timeOfDay === 'Dawn' || data.timeOfDay === 'Dusk' ? 15 : 0;
  
  let catchRate = baseRate + weatherMod + timeMod - Math.floor(Math.random() * 10);
  catchRate = Math.min(100, Math.max(10, catchRate));
  
  const depth = data.timeOfDay === 'Afternoon' ? 'Deep Water (15-25ft)' : 'Shallows (2-8ft)';
  
  const baits = {
    'Largemouth Bass': ['Texas Rigged Worm', 'Spinnerbait', 'Jig', 'Frog'],
    'Striped Bass': ['Bucktail Jig', 'Swimbaits', 'Topwater Plug'],
    'Trout': ['Inline Spinner', 'Small Spoon', 'Fly'],
    'Catfish': ['Cut Bait', 'Stink Bait', 'Nightcrawler'],
    'Northern Pike': ['Large Spoon', 'Jerkbait', 'Buzzbait']
  };
  
  const speciesBaits = baits[data.species as keyof typeof baits] || ['Standard Jig'];
  const bait = speciesBaits[Math.floor(Math.random() * speciesBaits.length)];
  
  const allTips = [
    `Retrieve slowly near drop-offs when ${data.weather.toLowerCase()}.`,
    `Focus on submerged structures during ${data.timeOfDay.toLowerCase()}.`,
    `Keep your rod tip low and maintain steady tension.`,
    `Watch for surface disturbances; ${data.species} might be feeding high.`,
    `If you do not get a bite in 15 minutes, change your color pattern.`,
    `The ${data.lake} area is known for sudden depth changes.`
  ];
  
  // Pick 3 random tips
  const tips = [...allTips].sort(() => 0.5 - Math.random()).slice(0, 3);

  return {
    title: `Operation: ${data.species} at ${data.lake}`,
    recommendedBait: bait,
    hotspot: `${latitude}N, ${longitude}W`,
    depthZone: depth,
    catchRate: catchRate,
    difficultyRating: data.difficulty,
    tips: tips
  };
}

export default function Generator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lake: LAKES[0],
      species: SPECIES[0],
      difficulty: DIFFICULTIES[1],
      weather: WEATHER[0],
      timeOfDay: TIME_OF_DAY[0],
      season: SEASONS[0],
    },
  });

  function onSubmit(data: FormValues) {
    setIsGenerating(true);
    setResult(null);
    
    // Simulate loading
    setTimeout(() => {
      setResult(generateLoot(data));
      setIsGenerating(false);
      toast({
        title: "Session parameters generated",
        description: "Your tactical loadout is ready.",
      });
    }, 1500);
  }

  const handleCopy = () => {
    if (!result) return;
    const text = `BassLab HQ Tactical Data\n---\nTarget: ${result.title}\nCoordinates: ${result.hotspot}\nBait: ${result.recommendedBait}\nDepth: ${result.depthZone}\nProbability: ${result.catchRate}%\n---\nbasslabhq.com`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Data ready to share with your squad.",
    });
  };

  const handleDownload = () => {
    if (!result) return;
    const text = `BassLab HQ Tactical Data\n---\nTarget: ${result.title}\nCoordinates: ${result.hotspot}\nBait: ${result.recommendedBait}\nDepth: ${result.depthZone}\nProbability: ${result.catchRate}%\n---\nTips:\n${result.tips.map(t => `- ${t}`).join('\n')}\n---\nbasslabhq.com`;
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "basslab_session.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "File downloaded",
      description: "Saved basslab_session.txt to your device.",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          Tactical Generator
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-lg font-mono">
          Configure your simulation parameters to generate optimal coordinates and loadouts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form */}
        <Card className="lg:col-span-5 bg-card/50 backdrop-blur border-border shadow-xl rounded-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-mono">Parameters</CardTitle>
            <CardDescription>Input your current game state</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="lake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location / Lake</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-border bg-background focus:ring-primary" data-testid="select-lake">
                              <SelectValue placeholder="Select a lake" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LAKES.map(lake => (
                              <SelectItem key={lake} value={lake}>{lake}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Species</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-border bg-background focus:ring-primary" data-testid="select-species">
                              <SelectValue placeholder="Select species" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SPECIES.map(s => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-border bg-background focus:ring-primary" data-testid="select-difficulty">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DIFFICULTIES.map(d => (
                              <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <FormField
                      control={form.control}
                      name="weather"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Weather</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none border-border bg-background focus:ring-primary text-sm" data-testid="select-weather">
                                <SelectValue placeholder="Weather" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {WEATHER.map(w => (
                                <SelectItem key={w} value={w}>{w}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeOfDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Time of Day</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none border-border bg-background focus:ring-primary text-sm" data-testid="select-time">
                                <SelectValue placeholder="Time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIME_OF_DAY.map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                      control={form.control}
                      name="season"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Season Modifier</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none border-border bg-background focus:ring-primary text-sm" data-testid="select-season">
                                <SelectValue placeholder="Season" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SEASONS.map(s => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                </div>

                <Button 
                  type="submit" 
                  disabled={isGenerating} 
                  className="w-full rounded-none font-bold tracking-widest text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group"
                  data-testid="button-generate"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      COMPUTING...
                    </span>
                  ) : (
                    <>
                      <span>INITIATE SCAN</span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {!result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] border border-dashed border-border rounded flex flex-col items-center justify-center p-8 text-center bg-card/20"
              >
                <Target className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-mono text-muted-foreground mb-2">AWAITING PARAMETERS</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Configure your game state and initiate scan to receive tactical loadout data.
                </p>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] border border-border bg-card/30 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse"></div>
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-mono text-primary mb-2">ANALYZING TOPOGRAPHY</h3>
                <p className="text-sm text-muted-foreground max-w-sm font-mono animate-pulse">
                  Cross-referencing species behavior patterns with local weather nodes...
                </p>
              </motion.div>
            )}

            {result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="h-full border border-primary/30 bg-card/80 backdrop-blur shadow-2xl relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6 border-b border-border pb-6">
                    <div>
                      <Badge variant="outline" className="mb-2 text-primary border-primary/50 bg-primary/10 rounded-none font-mono">
                        SUCCESS MATCH
                      </Badge>
                      <h2 className="text-2xl font-bold font-mono text-foreground" data-testid="text-result-title">
                        {result.title}
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground font-mono">PROBABILITY</div>
                      <div className="text-3xl font-extrabold text-secondary font-mono">{result.catchRate}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          COORDINATES
                        </div>
                        <div className="text-xl font-bold font-mono bg-background p-3 border border-border" data-testid="text-result-hotspot">
                          {result.hotspot}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
                          <Fish className="w-4 h-4 text-primary" />
                          RECOMMENDED RIG
                        </div>
                        <div className="text-lg font-bold font-sans text-primary">
                          {result.recommendedBait}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
                          <AlertCircle className="w-4 h-4 text-secondary" />
                          DEPTH ZONE
                        </div>
                        <div className="text-lg font-bold font-sans text-secondary">
                          {result.depthZone}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground font-mono mb-1">
                          DIFFICULTY
                        </div>
                        <div className="text-lg font-bold font-sans">
                          {result.difficultyRating}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background border border-border p-5 rounded-none mb-6">
                    <h4 className="text-sm font-bold font-mono text-muted-foreground mb-3 border-b border-border pb-2">TACTICAL ADVICE</h4>
                    <ul className="space-y-3">
                      {result.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <span className="text-primary font-bold">{idx + 1}.</span>
                          <span className="text-foreground/90">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={handleCopy}
                      className="flex-1 rounded-none border-primary/30 hover:bg-primary/10 hover:text-primary text-primary"
                      data-testid="button-copy"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      COPY DATA
                    </Button>
                    <Button 
                      onClick={handleDownload}
                      className="flex-1 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground"
                      data-testid="button-download"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      SAVE LOCALLY
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}