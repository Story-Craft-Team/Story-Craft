'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLikes, useViews } from '@/shared/lib'
import s from './Story.module.scss'
import { useReadingStoriesStore } from '@/shared/stores/readingStories'
import { useUsersStore } from '@/shared/stores'

export default function StoryCard({ id, title, author, image, tags = [] }: {
	id: number
	title: string
	author: string
	image?: string
	tags?: string[]
}) {
	const { getLikesCount, likesCount } = useLikes()
	const { getViews, views, setView } = useViews()
	const { getStoryProgress } = useReadingStoriesStore()
	const { currentUser } = useUsersStore()

	useEffect(() => {
		getLikesCount(id)
		getViews(id)
	}, [id])


	return (
		<article className={s.card}>
			<div className={s.imageContainer}>
				<Image
					src={image || '/NoImg.png'}
					alt={`Обложка: ${title}`}
					fill
					className={s.image}
				/>
			</div>

			<div className={s.content}>
				<div className={s.header}>
					<h3 className={s.title}>{title}</h3>
					<p className={s.author}>Автор: {author}</p>
				</div>

				<div className={s.footer}>
					<div className={s.stats}>
						<span className={s.stat}>👀 {views}</span>
						<span className={s.stat}>❤ {likesCount}</span>
					</div>

					<Link
						href={`/read/${id}`}
						className={s.readBtn}
						onClick={() => setView(id)}
					>
						{getStoryProgress(id, currentUser!.id) ? "Читать дальше" : "Читать"}
					</Link>
				</div>
			</div>
		</article>
	)
}