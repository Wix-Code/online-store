"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

const DeleteModal = ({
  children,
  onConfirm,
}: {
  children: React.ReactNode;
  onConfirm?: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="max-w-[552px] w-full"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Delete Modal</DialogTitle>
          <DialogDescription>Are you sure you want to delete this notification?</DialogDescription>
        </DialogHeader>
        {/* Centered Modal Box */}
        <div className="bg-white rounded-lg p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Delete Notification?</h2>
            <DialogClose asChild>
              <Button className="cursor-pointer">
                <X />
              </Button>
            </DialogClose>
          </div>
          <p className="text-sm text-gray-600">
            This action cannot be undone. Are you sure you want to delete this notification?
          </p>

          <div className="flex w-full gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 py-5 flex-1 cursor-pointer border-gray-300"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-red-600 flex-1 py-5 cursor-pointer hover:bg-red-700 text-white"
              onClick={onConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;