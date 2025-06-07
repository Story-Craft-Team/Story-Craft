"use client"

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoMdCreate, IoMdSettings } from "react-icons/io";
import s from "./HeaderRight.module.scss";
import { useUsersStore } from "@/shared/stores";

export default function HeaderRight() {
    const { isAuth, user } = useUsersStore();
    return (
      <div className={s.right}>
      <Link href="/editor/1">
        <IoMdCreate />
      </Link>
      <Link href="/settings">
        <IoMdSettings />
      </Link>
      <Link href={isAuth ? `/auth/account/${user?.id}` : "/auth/login"}>
        <FaUser />
      </Link>
    </div>
    )
}