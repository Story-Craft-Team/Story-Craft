"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useUsersStore } from "@/shared/stores/users";
import s from "./Account.module.scss";
import { AccountInfo, AvatarContainer } from "@/widgets";
import { fetchUserByIdOrUsername } from "@/shared/lib/helpers";

export default function AccountPage() {
  const { userIdOrUsername } = useParams();
  const { users, setUsers, setCurrentUser, currentUser } = useUsersStore();

  useEffect(() => {
    if (!userIdOrUsername) return;

    fetchUserByIdOrUsername({
      userIdOrUsername: userIdOrUsername as string,
      setCurrentUser,
      users,
      setUsers,
    });
  }, [userIdOrUsername]);

  if (!currentUser) return null;

  return (
    <div className={s.container}>
      <AvatarContainer />
      <AccountInfo />
    </div>
  );
}
