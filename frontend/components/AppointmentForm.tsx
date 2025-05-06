import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import backend from "~backend/client";
import type { AppointmentRequest } from "~backend/doctor/types";

export function AppointmentForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AppointmentRequest>({
    patientName: "",
    email: "",
    phone: "",
    preferredDate: new Date(),
    alternateDate: new Date(),
    reason: "",
    isNewPatient: true
  });

  const mutation = useMutation({
    mutationFn: (data: AppointmentRequest) => backend.appointments.requestAppointment(data),
    onSuccess: () => {
      toast({
        title: "Appointment Request Submitted",
        description: "We will contact you shortly to confirm your appointment.",
      });
      setFormData({
        patientName: "",
        email: "",
        phone: "",
        preferredDate: new Date(),
        alternateDate: new Date(),
        reason: "",
        isNewPatient: true
      });
    },
    onError: (error: any) => {
      console.error("Failed to submit appointment request:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to submit appointment request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.patientName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    if (!formData.reason.trim()) {
      toast({
        title: "Error",
        description: "Please enter your reason for visit",
        variant: "destructive",
      });
      return;
    }

    // Ensure dates are in the future
    const now = new Date();
    if (new Date(formData.preferredDate) < now) {
      toast({
        title: "Error",
        description: "Preferred date must be in the future",
        variant: "destructive",
      });
      return;
    }
    if (new Date(formData.alternateDate) < now) {
      toast({
        title: "Error",
        description: "Alternate date must be in the future",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="patientName">Full Name</Label>
        <Input
          id="patientName"
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="preferredDate">Preferred Date</Label>
        <Input
          id="preferredDate"
          type="datetime-local"
          value={formData.preferredDate.toISOString().slice(0, 16)}
          onChange={(e) => setFormData({ ...formData, preferredDate: new Date(e.target.value) })}
          min={new Date().toISOString().slice(0, 16)}
          required
        />
      </div>

      <div>
        <Label htmlFor="alternateDate">Alternate Date</Label>
        <Input
          id="alternateDate"
          type="datetime-local"
          value={formData.alternateDate.toISOString().slice(0, 16)}
          onChange={(e) => setFormData({ ...formData, alternateDate: new Date(e.target.value) })}
          min={new Date().toISOString().slice(0, 16)}
          required
        />
      </div>

      <div>
        <Label htmlFor="reason">Reason for Visit</Label>
        <Textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isNewPatient"
          checked={formData.isNewPatient}
          onCheckedChange={(checked) => setFormData({ ...formData, isNewPatient: checked })}
        />
        <Label htmlFor="isNewPatient">I am a new patient</Label>
      </div>

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Request Appointment"}
      </Button>
    </form>
  );
}
