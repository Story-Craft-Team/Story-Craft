import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoMdCreate, IoMdSettings } from "react-icons/io";
import s from "./Header.module.scss";

export default function Header() {
  return (
    <div className={s.header}>
      <Link href="/" className={s.left}>
        <h1>Story Craft</h1>
        <p>The project in which you can create your own story!</p>
      </Link>
      <div className={s.right}>
        <Link href="/editor/1">
          <IoMdCreate />
        </Link>
        <Link href="/settings">
          <IoMdSettings />
        </Link>
        <Link href="/account">
          <FaUser />
        </Link>
      </div>
    </div>
  );
}
// TODO убрать editor/1 и поставить create в финальной версии

// TODO сделать так - чтобы при нахождении на странице истории добавлялась кнопка редактирования только для пользователей, которые создавали историю
                          