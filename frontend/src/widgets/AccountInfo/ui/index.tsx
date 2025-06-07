"use client";

import s from "./AccountInfo.module.scss";
import { MdModeEdit } from "react-icons/md";
import { capitalized } from "@/shared/lib/helpers";
import { useUsersStore } from "@/shared/stores/users";
import { useAuthStore } from "@/shared/stores";
import { useState } from "react";
import { updateMe } from "@/shared/api/users/mutations";

type AccountInfoState = {
  usernameIsEditting: boolean;
  bioIsEditting: boolean;
  usernameValue: string;
  bioValue: string;
};

export default function AccountInfo() {
  const { currentUser, updateUser } = useUsersStore();
  const { user } = useAuthStore();

  const [accountInfoState, setAccountInfoState] = useState<AccountInfoState>({
    usernameIsEditting: false,
    bioIsEditting: false,
    usernameValue: currentUser?.username || "",
    bioValue: currentUser?.bio || "",
  });

  const { usernameIsEditting, bioIsEditting, usernameValue, bioValue } =
    accountInfoState;

  if (!currentUser) return null;

  const { username, isVerified, role, plan, bio } = currentUser;

  const handleUsernameEdit = () => {
    setAccountInfoState((prev) => ({
      ...prev,
      usernameIsEditting: true,
      usernameValue: username,
    }));
  };

  const handleBioEdit = () => {
    setAccountInfoState((prev) => ({
      ...prev,
      bioIsEditting: true,
      bioValue: bio || "",
    }));
  };

  const handleUsernameSave = () => {
    updateUser?.(currentUser.id, { ...currentUser, username: usernameValue });
    updateMe(currentUser.id, { username: usernameValue });
    setAccountInfoState((prev) => ({
      ...prev,
      usernameIsEditting: false,
    }));
  };

  const handleBioSave = () => {
    updateUser?.(currentUser.id, { ...currentUser, bio: bioValue });
    updateMe(currentUser.id, { bio: bioValue });
    setAccountInfoState((prev) => ({
      ...prev,
      bioIsEditting: false,
    }));
  };

  const handleUsernameCancel = () => {
    setAccountInfoState((prev) => ({
      ...prev,
      usernameIsEditting: false,
      usernameValue: username,
    }));
  };

  const handleBioCancel = () => {
    setAccountInfoState((prev) => ({
      ...prev,
      bioIsEditting: false,
      bioValue: bio || "",
    }));
  };

  const handleUsernameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUsernameSave();
    } else if (e.key === "Escape") {
      handleUsernameCancel();
    }
  };

  const handleBioKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBioSave();
    } else if (e.key === "Escape") {
      handleBioCancel();
    }
  };

  return (
    <div className={s.info}>
      <h1 className={s.username}>
        {user?.id === currentUser?.id ? (
          usernameIsEditting ? (
            <div className={s.editContainer}>
              <input
                type="text"
                value={usernameValue}
                onChange={(e) =>
                  setAccountInfoState((prev) => ({
                    ...prev,
                    usernameValue: e.target.value,
                  }))
                }
                onKeyDown={handleUsernameKeyPress}
                onBlur={handleUsernameSave}
                autoFocus
                className={s.editInput}
              />
            </div>
          ) : (
            <>
              <div className={s.usernameContainer}>
                <span>{username}</span>
                <button
                  className={s.edit}
                  onClick={handleUsernameEdit}
                  aria-label="Редактировать имя пользователя"
                >
                  <MdModeEdit />
                </button>
              </div>
            </>
          )
        ) : (
          <span>{username}</span>
        )}

        {isVerified && (
          <>
            <img
              className={s.verified}
              src="/verified.png"
              alt="Verified user"
              title="This user is verified"
            />
          </>
        )}
      </h1>

      <p className={s.roleInfo}>
        {capitalized(role.toString())} ་{" "}
        {capitalized(plan.toString()) + " plan"}
      </p>

      <div className={s.bioSection}>
        {user?.id === currentUser?.id ? (
          bioIsEditting ? (
            <div className={s.editContainer}>
              <textarea
                value={bioValue}
                onChange={(e) =>
                  setAccountInfoState((prev) => ({
                    ...prev,
                    bioValue: e.target.value,
                  }))
                }
                onKeyDown={handleBioKeyPress}
                onBlur={handleBioSave}
                autoFocus
                className={s.editTextarea}
                placeholder="Добавьте описание..."
                rows={3}
              />
            </div>
          ) : (
            <div className={s.bioContainer}>
              <p className={s.bioText}>
                {bio || <i>Этот пользователь не имеет описания</i>}
              </p>
              <button
                className={s.edit}
                onClick={handleBioEdit}
                aria-label="Редактировать биографию"
              >
                <MdModeEdit />
              </button>
            </div>
          )
        ) : (
          <p className={s.bioText}>
            {bio || <i>Этот пользователь не имеет описания</i>}
          </p>
        )}
      </div>
    </div>
  );
}
