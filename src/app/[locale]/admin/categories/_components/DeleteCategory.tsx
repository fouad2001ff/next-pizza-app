"use client";
import { useState } from "react";
import { deleteCategory } from "../_actions/category";
import { toast } from "sonner";
import { Button } from "@/app/[locale]/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/[locale]/components/ui/dialog";
import { useTranslations } from "next-intl";

const DeleteCategory = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations()

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const res = await deleteCategory(id);
      if (res.status === 200) {
        toast.success(t('messages.deleteCategorySucess'), {
          className: "!text-green-400 font-semibold", // Green success text
        });
        setIsOpen(false); // Close dialog after success
      }  else {
        toast.error(res.message || "Failed to delete category", {
          className: "!text-destructive font-semibold",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
