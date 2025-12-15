import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

const colleges = [
  "Indian Institute of Science (IISc)",
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "BITS Pilani",
  "NIT Trichy",
  "NIT Warangal",
  "IIIT Hyderabad",
  "Other",
];

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    otherCollege: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: "📱" },
    { id: "card", label: "Card", icon: "💳" },
    { id: "netbanking", label: "Net Banking", icon: "🏦" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.college) newErrors.college = "Please select your college";
    if (formData.college === "Other" && !formData.otherCollege.trim()) {
      newErrors.otherCollege = "Please specify your college name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert("Registration Submitted Successfully!");
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-serif font-bold text-notion-primary mb-2">
            Register
          </h1>
          <p className="text-notion-muted">
            Fill in the details to secure your spot.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-notion-text-light mb-4 pb-2 border-b border-notion-border">
              Personal Details
            </h3>
            <div className="flex flex-col gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                error={errors.name}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                fullWidth
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
              />

              <div className="flex flex-col gap-1.5 mb-3 w-full">
                <label className="text-sm font-medium text-notion-muted">
                  College / Institute
                </label>
                <select
                  className={cn(
                    "px-3 py-2 rounded border border-notion-border bg-[#252525] text-notion-text text-sm transition-all outline-none shadow-sm",
                    "focus:border-notion-accent focus:ring-1 focus:ring-notion-accent/40",
                    errors.college &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  value={formData.college}
                  onChange={(e) =>
                    setFormData({ ...formData, college: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select your college
                  </option>
                  {colleges.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
                {errors.college && (
                  <span className="text-xs text-red-500">{errors.college}</span>
                )}
              </div>

              {formData.college === "Other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <Input
                    label="Specify College Name"
                    placeholder="Enter your college name"
                    fullWidth
                    value={formData.otherCollege}
                    onChange={(e) =>
                      setFormData({ ...formData, otherCollege: e.target.value })
                    }
                    error={errors.otherCollege}
                  />
                </motion.div>
              )}
            </div>
          </Card>

          <Card className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-notion-text-light mb-4 pb-2 border-b border-notion-border">
              Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={cn(
                    "border rounded-md p-3 flex flex-col items-center justify-center gap-2 cursor-pointer relative transition-all",
                    selectedPayment === method.id
                      ? "border-notion-accent bg-notion-accent/10 text-notion-accent ring-1 ring-notion-accent/40"
                      : "border-notion-border hover:bg-notion-card text-notion-muted"
                  )}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-sm font-medium">{method.label}</span>
                  {selectedPayment === method.id && (
                    <motion.div
                      layoutId="checkmark"
                      className="absolute top-1 right-2 text-xs text-notion-accent"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#252525] p-4 rounded-md border border-notion-border">
              <div className="flex justify-between text-sm text-notion-muted mb-2">
                <span>Registration Fee</span>
                <span>₹ 500</span>
              </div>
              <div className="flex justify-between font-semibold text-notion-text pt-3 border-t border-notion-border mt-2">
                <span>Total</span>
                <span>₹ 500</span>
              </div>
            </div>
          </Card>

          <div className="mt-8">
            <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Registration"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
