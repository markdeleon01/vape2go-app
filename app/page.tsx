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
        <p className={styles.linkFacebook}>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://web.facebook.com/profile.php?id=61560683637397"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />Follow us on Facebook!
        </a>
        </p>
        </div>
      </main>
    </div>
  );
}
