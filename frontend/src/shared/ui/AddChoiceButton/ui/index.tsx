import styles from "./AddChoiceButton.module.scss";

interface Props {
    onClick: () => void;
}

export default function AddChoiceButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.addButton}>
      + Добавить выбор
    </button>
  );
}
