import type { EventGuidelines } from "../../data/events";

interface PaymentStepProps {
  eventSelected: EventGuidelines | null;
}

const PaymentStep = ({ eventSelected }: PaymentStepProps) => {
  return (
    <div className="flex flex-col h-200 justify-center items-center gap-8 py-4 mx-2">
      <img src={eventSelected?.price} className="w-100 rounded-2xl shadow-md" />

      <label className="clash text-lg font-semibold">
        Scan the QR code to complete the payment.
      </label>
      <label className="clash text-md text-center max-w-md">
        After completing the payment, please save the payment receipt
        and upload it in the next step.
      </label>
    </div>
  );
};

export default PaymentStep;
