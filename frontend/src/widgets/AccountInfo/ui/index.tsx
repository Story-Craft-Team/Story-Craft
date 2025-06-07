import s from "./AccountInfo.module.scss";                        
import { MdModeEdit } from "react-icons/md";
import { capitalized } from "@/shared/lib/helpers";
import { useUsersStore } from "@/shared/stores/users";
import { useAuthStore } from "@/shared/stores";

export default function AccountInfo() {
  const { currentUser } = useUsersStore();
  const { user } = useAuthStore();

  if (!currentUser) return null;

  const { username, isVerified, role, plan, bio } = currentUser;

  return (
    <div className={s.info}>
      <h1>
        {username}{" "}
        {user?.id === currentUser?.id && (
          <button className={s.edit}>
            <MdModeEdit />
          </button>
        )}
        {isVerified && (
          <img
            className={s.verified}
            src="/verified.png"
            alt="Verified user"
            title="This user is verified"
          />
        )}
      </h1>
      <p>
        {capitalized(role.toString())} ་{" "}
        {capitalized(plan.toString()) + " plan"}
      </p>
      <p>
        {bio || <i>Этот пользователь не имеет описания</i>}{" "}
        {user?.id === currentUser?.id && (
          <button className={s.edit}>
            <MdModeEdit />
          </button>
        )}
      </p>
    </div>
  );
}
