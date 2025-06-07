import s from "./AddChoiceButton.module.scss";

interface Props {
    onClick: () => void;
}

export default function AddChoiceButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className={s.addButton}>
      + Добавить выбор
    </button>
  );
}
