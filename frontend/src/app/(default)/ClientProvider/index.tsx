'use client'

import { ReactNode } from "react";
import { useGlobalEffect } from "@/shared/lib";
import { ToastContainer } from "react-toastify";

export default function ClientProvider({ children }: { children: ReactNode }) {
  useGlobalEffect();
  return (
    <>
      {children}
      <ToastContainer theme="dark"/>
    </>
  );
}
