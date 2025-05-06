import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface TestimonialFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface TestimonialFormData {
  patientName: string;
  content: string;
  rating: number;
  procedureType: string;
}

export function TestimonialForm({ onSuccess, onCancel }: TestimonialFormProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const { toast } = useToast();

  const [formData, setFormData] = useState<TestimonialFormData>({
    patientName: "",
    content: "",
    rating: 5,
    procedureType: "General Consultation"
  });

  const mutation = useMutation({
    mutationFn: (data: TestimonialFormData) => backend.doctor.submitTestimonial(data),
    onSuccess: () => {
      toast({
        title: t("testimonials.submitSuccess"),
        description: t("testimonials.submitSuccessDesc"),
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Failed to submit testimonial:", error);
      toast({
        title: t("testimonials.submitError"),
        description: t("testimonials.submitErrorDesc"),
        variant: "destructive",
      });
    },
  });

  const procedures = [
    "General Consultation",
    "Ear Surgery",
    "Sinus Surgery",
    "Voice Treatment",
    "Sleep Apnea Treatment",
    "Pediatric ENT",
    "Hearing Test"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="patientName">{t("testimonials.name")}</Label>
        <Input
          id="patientName"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>{t("testimonials.rating")}</Label>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setFormData({ ...formData, rating })}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  rating <= formData.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="procedureType">{t("testimonials.procedure")}</Label>
        <Select
          value={formData.procedureType}
          onValueChange={(value) => setFormData({ ...formData, procedureType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("testimonials.selectProcedure")} />
          </SelectTrigger>
          <SelectContent>
            {procedures.map((proc) => (
              <SelectItem key={proc} value={proc}>
                {proc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="content">{t("testimonials.experience")}</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
        )}
        <Button
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? t("common.submitting") : t("testimonials.submit")}
        </Button>
      </div>
    </form>
  );
}
