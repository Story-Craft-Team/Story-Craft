'use client'

import s from "./StoryEditor.module.scss";
import { SaveStory, PublicStory, PrivateStory, SceneGenerator } from "@/features";

export default function StoryEditor() {

  return (
    <div className={s.container}>
      <SceneGenerator/>
      <div className={s.controls}>
        <SaveStory />

        <PublicStory />

        <PrivateStory />
      </div>
    </div>
  );
}
