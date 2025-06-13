'use client'

import { usePathname } from "next/navigation";
import { useState } from "react";
import { IScene } from "../../types";
import axiosInstance from "@/shared/api/client";
import { getAllChoices } from "@/shared/api/choices/queries";
import { getAllScenes, getOneScene } from "@/shared/api/scenes/queries";

export const useScene = () => {
    const pathname = usePathname();
    const [scene, setScene] = useState<IScene | null>(null)
    const getScene = async () => {
        const sceneId = pathname.split('/')[3]
        const storyId = pathname.split('/')[2]
        const getScene = await getOneScene(+storyId, +sceneId)
        const sceneChoices = await getAllChoices(+storyId, +sceneId)
        setScene({...getScene, ...sceneChoices})
        return scene as IScene
    }

    return {getScene, scene}
}