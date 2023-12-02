"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("ja-JP");

const articleSchema = z.object({
  title: z.string().optional(),
  date: z.date(),
  content: z.string().optional(),
});
type ArticleSchema = z.infer<typeof articleSchema>;

export const ArticleEditor = () => {
  const form = useForm<ArticleSchema>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      date: new Date(),
    },
  });
  const formData = useWatch({ control: form.control });
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const onSave = useCallback(() => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(form.watch(), null, 2)}
          </code>
        </pre>
      ),
    });
  }, [form, toast]);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    autoSaveTimer.current = setTimeout(() => {
      onSave();
    }, 2000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [formData, onSave]);

  return (
    <article>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="min-h-[100dvh] space-y-6 flex flex-col"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={dateFormatter.format(formData.date)}
                    className="resize-none border-0 bg-transparent px-4 w-full focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-grow flex flex-col">
                <FormControl>
                  <Textarea
                    placeholder="Tell me what you like to keep..."
                    className="flex-grow resize-none border-0 bg-transparent px-4 w-full h-full focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className={cn("p-4 font-normal text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          dateFormatter.format(field.value)
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      required
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </article>
  );
};
