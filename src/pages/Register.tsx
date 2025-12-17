import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import { eventsData } from "../data/events";

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

interface Member {
  name: string;
  email: string;
  college: string;
  otherCollege: string;
}

const Register: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialEventId = queryParams.get("eventId") || "";

  // Form State
  const [event, setEvent] = useState(initialEventId);
  const [teamSize, setTeamSize] = useState(1);
  const [sameCollege, setSameCollege] = useState(false);

  // Team Members State
  const [members, setMembers] = useState<Member[]>([
    {
      name: "",
      email: "",
      college: "",
      otherCollege: "",
    },
  ]);

  // Shared College State (if sameCollege is true)
  const [sharedCollege, setSharedCollege] = useState({
    college: "",
    otherCollege: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived State
  const selectedEventInfo = eventsData.find((e) => e.id === event);
  const registrationFee = selectedEventInfo ? selectedEventInfo.fee : 0;

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: "📱" },
    { id: "card", label: "Card", icon: "💳" },
    { id: "netbanking", label: "Net Banking", icon: "🏦" },
  ];

  // Update members array when teamSize changes
  useEffect(() => {
    setMembers((prev) => {
      const newMembers = [...prev];
      if (teamSize > prev.length) {
        for (let i = prev.length; i < teamSize; i++) {
          newMembers.push({
            name: "",
            email: "",
            college: "",
            otherCollege: "",
          });
        }
      } else if (teamSize < prev.length) {
        return newMembers.slice(0, teamSize);
      }
      return newMembers;
    });
  }, [teamSize]);

  // Initial Event Set
  useEffect(() => {
    if (initialEventId) {
      setEvent(initialEventId);
      const evt = eventsData.find((e) => e.id === initialEventId);
      if (evt) setTeamSize(evt.minTeamSize);
    }
  }, [initialEventId]);

  // Handle Input Changes
  const updateMember = (index: number, field: keyof Member, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!event) newErrors.event = "Please select an event";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    members.forEach((member, index) => {
      if (!member.name.trim()) newErrors[`name_${index}`] = "Name is required";

      if (!member.email.trim()) {
        newErrors[`email_${index}`] = "Email is required";
      } else if (!emailRegex.test(member.email)) {
        newErrors[`email_${index}`] = "Invalid email";
      }

      if (!sameCollege) {
        if (!member.college)
          newErrors[`college_${index}`] = "College is required";
        if (member.college === "Other" && !member.otherCollege.trim()) {
          newErrors[`otherCollege_${index}`] = "College name required";
        }
      }
    });

    if (sameCollege) {
      if (!sharedCollege.college)
        newErrors.sharedCollege = "College is required";
      if (
        sharedCollege.college === "Other" &&
        !sharedCollege.otherCollege.trim()
      ) {
        newErrors.sharedCollegeOther = "College name required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert("Registration Submitted Successfully!");
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-sans font-bold text-notion-primary mb-2">
            Register
          </h1>
          <p className="text-notion-muted">Form a team and secure your spot.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-notion-text-light mb-4 pb-2 border-b border-notion-border">
              Event Configuration
            </h3>

            <div className="flex flex-col gap-5">
              {/* Event Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-notion-muted">
                  Select Event
                </label>
                <select
                  className={cn(
                    "px-3 py-2 rounded border border-notion-border bg-[#252525] text-notion-text text-sm transition-all outline-none shadow-sm",
                    "focus:border-notion-accent focus:ring-1 focus:ring-notion-accent/40",
                    errors.event &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  value={event}
                  onChange={(e) => {
                    const newEventId = e.target.value;
                    setEvent(newEventId);
                    const evt = eventsData.find((ev) => ev.id === newEventId);
                    if (evt) setTeamSize(evt.minTeamSize);
                  }}
                >
                  <option value="" disabled>
                    Choose an event...
                  </option>
                  {eventsData.map((evt) => (
                    <option key={evt.id} value={evt.id}>
                      {evt.title} (₹{evt.fee})
                    </option>
                  ))}
                </select>
                {errors.event && (
                  <span className="text-xs text-red-500">{errors.event}</span>
                )}
              </div>

              {/* Team Size */}
              {selectedEventInfo && (
                <div className="flex flex-col gap-1.5 ">
                  <label className="text-sm font-medium text-notion-muted">
                    Team Size
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={selectedEventInfo.minTeamSize}
                      max={selectedEventInfo.maxTeamSize}
                      value={teamSize}
                      onChange={(e) => setTeamSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-notion-border rounded-lg appearance-none cursor-pointer accent-notion-accent"
                    />
                    <span className="text-notion-text font-mono bg-notion-card px-3 py-1 rounded border border-notion-border">
                      {teamSize}
                    </span>
                  </div>
                  <span className="text-xs text-notion-muted">
                    Allowed size: {selectedEventInfo.minTeamSize} -{" "}
                    {selectedEventInfo.maxTeamSize} members
                  </span>
                </div>
              )}

              {/* Same College Toggle */}
              {teamSize > 1 && (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="sameCollege"
                    checked={sameCollege}
                    onChange={(e) => setSameCollege(e.target.checked)}
                    className="w-4 h-4 rounded border-notion-border bg-notion-card text-notion-accent focus:ring-notion-accent"
                  />
                  <label
                    htmlFor="sameCollege"
                    className="text-sm text-notion-text cursor-pointer select-none"
                  >
                    All members are from the same college
                  </label>
                </div>
              )}

              {/* Shared College Input */}
              <AnimatePresence>
                {sameCollege && teamSize > 1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-2"
                  >
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="text-sm font-medium text-notion-muted">
                        College / Institute (Team)
                      </label>
                      <select
                        className={cn(
                          "px-3 py-2 rounded border border-notion-border bg-[#252525] text-notion-text text-sm transition-all outline-none shadow-sm",
                          "focus:border-notion-accent focus:ring-1 focus:ring-notion-accent/40",
                          errors.sharedCollege &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500"
                        )}
                        value={sharedCollege.college}
                        onChange={(e) =>
                          setSharedCollege({
                            ...sharedCollege,
                            college: e.target.value,
                          })
                        }
                      >
                        <option value="" disabled>
                          Select college
                        </option>
                        {colleges.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                      {errors.sharedCollege && (
                        <span className="text-xs text-red-500">
                          {errors.sharedCollege}
                        </span>
                      )}
                    </div>

                    {sharedCollege.college === "Other" && (
                      <Input
                        label="Specify College Name"
                        placeholder="Enter college name"
                        fullWidth
                        value={sharedCollege.otherCollege}
                        onChange={(e) =>
                          setSharedCollege({
                            ...sharedCollege,
                            otherCollege: e.target.value,
                          })
                        }
                        error={errors.sharedCollegeOther}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          <div className="space-y-4 mb-6">
            {members.map((member, index) => (
              <Card key={index} className="relative">
                <div className="absolute top-4 right-4 text-xs font-mono text-notion-muted opacity-50">
                  #{index + 1}
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-notion-text-light mb-4 pb-2 border-b border-notion-border">
                  Member {index + 1} Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Jane Doe"
                    fullWidth
                    value={member.name}
                    onChange={(e) =>
                      updateMember(index, "name", e.target.value)
                    }
                    error={errors[`name_${index}`]}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    fullWidth
                    value={member.email}
                    onChange={(e) =>
                      updateMember(index, "email", e.target.value)
                    }
                    error={errors[`email_${index}`]}
                  />

                  {/* Individual College Input (if not same college) */}
                  {!sameCollege && (
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-notion-muted">
                          College / Institute
                        </label>
                        <select
                          className={cn(
                            "px-3 py-2 rounded border border-notion-border bg-[#252525] text-notion-text text-sm transition-all outline-none shadow-sm",
                            "focus:border-notion-accent focus:ring-1 focus:ring-notion-accent/40",
                            errors[`college_${index}`] &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500"
                          )}
                          value={member.college}
                          onChange={(e) =>
                            updateMember(index, "college", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select college
                          </option>
                          {colleges.map((col) => (
                            <option key={col} value={col}>
                              {col}
                            </option>
                          ))}
                        </select>
                        {errors[`college_${index}`] && (
                          <span className="text-xs text-red-500">
                            {errors[`college_${index}`]}
                          </span>
                        )}
                      </div>

                      {member.college === "Other" && (
                        <Input
                          label="Specify College Name"
                          placeholder="Enter college name"
                          fullWidth
                          value={member.otherCollege}
                          onChange={(e) =>
                            updateMember(index, "otherCollege", e.target.value)
                          }
                          error={errors[`otherCollege_${index}`]}
                        />
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

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
                <span>Registration Fee (Team of {teamSize})</span>
                <span>₹ {registrationFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-notion-text pt-3 border-t border-notion-border mt-2">
                <span>Total Payable</span>
                <span>₹ {registrationFee}</span>
              </div>
            </div>
          </Card>

          <div className="mt-8">
            <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting
                ? "Processing..."
                : `Pay ₹${registrationFee} & Register`}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
