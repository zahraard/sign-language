import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1 className={styles.title}>Welcome to My App</h1>
        <p className={styles.ptitle}>Live Sign Language Translation</p>
        {/* <Image className={styles.imgbrd} src="/1.jpg"  width={600} height={400} /> */}
        <img className={styles.imgbrd} src="/1.jpg"/>
      </main>
    </div>
  );
}
