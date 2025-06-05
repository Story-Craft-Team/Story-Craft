import s from "./Header.module.scss";
import { HeaderLeft, HeaderRight } from "@/features";

export default function Header() {
  return (
    <>
      <div className={s.header}>
        <div className={s.container}>
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
      <hr className={s.hr} />
    </>
  );
}