'use client';
import { useState, useEffect } from 'react';
import styles from './Adivina.module.css';
import { useRouter } from 'next/navigation';

const palabras = [
    'SOL', 'LUNA', 'CIELO', 'FLOR', 'NIÑO',
    'PERRO', 'GATO', 'NUBE', 'AGUA', 'FUEGO',
    'TREN', 'CASA', 'BOLA', 'AZUL', 'ROJO',
    'VERDE', 'DADO', 'LEÓN', 'RANA', 'PEZ',
    'MANO', 'PIE', 'NENE', 'RISA', 'OSO'
];

const palabraAleatoria = () => palabras[Math.floor(Math.random() * palabras.length)];

export default function AdivinaPage() {
    const [palabra, setPalabra] = useState(palabraAleatoria);
    const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
    const [letrasIncorrectas, setLetrasIncorrectas] = useState<string[]>([]);
    const [intentosRestantes, setIntentosRestantes] = useState(6);
    const [letraActual, setLetraActual] = useState('');
    const [hasWon, setHasWon] = useState(false);
    const [hasLost, setHasLost] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLetraActual(e.target.value.toUpperCase());
    };

    const verificarLetra = () => {
        const letra = letraActual.trim().toUpperCase();
        if (!letra.match(/^[A-ZÑ]$/)) return;

        if (palabra.includes(letra)) {
            if (!letrasAdivinadas.includes(letra)) {
                setLetrasAdivinadas([...letrasAdivinadas, letra]);
            }
        } else {
            if (!letrasIncorrectas.includes(letra)) {
                setLetrasIncorrectas([...letrasIncorrectas, letra]);
                setIntentosRestantes(prev => prev - 1);
            }
        }
        setLetraActual('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        verificarLetra();
    };

    useEffect(() => {
        const letrasUnicas = Array.from(new Set(palabra.split('')));
        if (letrasUnicas.every(letra => letrasAdivinadas.includes(letra))) {
            setHasWon(true);
        } else if (intentosRestantes <= 0) {
            setHasLost(true);
        }
    }, [letrasAdivinadas, intentosRestantes, palabra]);

    const resetGame = () => {
        setLetrasAdivinadas([]);
        setLetrasIncorrectas([]);
        setIntentosRestantes(6);
        setLetraActual('');
        setPalabra(palabraAleatoria());
        setHasWon(false);
        setHasLost(false);
    };

    const volverAlInicio = () => {
        router.push('/');
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Adivina La Palabra</h1>
                <div className={styles.adivina}>
                    {palabra.split('').map((letra, i) => (
                        <span key={i} className={styles.letra}>
                            {letrasAdivinadas.includes(letra) ? letra : '_'}
                        </span>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className={styles.form} autoComplete="off" translate="no">
                    <input
                        type="text"
                        maxLength={1}
                        value={letraActual}
                        onChange={handleInputChange}
                        className={styles.inputLetra}
                        placeholder='Letra'
                        autoFocus
                        autoComplete="off"
                        translate="no"
                    />
                    <button type="submit" className={styles.verificar}>Verificar</button>
                </form>

                <p>Intentos restantes: {intentosRestantes}</p>

                <div className={styles.incorrectas}>
                    Letras incorrectas: {letrasIncorrectas.join(', ')}
                </div>

                <div className={styles.buttonSection}>
                    <button onClick={resetGame}>Reiniciar</button>
                    <button onClick={volverAlInicio}>Volver al Inicio</button>
                </div>
            </div>
            {hasWon && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>🎉 ¡Ganaste! 🎉</p>
                        <div className={styles.buttonSection}>
                            <button onClick={resetGame}>Reiniciar</button>
                            <button onClick={volverAlInicio}>Volver al Inicio</button>
                        </div>
                    </div>
                </div>
            )}
            {hasLost && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>😢 ¡Perdiste! La palabra era: <strong>{palabra}</strong></p>
                        <div className={styles.buttonSection}>
                            <button onClick={resetGame}>Reintentar</button>
                            <button onClick={volverAlInicio}>Volver al Inicio</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
