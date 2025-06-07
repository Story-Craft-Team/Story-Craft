"use client"

import { useUsersStore } from "@/shared/stores";

export default function AccountPage() {
  const { user } = useUsersStore();
    return <div>{user?.username}</div>;
}