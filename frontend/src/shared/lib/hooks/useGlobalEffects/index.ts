// hooks/useGlobalEffect.ts
"use client";

import { useEffect } from "react";
import { me, updateUserJwt } from "@/shared/api/auth/queries";
import { useAuthStore } from "@/shared/stores";
import { toast } from "react-toastify";

export function useGlobalEffect() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const updateJwt = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }
        
        const updateAccessToken = await updateUserJwt(refreshToken);
        localStorage.setItem("accessToken", updateAccessToken.accessToken);
        return updateAccessToken.accessToken;
      } catch (error) {
        toast.warn("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        return null;
      }
    };

    const checkAuth = async () => {
      try {
        let accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        // Первая попытка с текущим accessToken
        try {
          const meResponse = await me(accessToken);
          setUser(meResponse.user);
          return;
        } catch (firstAttemptError) {
          console.log("First attempt failed, trying to refresh token...");
        }

        // Если первая попытка не удалась, пробуем обновить токен
        const newAccessToken = await updateJwt();
        if (!newAccessToken) return;

        // Вторая попытка с новым токеном
        try {
          const meResponse = await me(newAccessToken);
          setUser(meResponse.user);
        } catch (secondAttemptError) {
          throw new Error("Failed to authenticate even after token refresh");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setUser(null);
      }
    };

    if (!user) {
      checkAuth();
    }

    // Можно добавить интервал для проверки актуальности токена
    const interval = setInterval(checkAuth, 30 * 60 * 1000); // Проверка каждые 30 минут

    return () => clearInterval(interval);
  }, [user, setUser]);
}