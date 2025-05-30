import styles from "./RemoveSceneButton.module.scss";

interface Props {
    onClick: () => void;
}

export default function RemoveButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={styles.removeButton}
      title="Удалить сцену"
    >
      Удалить сцену
    </button>
  );
}
