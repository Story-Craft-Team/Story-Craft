"use client"

import Link from "next/link";
import s from "./HeaderRight.module.scss";
import { useAuthStore } from "@/shared/stores/auth";

export default function HeaderRight() {
    const { isAuth, user } = useAuthStore();
    return (
      <nav className={s.nav}>
          <Link href="/editor/1">
            <span className={s.navLink} title="Создать">
              ✍️
              <span>Создать</span>
            </span>
          </Link>
          <Link href={isAuth ? `/account/${user?.id}` : "/auth/login"}>
            <span className={s.navLink} title="Профиль">
              👤
              <span>Профиль</span>
            </span>
          </Link>
          <Link href="/settings">
            <span className={s.navLink} title="Настройки">
              ⚙️
              <span>Настройки</span>
            </span>
          </Link>
        </nav>
    )
}