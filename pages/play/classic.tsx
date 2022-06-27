import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import GameTile from "../../components/GameTile";
import KeyboardTile from "../../components/KeyboardTile";
import { ALL_WORDS } from "../../constants/validWords";
import styles from "../../styles/Play.module.css";

interface Props {
  solution: string;
}

const defaultColors = () => {
  return new Array(6).fill(new Array(5).fill("default"));
};

const ClassicPage: NextPage<Props> = ({ solution }: Props) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [colors, setColors] = useState<
    ("default" | "wrongPosition" | "correctPosition")[][]
  >(defaultColors());
  const [word, setWord] = useState<string>(solution);
  const [current, setCurrent] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (gameOver) return;
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        setCurrent((prev) => (prev + e.key.toLowerCase()).substr(0, 5));
      } else if (e.key === "Backspace") {
        setCurrent((prev) => prev.substring(0, prev.length - 1));
      } else if (e.key === "Enter" && current.length === 5) {
        calculateMove();
      }
    };
    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [current]);

  useEffect(() => {
    if (guesses.length === 6 || guesses.includes(word)) {
      setGameOver(true);
    }
  }, [guesses]);

  const populateGuess = (guessNumber: number, charNumber: number): string => {
    if (guesses.length < guessNumber - 1) return "";
    if (guesses.length === guessNumber - 1) return current.charAt(charNumber);
    return guesses[guessNumber - 1].charAt(charNumber);
  };

  const getIndicies = (
    set: Map<String, number[]>,
    char: string,
    index: number
  ): number[] => {
    if (set.has(char)) {
      const newList: number[] = set.get(char) ?? [];
      newList.push(index);
      return newList;
    }
    return [index];
  };

  const calculateMove = () => {
    if (!ALL_WORDS.includes(current)) return;
    const _colors = new Array(5).fill("default");
    const repeats = new Map<String, number>();
    const repeatsIndices = new Map<String, number[]>();
    word.split("").forEach((c) => {
      if (!repeats.has(c)) {
        repeats.set(c, 1);
      } else {
        repeats.set(c, (repeats.get(c) ?? 0) + 1);
      }
    });
    current.split("").forEach((c, i) => {
      if (repeats.has(c)) {
        if (word.charAt(i) == c) {
          _colors[i] = "correctPosition";
          repeats.set(c, (repeats.get(c) ?? 0) - 1);
          if ((repeats.get(c) ?? 0) < 0) {
            const newList: number[] = repeatsIndices.get(c) ?? [0];
            const oldIndex = newList.pop() || 0;
            _colors[oldIndex] = "default";
            repeatsIndices.set(c, newList);
          }
        } else if (word.includes(c)) {
          _colors[i] = "wrongPosition";
          repeats.set(c, (repeats.get(c) ?? 0) - 1);
          repeatsIndices.set(c, getIndicies(repeatsIndices, c, i));
          if ((repeats.get(c) ?? 0) < 0) {
            const newList: number[] = repeatsIndices.get(c) ?? [0];
            const oldIndex = newList.pop() || 0;
            _colors[oldIndex] = "default";
            repeatsIndices.set(c, newList);
          }
        }
      }
    });
    const guessNumber = guesses.length;
    const tempColors = [...colors];
    let replaceColor = { ...tempColors[guessNumber] };
    replaceColor = _colors;
    tempColors[guessNumber] = replaceColor;
    setGuesses((prev) => [...prev, current]);
    setColors(tempColors);
    setCurrent("");
  };

  return (
    <Fragment>
      <h5 className={styles.title}>
        <span>Word</span>Master: Classic
      </h5>

      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <div key={i} className={styles.row}>
              <GameTile letter={populateGuess(i + 1, 0)} color={colors[i][0]} />
              <GameTile letter={populateGuess(i + 1, 1)} color={colors[i][1]} />
              <GameTile letter={populateGuess(i + 1, 2)} color={colors[i][2]} />
              <GameTile letter={populateGuess(i + 1, 3)} color={colors[i][3]} />
              <GameTile letter={populateGuess(i + 1, 4)} color={colors[i][4]} />
            </div>
          );
        })}
      </div>

      <div className={styles.keyboard}>
        <div className={styles.topRow}>
          <KeyboardTile label="Q" />
          <KeyboardTile label="W" />
          <KeyboardTile label="E" />
          <KeyboardTile label="R" />
          <KeyboardTile label="T" />
          <KeyboardTile label="Y" />
          <KeyboardTile label="U" />
          <KeyboardTile label="I" />
          <KeyboardTile label="O" />
          <KeyboardTile label="P" />
        </div>
        <div className={styles.middleRow}>
          <KeyboardTile label="A" />
          <KeyboardTile label="S" />
          <KeyboardTile label="D" />
          <KeyboardTile label="F" />
          <KeyboardTile label="G" />
          <KeyboardTile label="H" />
          <KeyboardTile label="J" />
          <KeyboardTile label="K" />
          <KeyboardTile label="L" />
        </div>
        <div className={styles.bottomRow}>
          <KeyboardTile label="ENTER" />
          <KeyboardTile label="Z" />
          <KeyboardTile label="X" />
          <KeyboardTile label="C" />
          <KeyboardTile label="V" />
          <KeyboardTile label="B" />
          <KeyboardTile label="N" />
          <KeyboardTile label="M" />
          <KeyboardTile label="<-" />
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const solution = await fetch("http://localhost:3000/api/word");
  const data: string = await solution.text();
  console.log("PROPS:", data);
  return {
    props: { solution: data },
  };
};

export default ClassicPage;
