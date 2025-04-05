'use client';
import { useState, useEffect } from "react";
import styles from "./memorama.module.css";
import { useRouter } from "next/navigation";

type CardType = {
  id: number;
  image: string;
  key: number;
  flipped: boolean;
  matched: boolean;
};

const initialCards = [
  { id: 1, image: '🍎' },
  { id: 2, image: '🐶' },
  { id: 3, image: '🌞' },
  { id: 4, image: '🚗' },
  { id: 5, image: '🎈' },
  { id: 6, image: '🍕' },
];

function shuffle(array: typeof initialCards): CardType[] {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({
      ...card,
      key: index,
      flipped: false,
      matched: false
    }));
}

export default function Home() {
  const [cards, setCards] = useState<CardType[]>(shuffle(initialCards));
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const router = useRouter();

  const handleClick = (card: CardType) => {
    if (isChecking || card.flipped || card.matched || hasWon) return;

    const updatedCards = cards.map((c) =>
      c.key === card.key ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
      setIsChecking(true);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      const isMatch = firstCard.image === secondCard.image;

      setTimeout(() => {
        const updatedCards = cards.map((c) => {
          if (c.key === firstCard.key || c.key === secondCard.key) {
            return isMatch
              ? { ...c, matched: true }
              : { ...c, flipped: false };
          }
          return c;
        });

        setCards(updatedCards);
        setFirstCard(null);
        setSecondCard(null);
        setIsChecking(false);
      }, 1000);
    }
  }, [secondCard]);

  // Detectar si se ganó
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setHasWon(true);
    }
  }, [cards]);

  const resetGame = () => {
    // Opcional: voltear todas las cartas antes de reiniciar
    setCards(prevCards => prevCards.map(card => ({ ...card, flipped: false, matched: false })));
  
    // Esperar un poco para que se vean volteadas antes de barajar
    setTimeout(() => {
      setCards(shuffle(initialCards));
      setFirstCard(null);
      setSecondCard(null);
      setIsChecking(false);
      setHasWon(false);
    }, 500); // medio segundo
  };

  const home = ()=>{
    router.push("/")
  }
  

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Juego De Memoria</h1>

        {hasWon && (
          <div className={styles.winModal}>
            <div className={styles.winMessage}>
              <p>🎉 ¡Felicidades, ganaste! 🎉</p>
              <div className={styles.buttonSection}>
                <button onClick={resetGame}>Reiniciar</button>
                <button onClick={home}>Volver Al Inicio</button>
              </div>
            </div>

          </div>
        )}

        <div className={styles.memorama}>
          {cards.map((card) => (
            <div
              key={card.key}
              className={`${styles.item} ${card.flipped || card.matched ? styles.flipped : ""
                }`}
              onClick={() => handleClick(card)}
            >
              <div className={styles.inner}>
                <div className={styles.back}>{card.image}</div>
                <div className={styles.front}>❓</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttonSection}>
          <button className={styles.restart} onClick={resetGame}>Reiniciar</button>
          <button className={styles.Back} onClick={home}>Volver Al Inicio</button>
        </div>
      </div>
    </div>
  );
}
