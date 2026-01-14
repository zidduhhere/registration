import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import { eventsData } from "../data/events";
import { getAllCollegeNames } from "../data/collegeUnits";

const colleges = getAllCollegeNames();

const Register: React.FC = () => {
  // Static UI values for display
  const event = "";
  const teamSize = 1;
  const sameCollege = false;
  const selectedPayment = "upi";
  const selectedEventInfo = eventsData.find((e) => e.id === event);
  const registrationFee = selectedEventInfo ? selectedEventInfo.fee : 0;

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: "📱" },
    { id: "card", label: "Card", icon: "💳" },
    { id: "netbanking", label: "Net Banking", icon: "🏦" },
  ];

  const members = [
    {
      name: "",
      email: "",
      college: "",
      otherCollege: "",
    },
  ];

  return (
    <div className=" mx-auto">
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

        <form>
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
                    "focus:border-notion-accent focus:ring-1 focus:ring-notion-accent/40"
                  )}
                  value={event}
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
              </div>

              {/* Team Size */}
              <div className="flex flex-col gap-1.5 ">
                <label className="text-sm font-medium text-notion-muted">
                  Team Size
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={teamSize}
                    className="w-full h-2 bg-notion-border rounded-lg appearance-none cursor-pointer accent-notion-accent"
                  />
                  <span className="text-notion-text font-mono bg-notion-card px-3 py-1 rounded border border-notion-border">
                    {teamSize}
                  </span>
                </div>
                <span className="text-xs text-notion-muted">
                  Allowed size: 1 - 6 members
                </span>
              </div>

              {/* Same College Toggle */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="sameCollege"
                  checked={sameCollege}
                  className="w-4 h-4 rounded border-notion-border bg-notion-card text-notion-accent focus:ring-notion-accent"
                />
                <label
                  htmlFor="sameCollege"
                  className="text-sm text-notion-text cursor-pointer select-none"
                >
                  All members are from the same college
                </label>
              </div>
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
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    fullWidth
                    value={member.email}
                  />

                  {/* Individual College Input */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col gap-1.5 w-full">
                      <label className="text-sm font-medium text-notion-muted">
                        College / Institute
                      </label>
                      <select
                        className={cn(
                          "px-3 py-2 rounded border border-notion-border bg-[#252525] text-notion-text text-sm transition-all outline-none shadow-sm",
                          "focus:border-notion-accent focus:ring-1 focus:ring-notion-accent/40"
                        )}
                        value={member.college}
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
                    </div>
                  </div>
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
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-sm font-medium">{method.label}</span>
                  {selectedPayment === method.id && (
                    <div className="absolute top-1 right-2 text-xs text-notion-accent">
                      ✓
                    </div>
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
            <Button type="button" size="lg" fullWidth>
              Pay ₹{registrationFee} & Register
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;