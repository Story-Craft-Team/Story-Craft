'use client'

import { StoriesGenerator, StoriesSort } from "@/features";
import s from "./Stories.module.scss";
import { useStories } from "@/shared/lib/hooks/useStories";

export default function Stories() {
	const { sortStories, sortedStories, fetchStoriesByLimit } = useStories()

	return (
		<>
			<StoriesSort sortStories={sortStories} sortedStories={sortedStories}/>
			<StoriesGenerator fetchStoriesByLimit={fetchStoriesByLimit} sortedStories={sortedStories}/>
		</>
	);
}
