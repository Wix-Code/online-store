"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, X } from "lucide-react";

const DeleteModal = ({
  children,
  onConfirm,
  loading,
}: {
  children: React.ReactNode;
  onConfirm?: () => void;
  loading?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (onConfirm) await onConfirm();
    setOpen(false); // ✅ close modal after delete
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[400px] bg-white rounded-lg p-6 shadow-xl space-y-4 w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Delete Product?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this product?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 py-5 hover:bg-gray-100 cursor-pointer text-gray-700 flex-1"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 py-5 cursor-pointer text-white flex-1 flex justify-center items-center"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin inline-block w-4 h-4" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;