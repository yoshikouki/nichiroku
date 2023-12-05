"use client";

import { CalendarIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { useArticleEditor } from "./use-article-editor";

const dateFormatter = new Intl.DateTimeFormat("ja-JP");

export const ArticleEditor = () => {
  const { form, date } = useArticleEditor();

  return (
    <article>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="min-h-full space-y-6 flex flex-col"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={dateFormatter.format(date)}
                    className="px-4 w-full font-extrabold text-2xl resize-none bg-transparent border-0 focus-visible:ring-0"
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
                    className="flex-grow px-4 w-full h-auto min-h-[25rem] text-lg resize-none bg-transparent border-0 focus-visible:ring-0"
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
