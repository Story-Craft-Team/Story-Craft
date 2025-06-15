'use client'

import React, { useEffect, useState } from 'react';
import s from './ReadHeader.module.scss'
import Link from 'next/link';
import { useHeader } from '@/shared/lib';
import { useLikes } from '@/shared/lib';
import { useViews } from '@/shared/lib';
import { useUsersStore } from '@/shared/stores';
import { useReadingStoriesStore } from '@/shared/stores/readingStories';

export default function ReadHeader() {
  const { getStory, story } = useHeader()
  const [storyLiked, setStoryLiked] = useState<boolean>(false)
  const { getLikesCount, getLikes, setLike, deleteLike, likesCount } = useLikes()
  const { getViews, views } = useViews()
  const { currentUser } = useUsersStore()
  const { startAndUpdateStory, getStoryProgress } = useReadingStoriesStore()
  const [ proggresScene, setProggresScene ] = useState<number>()

  useEffect(() => {
    getStory()
  }, [])

  useEffect(() => {
    const isLiked = async () => {
      if (story) {
        const likeRes = await getLikes(story.id!)
        likeRes.map(like => {
          if (like.userId === currentUser!.id) {
            setStoryLiked(true)
          }
        })
        const proggresRes = getStoryProgress(story.id!, currentUser!.id)
        if(!proggresRes){
          startAndUpdateStory(story.id!, currentUser!.id, story.scenes[0].id)
        }
        setProggresScene(getStoryProgress(story.id!, currentUser!.id)?.currentSceneId)
      }
    }

    isLiked()
  }, [story])

  useEffect(() => {
    if (story) {
      getLikes(story.id!)
      getLikesCount(story.id!)
      getViews(story.id!)
    }
  }, [story])

  if (!story) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className={s.container}>
      <div className={s.titleRow}>
        <h2 className={s.titleText}>{story!.title}</h2>
        <h2 className={s.scenesCount}>Количество сцен: {story.scenes.length}</h2>
      </div>
      <div className={s.imgContainer}>
        <img className={s.img} src={story.image ? story.image : "/NoImg.png"} />
        <h3 className={s.description}>{story!.description}</h3>
        <div className={s.likeContainer}>
          <button onClick={() => {
            storyLiked ? deleteLike(story.id!) : setLike(story.id!)
            setStoryLiked(!storyLiked)
          }} className={storyLiked ? s.deliveredLike : s.undeliveredLike}>❤ {likesCount}</button>
          <h4>👀 {views}</h4>
        </div>
      </div>
      <div className={s.btnContainer}>
        <Link href={`/read/${story!.id}/${proggresScene}`}><button className={s.btn}>Читать</button></Link>
      </div>
    </div>
  );
};
