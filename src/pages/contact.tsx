import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      form.reset();
    }, 1000);
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Establish Contact
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-mono">
            Got feedback on the generator? Found a bug? Or just want to talk about virtual tackle? Drop us a line.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-card border border-border flex items-center justify-center rounded-none group-hover:border-primary transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-mono">Discord Network</h3>
                <p className="text-muted-foreground text-sm">Join the tactical channel</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-card border border-border flex items-center justify-center rounded-none group-hover:border-secondary transition-colors">
                <svg className="w-6 h-6 text-secondary fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.95H5.078z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg font-mono">X Broadcast</h3>
                <p className="text-muted-foreground text-sm">Follow @BassLabHQ</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-card border border-border flex items-center justify-center rounded-none group-hover:border-destructive transition-colors">
                <svg className="w-6 h-6 text-destructive fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg font-mono">Video Archives</h3>
                <p className="text-muted-foreground text-sm">Watch the guides</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div>
          <Card className="bg-card border-border rounded-none shadow-xl h-full">
            <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary"></div>
            <CardHeader>
              <CardTitle className="font-mono text-2xl">Comm Link</CardTitle>
              <CardDescription>Transmit your message to HQ</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-mono text-foreground mb-2">Message Received</h3>
                    <p className="text-muted-foreground mb-8">
                      Transmission successful. We will review your data and respond shortly.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="rounded-none border-primary/50 hover:bg-primary/10 text-primary"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Callsign (Name)</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="rounded-none border-border bg-background focus-visible:ring-primary" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Return Address (Email)</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" type="email" className="rounded-none border-border bg-background focus-visible:ring-primary" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject Classification</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-none border-border bg-background focus:ring-primary" data-testid="select-subject">
                                    <SelectValue placeholder="Select classification" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="bug">Bug Report</SelectItem>
                                  <SelectItem value="feature">Feature Request</SelectItem>
                                  <SelectItem value="data">Data Contribution</SelectItem>
                                  <SelectItem value="other">General Inquiry</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transmission Content</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter your message here..." 
                                  className="rounded-none border-border bg-background focus-visible:ring-primary min-h-[120px] resize-none" 
                                  {...field} 
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full rounded-none font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                          data-testid="button-submit-contact"
                        >
                          {isSubmitting ? 'TRANSMITTING...' : (
                            <span className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              TRANSMIT MESSAGE
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}