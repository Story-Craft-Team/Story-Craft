import Link from "next/link";
import s from "./HeaderLeft.module.scss";

export default function HeaderLeft() {
  return (
      <Link href="/" className={s.left}>
          <h1>Story Craft</h1>
          <p>Место, где ты можешь создать свою собственную историю!</p>
      </Link>
  )
}