import s from "./(default)/styles/NotFound.module.scss"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className={s.notFound}>
            <h1>404</h1>
            <p>Страница не найдена</p>
            <p><Link className={s.link} href="/">Вернуться на главную</Link></p>
        </div>
    )
}