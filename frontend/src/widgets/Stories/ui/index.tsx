'use client'

import { StoriesGenerator, StoriesSort } from "@/features";
import s from "./Stories.module.scss";
import { useEffect, useState } from "react";
import { useStories } from "@/shared/lib/hooks/useStories";
import { IStoryHeader } from "@/shared/lib";

export default function Stories() {
	const [stories, setStories] = useState<IStoryHeader[] | null>(null)
	const { getAllStories } = useStories()

	useEffect(() => {
		setStories(getAllStories)
	}, [])

	return (
		<>
			<StoriesSort/>
			<StoriesGenerator stories={stories}/>
		</>
	);
}
