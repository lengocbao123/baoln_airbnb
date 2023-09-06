"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";

import { ModalType, useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server name is required.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;
const EditServerModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const server = data?.server;
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isSubmitting = form.formState.isSubmitted;
  const isOpenModal = isOpen && type === ModalType.EDIT_SERVER;
  const onSubmit = async (values: FormSchema) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values);
      handleClose();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    form.setValue("name", server?.name || "");
    form.setValue("imageUrl", server?.imageUrl || "");
  }, [form, server]);

  return (
    <Dialog open={isOpenModal} onOpenChange={() => handleClose()}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center text-zinc">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          onChange={(url) => {
                            field.onChange(url);
                            console.log({ url });
                          }}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                disabled={isSubmitting}
                className="w-full"
                variant="primary"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;
