"use client";
import { StoryHeader } from "@/features";
import { StoryEditor } from "@/widgets";

export default function EditorPage() {
  
  return (
    <>
      <StoryHeader mode="editor" />
      <StoryEditor />
    </>
  );
}
