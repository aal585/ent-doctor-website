import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "../../hooks/useLanguage";
import { getTranslation } from "../../lib/i18n";
import backend from "~backend/client";
import type { Article } from "~backend/doctor/types";

interface ArticleEditorProps {
  article?: Article;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ArticleEditor({ article, onSuccess, onCancel }: ArticleEditorProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    titleEn: article?.title || "",
    titleAr: article?.title || "",
    contentEn: article?.content || "",
    contentAr: article?.content || "",
    summaryEn: article?.summary || "",
    summaryAr: article?.summary || "",
    author: article?.author || "",
    imageData: "",
    tags: article?.tags || [],
    category: article?.category || "",
    readTimeMinutes: article?.readTimeMinutes || 5
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => backend.admin.createArticle(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article created successfully",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Failed to create article:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to create article",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData & { id: string }) => backend.admin.updateArticle(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article updated successfully",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Failed to update article:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to update article",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (article?.id) {
      updateMutation.mutate({ ...formData, id: article.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageData: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      tags: e.target.value.split(",").map(tag => tag.trim())
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="titleEn">Title (English)</Label>
          <Input
            id="titleEn"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="titleAr">Title (Arabic)</Label>
          <Input
            id="titleAr"
            value={formData.titleAr}
            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
            required
            dir="rtl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="summaryEn">Summary (English)</Label>
          <Textarea
            id="summaryEn"
            value={formData.summaryEn}
            onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="summaryAr">Summary (Arabic)</Label>
          <Textarea
            id="summaryAr"
            value={formData.summaryAr}
            onChange={(e) => setFormData({ ...formData, summaryAr: e.target.value })}
            required
            dir="rtl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contentEn">Content (English)</Label>
          <Textarea
            id="contentEn"
            value={formData.contentEn}
            onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
            required
            rows={10}
          />
        </div>
        <div>
          <Label htmlFor="contentAr">Content (Arabic)</Label>
          <Textarea
            id="contentAr"
            value={formData.contentAr}
            onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
            required
            rows={10}
            dir="rtl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Patient Education">Patient Education</SelectItem>
              <SelectItem value="Medical Advances">Medical Advances</SelectItem>
              <SelectItem value="Health Tips">Health Tips</SelectItem>
              <SelectItem value="Case Studies">Case Studies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <Label htmlFor="readTime">Read Time (minutes)</Label>
          <Input
            id="readTime"
            type="number"
            min="1"
            value={formData.readTimeMinutes}
            onChange={(e) => setFormData({ ...formData, readTimeMinutes: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags.join(", ")}
          onChange={handleTagsChange}
          placeholder="ear, surgery, treatment"
        />
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {createMutation.isPending || updateMutation.isPending
            ? "Saving..."
            : article?.id
            ? "Update Article"
            : "Create Article"
          }
        </Button>
      </div>
    </form>
  );
}
