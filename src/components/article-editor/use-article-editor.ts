"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";

const articleSchema = z.object({
  title: z.string().optional(),
  date: z.date(),
  content: z.string().optional(),
});
type ArticleSchema = z.infer<typeof articleSchema>;

export const useArticleEditor = () => {
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
      title: "Saved",
      description: JSON.stringify(form.watch(), null, 2),
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

  return {
    form,
    ...formData,
  };
};
