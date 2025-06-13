'use client'

import { StoriesGenerator, StoriesSort } from "@/features";
import s from "./Stories.module.scss";
import { useStories } from "@/shared/lib/hooks/useStories";
import { useEffect } from "react";

export default function Stories() {
	const { getStories, stories } = useStories()

	useEffect(() => {
		getStories()
	}, [])

	return (
		<>
			<StoriesSort/>
			<StoriesGenerator stories={stories}/>
		</>
	);
}
