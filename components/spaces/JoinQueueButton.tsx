"use client";

import { useState } from "react";
import { joinQueue } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ban, ListCheck, ListEndIcon, Loader } from "lucide-react";
import Link from "next/link";
import IconButtonWithTooltip from "../shared/IconButtonWithTooltip";

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
      await joinQueue(spaceId, userId, message, alias);
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
        Ya estás en la fila de espera
      </Button>
    );
  }

  return (
    <>
      {/* <Button
        onClick={() => setIsOpen(true)}
        className="w-full"
        variant="default"
      >
        Unirse a la Fila de Espera
      </Button> */}
      <IconButtonWithTooltip message="Unirse a la Fila de Espera" onClick={() => setIsOpen(true)}>
        <ListEndIcon />
      </IconButtonWithTooltip>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Unirse a la Fila de Espera</DialogTitle>
            <DialogDescription>
              Estás a punto de unirte a la fila de espera. Por favor proporciona tu información.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="alias">Tu Nombre/Alias</Label>
              <Input
                id="alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Tu nombre o alias"
                disabled
              />
              <p className="text-xs text-gray-500">Para cambiar su alias puede dirigirse a la pagina de <Link href="/account" className="text-blue-500">cuenta</Link></p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Tu Pregunta/Tema</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¿Qué te gustaría discutir?"
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">Describe brevemente de qué quieres hablar (opcional)</p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <Ban />
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                {isSubmitting ? <Loader className="animate-spin" /> : <ListCheck />}
                {isSubmitting ? "Uniéndose..." : "Unirse a la Fila"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
