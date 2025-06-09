import s from "./Story.module.scss";
import Link from "next/link";

interface Props{
	id: number,
	title: string,
	author: string
}

export default function Story({ id, title, author }: Props) {
	return (
		<div className={s.story}>
			<img className={s.img} src="/story.jfif" alt="" />
			<h1 className={s.title}>{title}</h1>
			<p className={s.author}>Автор: <u>{author}</u></p>
			<p className={s.grade}>4.7/5</p>
			<p className={s.reviews}>475 отзывов</p>
			<Link href={`read/${id}`}><button className={s.btn}>Читать</button></Link>
		</div>
	);
}
