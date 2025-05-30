import s from "./Story.module.scss";
import Link from "next/link";

export default function Story() {
	return (
		<div className={s.story}>
			<Link href="/read/1">
				<img className={s.img} src="/bg.jfif" alt="" />
				<h1 className={s.title}>The title of the Story</h1>
				<p className={s.author}>Author: Redefined</p>
				<p className={s.grade}>Grade: 4/5</p>
			</Link>
		</div>
	);
}
