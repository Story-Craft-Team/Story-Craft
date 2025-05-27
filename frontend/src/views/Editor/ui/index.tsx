"use client";
import { StoryHeader } from "@/entities";
import { StoryEditor } from "@/widgets";

export default function EditorPage() {
  

  return (
    <>
      <StoryHeader mode="editor" />
      <StoryEditor />
    </>
  );
}
