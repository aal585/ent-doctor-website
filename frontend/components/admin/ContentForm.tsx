import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import backend from "~backend/client";

interface ContentFormProps {
  type: "article" | "faq";
  onSuccess?: () => void;
}

export function ContentForm({ type, onSuccess }: ContentFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState(
    type === "article" 
      ? { title: "", content: "", author: "" }
      : { question: "", answer: "" }
  );

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (type === "article") {
        return backend.admin.createArticle(data);
      } else {
        return backend.admin.createFAQ(data);
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${type === "article" ? "Article" : "FAQ"} created successfully`,
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Create content error:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to create content",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (type === "article") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Article"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          required
        />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create FAQ"}
      </Button>
    </form>
  );
}
