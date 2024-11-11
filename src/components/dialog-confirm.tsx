import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export const DialogConfirm = ({ triggerRef, message }: any) => {
  return (
    <Dialog>
      <DialogTrigger>{triggerRef}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
          <DialogClose>
            <button>Confirm</button>
          </DialogClose>
          <DialogClose>
            <button>Cancel</button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
