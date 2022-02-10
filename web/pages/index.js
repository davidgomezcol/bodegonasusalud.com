import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bodegón A Su Salud, C.A.</title>
        <meta name="description" content="Bodegón A Su Salud, C.A." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Bodegón A Su Salud</h1>
          <p>Initial Webpage</p>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
