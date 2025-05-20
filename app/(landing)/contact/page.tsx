"use client"

import { useForm } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>()

  // No actual submission logic for now
  const onSubmit = (data: ContactFormData) => {
    // Placeholder for future integration
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Sales</CardTitle>
          <CardDescription>
            Fill out the form and our sales team will get back to you soon.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={4}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}