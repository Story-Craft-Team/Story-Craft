"use client";
import { StoryHeader } from "@/entities";
import { useStore } from "@/shared/stores";

export default function ReadPage() {
  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const scenes = useStore((state) => state.scenes);
  const setSceneTitle = useStore((state) => state.setSceneTitle);
  const addNewScene = useStore((state) => state.addNewScene);

  const sceneCount = scenes.length;

  return (
    <>
      <StoryHeader  mode="editor" />
    </>
  );
}
