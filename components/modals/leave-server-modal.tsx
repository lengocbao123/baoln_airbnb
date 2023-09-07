"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalType, useModal } from "@/hooks/use-modal-store";

const LeaveServerModal = () => {
  const router = useRouter();
  const { isOpen, type, data, onClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const isOpenModal = isOpen && type === ModalType.LEAVE_SERVER;

  const onLeave = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${data?.server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center text-zinc">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {data?.server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="w-full flex items-center justify-between gap-4">
            <Button disabled={isLoading} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant="primary" onClick={onLeave}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
