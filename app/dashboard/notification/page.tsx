import { EmailSendForm } from "@/components/email-send-form";

export default function Page() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <EmailSendForm />
    </div>
  );
}