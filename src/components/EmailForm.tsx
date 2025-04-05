
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, X } from "lucide-react";

interface EmailFormProps {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const EmailForm: React.FC<EmailFormProps> = ({
  name,
  email,
  setName,
  setEmail,
  onCancel,
  onSubmit,
  isLoading
}) => {
  return (
    <Card className="mt-4 animate-slide-in card-shadow">
      <CardHeader className="bg-chatbot text-white rounded-t-lg relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-white hover:bg-white/10"
          onClick={onCancel}
        >
          <X size={18} />
        </Button>
        <CardTitle className="text-lg">Email ROI Results</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name (Optional)</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="calculator-input"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@example.com"
            required
            className="calculator-input"
          />
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 rounded-b-lg p-4">
        <Button
          onClick={onSubmit}
          className="w-full flex items-center justify-center space-x-2 bg-chatbot hover:bg-chatbot/90"
          disabled={!email || isLoading}
        >
          <Mail size={16} />
          <span>{isLoading ? "Sending..." : "Send Results"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
