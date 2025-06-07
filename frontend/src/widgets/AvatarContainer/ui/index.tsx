"use client";

import s from "./AvatarContainer.module.scss";
import { useAuthStore } from "@/shared/stores";
import { useUsersStore } from "@/shared/stores/users";
import { Modal, NewModal } from "@/shared/ui";
import { useState, useRef, useEffect } from "react";
import { updateMe } from "@/shared/api/users/mutations";
import { MdModeEdit } from "react-icons/md";

export default function AvatarContainer() {
  const { user } = useAuthStore();
  const { currentUser, updateUser } = useUsersStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avatarUrlValue, setAvatarUrlValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  if (!currentUser) return null;

  const { avatarUrl, username, id } = currentUser;

  const handleEditAvatar = () => {
    setShowModal(true);
    setAvatarUrlValue(avatarUrl || "");
  };

  const handleSaveAvatar = () => {
    if (avatarUrlValue.trim() !== (avatarUrl || "")) {
      updateUser?.(id, { ...currentUser, avatarUrl: avatarUrlValue });
      updateMe(id, { avatarUrl: avatarUrlValue });
    }
    setShowModal(false);
  };

  const handleCancelAvatar = () => {
    setAvatarUrlValue(avatarUrl || "");
    setShowModal(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveAvatar();
    } else if (e.key === "Escape") {
      handleCancelAvatar();
    }
  };

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
        <button onClick={handleEditAvatar} className={s.editAvatar}>
          Изменить
        </button>
      )}
      {showModal && (
        <NewModal setIsVisible={setShowModal} isVisible={showModal}>
          <div className={s.modalContent}>
            <h3>Изменить аватар</h3>
            <div className={s.inputContainer}>
              <input
                type="text"
                value={avatarUrlValue}
                onChange={(e) => setAvatarUrlValue(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                placeholder="Введите URL аватара"
                className={s.avatarInput}
              />
              <button
                className={s.editButton}
                onClick={handleSaveAvatar}
                aria-label="Сохранить аватар"
              >
                <MdModeEdit />
              </button>
            </div>
            <div className={s.modalButtons}>
              <button onClick={handleSaveAvatar} className={s.saveButton}>
                Сохранить
              </button>
              <button onClick={handleCancelAvatar} className={s.cancelButton}>
                Отмена
              </button>
            </div>
          </div>
        </NewModal>
      )}
    </div>
  );
}