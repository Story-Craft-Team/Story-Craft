"use client"

import { useAuthStore } from "@/shared/stores";

export default function AccountPage() {
  const { user } = useAuthStore();
    return <div>{user?.username}</div>;
}