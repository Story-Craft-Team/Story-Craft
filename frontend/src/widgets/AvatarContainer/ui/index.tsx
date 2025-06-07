"use client";

import s from "./AvatarContainer.module.scss";
import { useAuthStore } from "@/shared/stores";
import { useUsersStore } from "@/shared/stores/users";
import { Modal } from "@/shared/ui";
import { useState } from "react";

export default function AvatarContainer() {
  const { user } = useAuthStore();
  const { currentUser } = useUsersStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  if (!currentUser) return null;

  const { avatarUrl, username } = currentUser;

  return (
    <div className={s.avatarContainer}>
      <img
        src={avatarUrl || "/withoutAvatar.png"}
        alt="avatar"
        title={username}
        className={s.avatar}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== location.origin + "/withoutAvatar.png") {
            target.src = "/withoutAvatar.png";
          }
        }}
      />
      {user?.id === currentUser?.id && (
        <button onClick={() => setShowModal(true)} className={s.editAvatar}>Изменить</button>
      )}
      {showModal && <Modal>1</Modal>}
    </div>
  );
}
