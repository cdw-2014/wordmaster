import Head from "next/head";
import styles from "../styles/Layout.module.css";
import { AppProps } from "next/app";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>WordMaster</title>
        <meta name="description" content="Word puzzle game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}> &#169; 2021 CJ Weaver</footer>
    </>
  );
}
