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
    onError: (error) => {
      console.error("Failed to submit appointment request:", error);
      toast({
        title: "Error",
        description: "Failed to submit appointment request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          type="date"
          value={formData.preferredDate.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, preferredDate: new Date(e.target.value) })}
          required
        />
      </div>

      <div>
        <Label htmlFor="alternateDate">Alternate Date</Label>
        <Input
          id="alternateDate"
          type="date"
          value={formData.alternateDate.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, alternateDate: new Date(e.target.value) })}
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
