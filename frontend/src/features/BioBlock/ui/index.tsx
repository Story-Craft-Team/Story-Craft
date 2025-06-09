import { useAuthStore, useUsersStore } from "@/shared/stores";
import { updateMe } from "@/shared/api/users/mutations";
import { MdModeEdit } from "react-icons/md";
import s from "./BioBlock.module.scss";

export default function BioBlock() {
  const { currentUser, updateUser, accountInfoState, updateAccountInfoState } =
    useUsersStore();
  const { user } = useAuthStore();

  const { bioIsEditting, bioValue } = accountInfoState;

  const bio = currentUser?.bio;

  const handleBioEdit = () => {
    updateAccountInfoState({
      ...accountInfoState,
      bioIsEditting: true,
      bioValue: bio || "",
    });
  };

  const handleBioSave = () => {
    updateUser?.(currentUser!.id, { ...currentUser!, bio: bioValue });
    updateMe(currentUser!.id, { bio: bioValue });
    updateAccountInfoState({
      ...accountInfoState,
      bioIsEditting: false,
    });
  };

  const handleBioCancel = () => {
    updateAccountInfoState({
      ...accountInfoState,
      bioIsEditting: false,
      bioValue: bio || "",
    });
  };

  const handleBioKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBioSave();
    } else if (e.key === "Escape") {
      handleBioCancel();
    }
  };

  return (
    <div className={s.bioSection}>
      {user?.id === currentUser?.id ? (
        bioIsEditting ? (
          <div className={s.editContainer}>
            <textarea
              value={bioValue}
              onChange={(e) =>
                updateAccountInfoState({
                  ...accountInfoState,
                  bioValue: e.target.value,
                })
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
  );
}
