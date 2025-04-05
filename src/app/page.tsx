'use client'
import Image from "next/image";
import styles from "./page.module.css";
import niña1 from '../../public/Images/Niña_Saludando.png'
import niña2 from '../../public/Images/Niña_Pensando.png'
import niño1 from '../../public/Images/Niño_Tijeras.png'
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const redirect = (target: string) => {
    router.push(`/${target}`)
  }

  return (
    <div className={styles.page}>
        <h1>Juegos Para Niños</h1>
        <div className={styles.options}>
          <div onClick={()=> redirect("Memorama")} className={styles.option} style={{backgroundColor: "#E3655D"}}>
            <Image className={styles.illustration} src={niña2} alt="Kid"></Image>
            <h2>Juego De Memoria</h2>
          </div>
          <div onClick={()=> redirect("Ordenar")} className={styles.option} style={{backgroundColor: "#a6cadd"}}>
            <Image className={styles.illustration} src={niño1} alt="Kid"></Image>
            <h2>Ordena la palabra</h2>
          </div>
          <div onClick={()=> redirect("Adivina")} className={styles.option} style={{backgroundColor: "#d798e7"}}>
            <Image className={styles.illustration} src={niña1} alt="Kid"></Image>
            <h2>Adivina La Palabra</h2>
          </div>
        </div>
    </div>
  );
}
