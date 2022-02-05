import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent } from "react";
import styles from "../styles/Home.module.css";

interface IForm {
  test: string;
  test2: string;
}

const Home: NextPage = () => {
  const [state, setState] = React.useState<IForm>({ test: "", test2: "" });

  React.useEffect(() => {
    new URL(window.location.href).searchParams.forEach((value, key) => {
      console.log(key, value);
      setState((prev) => ({ ...prev, [key]: value }));
    });
  }, []);

  return (
    <div>
      <h1 className={styles.title}>
        Welcome to <span>Word</span>Master!
      </h1>

      <p className={styles.description}>
        Get started by choosing a gamemode below:
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Link href="/play/classic" as="/play/classic">
            <a>
              <h2>Classic &rarr;</h2>
              <p>
                Guess the word in as few guesses as possible with hints for
                correct letters and correct positions!
              </p>
            </a>
          </Link>
        </div>

        <div className={styles.card}>
          {/* <Link href="/play/crossword" as="/play"> */}
          <a>
            <h2>Crossword &rarr;</h2>
            {/* <p>
                A harder spin on Classic - Guess two or more words in a
                crossword style arrangement!
              </p> */}
            <p>Coming Soon!</p>
          </a>
          {/* </Link> */}
        </div>

        <div className={styles.card}>
          {/* <Link href="/play/link" as="/play"> */}
          <a>
            <h2>Link &rarr;</h2>
            {/* <p>
                Guess the two overlapping words that share letters at the
                end/beginning of the words!
              </p> */}
            <p>Coming Soon!</p>
          </a>
          {/* </Link> */}
        </div>

        <div className={styles.card}>
          {/* <Link href="/play/classic" as="/play"> */}
          <a>
            <h2>Cipher &rarr;</h2>
            {/* <p>
                Guess as many words as you can, and use the given cipher hints
                to crack the code!
              </p> */}
            <p>Coming Soon!</p>
          </a>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
