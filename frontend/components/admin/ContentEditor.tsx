import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import backend from "~backend/client";

interface ContentEditorProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    author: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ContentEditor({ initialData, onSuccess, onCancel }: ContentEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    author: initialData?.author || ""
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => backend.admin.create(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Content created successfully",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Failed to create content:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to create content",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData & { id: string }) => backend.admin.update(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Failed to update content:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to update content",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?.id) {
      updateMutation.mutate({ ...formData, id: initialData.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          rows={10}
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
            : initialData?.id
            ? "Update Content"
            : "Create Content"
          }
        </Button>
      </div>
    </form>
  );
}
