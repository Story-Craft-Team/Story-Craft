import { useShallow } from "zustand/react/shallow";
import styles from "./AddChoiceButton.module.scss";
import { useStore } from "@/shared/stores";

export default function AddChoiceButton({ sceneId }: { sceneId: number }) {
  const { addNewChoice } = useStore(
    useShallow((state) => ({
      addNewChoice: state.addNewChoice,
    }))
  );
  return (
    <button onClick={() => addNewChoice(sceneId)} className={styles.addButton}>
      + Добавить выбор
    </button>
  );
}
