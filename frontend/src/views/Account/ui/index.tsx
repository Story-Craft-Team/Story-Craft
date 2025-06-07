"use client";

import { useAuthStore } from "@/shared/stores";

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
