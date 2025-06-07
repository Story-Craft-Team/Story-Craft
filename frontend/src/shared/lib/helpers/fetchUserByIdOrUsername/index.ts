import { findUser } from "@/shared/api/users/queries";
import { IUser } from "@/shared/lib";

type Parameters = {
  userIdOrUsername: string;
  setCurrentUser: (user: IUser | null) => void;
  users: IUser[];
  setUsers: (users: IUser[]) => void;
};

export const fetchUserByIdOrUsername = async ({
  userIdOrUsername,
  setCurrentUser,
  users,
  setUsers,
}: Parameters) => {
  try {
    const user = await findUser(userIdOrUsername);
    if (!user) {
      setCurrentUser(null);
      return;
    }

    setCurrentUser(user);
    const userExists = users.some((u) => u.id === user.id);
    if (!userExists) {
      setUsers([...users, user]);
    }
  } catch (error) {
    console.error("Ошибка при загрузке пользователя:", error);
    setCurrentUser(null);
  }
};
