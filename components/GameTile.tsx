import type { NextPage } from "next";
import styles from "../styles/GameBoard.module.css";

interface PropTypes {
  letter?: string;
  color?: "default" | "wrongPosition" | "correctPosition";
  hidden?: boolean;
}

const GameTile: NextPage<PropTypes> = ({
  hidden = false,
  letter,
  color = "default",
}: PropTypes) => {
  const getLetter = () => {
    if (!hidden && letter && letter.length > 0) {
      return letter[0];
    }
    return "";
  };
  const getColor = () => {
    if (hidden) {
      return styles.hidden;
    }
    if (color === "correctPosition") {
      return styles.correctPosition;
    }
    if (color === "wrongPosition") {
      return styles.wrongPosition;
    }
    return "";
  };
  return <div className={`${styles.tile} ${getColor()}`}>{getLetter()}</div>;
};

export default GameTile;
