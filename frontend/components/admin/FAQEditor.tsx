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
import type { FAQ } from "~backend/doctor/types";

interface FAQEditorProps {
  faq?: FAQ;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function FAQEditor({ faq, onSuccess, onCancel }: FAQEditorProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    questionEn: faq?.question || "",
    questionAr: faq?.question || "",
    answerEn: faq?.answer || "",
    answerAr: faq?.answer || "",
    category: faq?.category || "",
    icon: faq?.icon || "help-circle"
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => backend.admin.createFAQ(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "FAQ created successfully",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Failed to create FAQ:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to create FAQ",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData & { id: string }) => backend.admin.updateFAQ(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "FAQ updated successfully",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Failed to update FAQ:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to update FAQ",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faq?.id) {
      updateMutation.mutate({ ...formData, id: faq.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="questionEn">Question (English)</Label>
          <Input
            id="questionEn"
            value={formData.questionEn}
            onChange={(e) => setFormData({ ...formData, questionEn: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="questionAr">Question (Arabic)</Label>
          <Input
            id="questionAr"
            value={formData.questionAr}
            onChange={(e) => setFormData({ ...formData, questionAr: e.target.value })}
            required
            dir="rtl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="answerEn">Answer (English)</Label>
          <Textarea
            id="answerEn"
            value={formData.answerEn}
            onChange={(e) => setFormData({ ...formData, answerEn: e.target.value })}
            required
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="answerAr">Answer (Arabic)</Label>
          <Textarea
            id="answerAr"
            value={formData.answerAr}
            onChange={(e) => setFormData({ ...formData, answerAr: e.target.value })}
            required
            rows={4}
            dir="rtl"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
              <SelectItem value="Appointments">Appointments</SelectItem>
              <SelectItem value="Procedures">Procedures</SelectItem>
              <SelectItem value="Insurance">Insurance</SelectItem>
              <SelectItem value="Recovery">Recovery</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="icon">Icon</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => setFormData({ ...formData, icon: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="help-circle">Help Circle</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
              <SelectItem value="stethoscope">Stethoscope</SelectItem>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="heart-pulse">Heart Pulse</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
            : faq?.id
            ? "Update FAQ"
            : "Create FAQ"
          }
        </Button>
      </div>
    </form>
  );
}
