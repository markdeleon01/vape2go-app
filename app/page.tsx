import Image from "next/image";
import styles from './styles.home.module.css'

export default function Home() {
  return (
    <div className="grid justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start">
        <div className={styles.home}>
        <Image
          className="dark:invert"
          src="/vape2go_logo.jpg"
          alt="Vape To Go logo"
          width={500}
          height={500}
          priority
        />
        </div>
      </main>
    </div>
  );
}
