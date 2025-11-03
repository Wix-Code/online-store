"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

const DeleteModal = ({
  children,
  onDelete,
  load,
}: {
  children: React.ReactNode;
  onDelete?: () => void;
  load?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete) onDelete();
    setOpen(false); // close modal after delete
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[552px] w-full">
        <DialogHeader className="sr-only">
          <DialogTitle>Delete Modal</DialogTitle>
          <DialogDescription>Are you sure you want to delete this notification?</DialogDescription>
        </DialogHeader>

        {/* Modal Content */}
        <div className="bg-white rounded-lg p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Delete Notification?</h2>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="cursor-pointer p-2"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </DialogClose>
          </div>

          <p className="text-sm text-gray-600">
            This action cannot be undone. Are you sure you want to delete this notification?
          </p>

          <div className="flex w-full gap-3 pt-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-700 py-5 flex-1 cursor-pointer border-gray-300"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              size="sm"
              className="bg-red-600 flex-1 flex justify-center items-center py-5 cursor-pointer hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={load}
            >
              {load ? (
                <Loader2 className="animate-spin inline-block w-4 h-4 text-gray-100" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;