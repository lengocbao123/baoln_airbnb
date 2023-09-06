import { Server } from "@prisma/client";
import { create } from "zustand";
export enum ModalType {
  CREATE_SERVER = "CREATE_SERVER",
  INVITE = "INVITE",
  EDIT_SERVER = "EDIT_SERVER",
  MEMBERS = "MEMBERS",
}

interface ModalData {
  server?: Server;
}

interface ModalStore {
  data: ModalData | null;
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  data: null,
  type: null,
  isOpen: false,
  onOpen: (type: ModalType, data?: ModalData) =>
    set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
