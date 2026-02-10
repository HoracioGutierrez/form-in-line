"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ZapIcon, ZapOff } from "lucide-react";
import { useState } from "react";
import Form from "next/form";
import toast from "react-hot-toast";
import {
  queue_members,
  queues,
  spaces,
  spaces_activation_times,
} from "@/prisma/generated/prisma-client-js";
import ActivateButton from "./activate-button";
import { handleDeactivateSpace } from "@/actions/handleDeactivateSpace";
import { handleActivateSpace } from "@/actions/handleActivateSpace";
import { handleActivateNewQueue } from "@/actions/handleActivateNewQueue";
import { useTranslations } from "next-intl";

type ActivateFormButtonProps = {
  space: spaces & {
    spaces_activation_times: spaces_activation_times[];
    queue_members: queue_members[];
    queues: queues[];
  };
};

function ActivateFormButton({ space }: ActivateFormButtonProps) {
  const t = useTranslations("spaces");
  const q = useTranslations("tooltip");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    if (space.is_active) {
      toast.promise(handleDeactivateSpace(space.id), {
        loading: t("activate.deactivating"),
        success: () => {
          handleCloseModal();
          return t("activate.deactivated");
        },
        error: (error) => error.message,
      });
    } else {
      toast.promise(handleActivateSpace(space.id), {
        loading: t("activate.activating"),
        success: () => {
          handleCloseModal();
          return t("activate.activated");
        },
        error: (error) => error.message,
      });
    }
  };

  const handleQueueOnlyClick = async () => {
    toast.promise(handleActivateNewQueue(space.id), {
      loading: t("activate.activating"),
      success: (response) => {
        if (response.hasError) throw new Error(response.errorMessage);
        handleCloseModal();
        return t("activate.queue_activated");
      },
      error: (error) => error.message,
    });
  };

  const hasActiveQueue = space.queues.length > 0 && space.queues[0].is_active;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-0"
          data-tooltip-id="tooltip"
          data-tooltip-content={q("queue.toggleSpace")}
        >
          {space.is_active ? <ZapOff /> : <ZapIcon />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {space.is_active
              ? t("activate.deactivate_title", { name: space.name })
              : t("activate.activate_title", { name: space.name })}
          </DialogTitle>
          <DialogDescription>
            {space.is_active
              ? t("activate.deactivate_description")
              : t("activate.activate_description")}
          </DialogDescription>
        </DialogHeader>
        <Form action={handleSubmit} className="flex flex-col gap-4">
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t("form.cancel")}
              </Button>
            </DialogClose>
            {!space.is_active && !hasActiveQueue && (
              <Button
                type="button"
                variant="outline"
                onClick={handleQueueOnlyClick}
              >
                {t("activate.activate_queue_only")}
              </Button>
            )}
            <ActivateButton isActive={space.is_active} />
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ActivateFormButton;
