import s from "./Header.module.scss"
import { useAuthStore } from '@/shared/stores';
import { HeaderLeft, HeaderRight } from '@/features';

export default function Header() {
  return (
    <header className={s.header}>
        <div className={s.container}>
          <HeaderLeft/>
          <HeaderRight/>
        </div>
    </header>
  )
}