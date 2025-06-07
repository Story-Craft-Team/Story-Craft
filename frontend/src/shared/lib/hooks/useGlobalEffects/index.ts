// hooks/useGlobalEffect.ts
"use client";

import { useEffect } from "react";
import { me, updateUserJwt } from "@/shared/api/auth/queries";
import { useUsersStore } from "@/shared/stores";
import { toast } from "react-toastify";

export function useGlobalEffect() {
  const { user, setUser, setIsAuth } = useUsersStore();
  // Fetch user by JWT
  useEffect(() => {

    if (!user) {
    const fetchUser = async () => {
      try {

        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const meResponse = await me(accessToken);
          const user = meResponse.user;
          setUser(user);
        }
      } catch (error) {
        updateJwt();
      }
    };

    const updateJwt = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const updateAccessToken = await updateUserJwt(refreshToken);
          // localStorage.setItem("accessToken", updateAccessToken?.accessToken);
        }
      } catch (error) {
        toast.warn("Failed to login. Try to login again.");
      }
    };

    fetchUser();
    }
  }, []);

  // Update isAuth state
  // useEffect(() => {
  //   if (user) {
  //     setIsAuth(true);
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, [user]);
}
