import { updateMe } from "@/shared/api/users/mutations";
import { useAuthStore, useUsersStore } from "@/shared/stores";
import s from "./UsernameBlock.module.scss";
import { MdModeEdit } from "react-icons/md";

export default function UsernameBlock() {
    const { currentUser, updateUser, accountInfoState, updateAccountInfoState } =
      useUsersStore();
    const { user } = useAuthStore();
  
    const { usernameIsEditting, usernameValue } = accountInfoState;
  
    const username = currentUser?.username;
    const isVerified = currentUser?.isVerified;

    const handleUsernameEdit = () => {
      updateAccountInfoState({
        ...accountInfoState,
        usernameIsEditting: true,
        usernameValue: username || "",
      });
    };

    const handleUsernameSave = () => {
      updateUser?.(currentUser!.id, { ...currentUser!, username: usernameValue! });
      updateMe(currentUser!.id, { username: usernameValue! });
      updateAccountInfoState({
        ...accountInfoState,
        usernameIsEditting: false,
      });
    };

    const handleUsernameKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleUsernameSave();
      } else if (e.key === "Escape") {
        handleUsernameCancel();
      }
    };

    const handleUsernameCancel = () => {
      updateAccountInfoState({
        ...accountInfoState,
        usernameIsEditting: false,
        usernameValue: username || "",
      });
    };
  
  return (
    <h1 className={s.username}>
      {user?.id === currentUser?.id ? (
        usernameIsEditting ? (
          <div className={s.editContainer}>
            <input
              type="text"
              value={usernameValue}
              onChange={(e) =>
                updateAccountInfoState({
                  ...accountInfoState,
                  usernameValue: e.target.value,
                })
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
  );
}