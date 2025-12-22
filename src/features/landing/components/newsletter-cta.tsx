'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Loader2 } from 'lucide-react';
import { SectionContainer, PremiumButton } from './shared';
import { Input } from '@/shared/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form';
import { heroStagger, heroTextItem } from './shared/animation-variants';

const newsletterSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export function NewsletterCTA() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: NewsletterFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsLoading(false);
    setIsSubmitted(true);
    form.reset();

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <section className="bg-aescape-lavender py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={heroTextItem}
            className="font-display text-3xl font-medium tracking-tight text-aescape-charcoal md:text-4xl"
          >
            Stay Updated
          </motion.h2>

          <motion.p
            variants={heroTextItem}
            className="mt-4 text-base text-aescape-charcoal/70"
          >
            Get the latest partner profiles, features, and exclusive offers
            delivered to your inbox.
          </motion.p>

          <motion.div variants={heroTextItem} className="mt-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-aescape-charcoal"
              >
                <Check className="h-5 w-5 text-green-600" />
                Thanks for subscribing!
              </motion.div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-center"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-80">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="h-14 rounded-full border-aescape-charcoal/20 bg-white px-6 text-aescape-charcoal placeholder:text-aescape-charcoal/50 focus:border-aescape-charcoal focus:ring-aescape-charcoal"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-left text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="flex h-14 items-center justify-center rounded-full bg-aescape-charcoal px-8 text-sm font-medium text-white transition-colors hover:bg-aescape-charcoal/90 disabled:cursor-not-allowed disabled:opacity-50"
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Subscribe'
                    )}
                  </motion.button>
                </form>
              </Form>
            )}
          </motion.div>

          <motion.p
            variants={heroTextItem}
            className="mt-4 text-xs text-aescape-charcoal/50"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
