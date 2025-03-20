"use client";
import { Button } from "@/app/[locale]/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import { Input } from "@/app/[locale]/components/ui/input";
import { Label } from "@/app/[locale]/components/ui/label";
import { ValidationErrors } from "@/validations/auth";
import { Category } from "@prisma/client";
import { EditIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateCategory } from "../_actions/category";
import Loader from "@/app/[locale]/components/ui/Loader";

const EditCategory = ({ category }: { category: Category }) => {
 
  const t = useTranslations("categories");

  
  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
  } = {
    message: "",
    error: {},
    status: null,
  };
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState
  );
  useEffect(() => {
    if (state.status && state.message && !pending) {
      toast(state.message, {
        className:
          state.status === 200 ? "!text-green-400" : "text-destructive",
      });
    }
  }, [state.status, state.message, pending]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon className="text-black" />
        </Button>
      </DialogTrigger>
      <DialogContent  className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("form.editName")}</DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="category-name">{t("form.name.label")}</Label>
            <div className="flex-1 relative">
              <Input
                type="text"
                id="categoryName"
                name="categoryName"
                defaultValue={category.name}
                placeholder={t("form.name.placeholder")}
              />
              {state.error?.categoryName && (
                <p className="text-sm text-destructive absolute top-12">
                  {state.error?.categoryName}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-10">
            <Button type="submit" disabled={pending}>
              {pending ? <Loader /> : t("form.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
