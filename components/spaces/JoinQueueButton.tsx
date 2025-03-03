"use client";

import { useState } from "react";
import { joinQueue } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JoinQueueButtonProps {
  spaceId: string;
  userId: string;
  email: string;
  isAlreadyInQueue: boolean;
}

export default function JoinQueueButton({ spaceId, userId, email, isAlreadyInQueue }: JoinQueueButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [alias, setAlias] = useState(email || "");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await joinQueue(spaceId, userId, message);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to join queue:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAlreadyInQueue) {
    return (
      <Button disabled variant="outline" className="w-full">
        You're already in the queue
      </Button>
    );
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="w-full"
        variant="default"
      >
        Join Waiting Line
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join the Waiting Line</DialogTitle>
            <DialogDescription>
              You are about to join the waiting queue. Please provide your information.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="alias">Your Name/Alias</Label>
              <Input
                id="alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Your name or alias"
                disabled
              />
              <p className="text-xs text-gray-500">This will be visible to others in the queue</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">Your Question/Topic</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to discuss?"
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">Briefly describe what you want to talk about (optional)</p>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Joining..." : "Join Queue"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
