"use client";

import s from "./StoryHeader.module.scss";
import { useState } from "react";
import { IStoryHeaderMode } from "@/shared/lib";
import { EditHeader, ReadHeader } from "@/features";

interface Props{
    mode?: IStoryHeaderMode;
}

export default function StoryHeader({ mode = "read" }: Props) {
  const [editable] = useState(mode === "editor");

  return (
    <>
      {editable ? <EditHeader/> : <ReadHeader/> }
    </>
  );
}
