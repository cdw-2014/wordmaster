import type { NextPage } from "next";
import styles from "../styles/GameBoard.module.css";

interface PropTypes {
  label: string;
  color?: "default" | "wrongPosition" | "correctPosition" | "wrong";
}

const KeyboardTile: NextPage<PropTypes> = ({
  label,
  color = "default",
}: PropTypes) => {
  const getColor = () => {
    switch (color) {
      case "default":
        return styles.default;
      case "wrong":
        return styles.wrong;
      case "wrongPosition":
        return styles.wrongPosition;
      case "correctPosition":
        return styles.correctPosition;
      default:
        return styles.default;
    }
  };
  return <div className={`${styles.keyboardTile} ${getColor()}`}>{label}</div>;
};

export default KeyboardTile;
