"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, get all members
      const membersResponse = await fetch('/api/notifications/members');
      if (!membersResponse.ok) {
        throw new Error('Failed to fetch members');
      }
      const { members } = await membersResponse.json();

      if (!members || members.length === 0) {
        toast.error('No members found in the system');
        return;
      }

      // Send notifications through our API
      const sendResponse = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: formData.subject,
          message: formData.message,
          members
        })
      });

      if (!sendResponse.ok) {
        throw new Error('Failed to send notifications');
      }

      const { results } = await sendResponse.json();
      
      // Show summary toast
      const successCount = results.filter((r: any) => r.status === 'success').length;
      const errorCount = results.filter((r: any) => r.status === 'error').length;
      
      if (errorCount === 0) {
        toast.success(`Successfully sent notifications to all ${successCount} members`);
      } else {
        toast.warning(`Sent to ${successCount} members, failed for ${errorCount} members`);
      }

      // Clear form
      setFormData({ subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send notifications');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      <Card className="w-full max-w-2xl ">
        <CardHeader>
          <CardTitle>Send Notification to All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter notification subject"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your notification message"
                className="min-h-[200px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send to All Members'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}