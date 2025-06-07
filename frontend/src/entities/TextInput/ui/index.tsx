import { useStoryEditorStore } from "@/shared/stores";
import { useShallow } from "zustand/shallow";
import s from "./TextInput.module.scss";

type Props = {
  id: number;
};

export default function TextInput({ id }: Props) {
  // const { setSceneTitle } = useStoryEditorStore(
  //   useShallow((state) => state)
  // );

  // const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setSceneTitle(id, e.target.value);
  // };

  // return (
  //   <textarea
  //     className={s.text_input}
  //     placeholder="First scene of the story"
  //     value={setSceneTitle(id)}
  //     onChange={onChange}
  //   ></textarea>
  // );
}
//TODO по идеи тут будет инпут из StoryEditor
