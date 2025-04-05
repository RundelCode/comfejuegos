'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./ordenar.module.css";

const palabras = [
  "SOL", "LUNA", "FLOR", "NUBE", "NIÑO", "AVIÓN", "RISA", "CAMPO", "RAYO", "MAR",
  "PEZ", "BESO", "CIELO", "JUEGO", "ZORRO", "TREN", "NARIZ", "MANO", "CASA", "BOLA",
  "GATO", "PERRO", "ARBOL", "FUEGO", "FRUTA", "SALTO", "HOJAS", "NIEVE", "SILLA", "MESA",
  "MONO", "PATO", "AVISPA", "ROCA", "VIENTO", "RUIDO", "SUEÑO", "CEBRA", "TIGRE", "LEÓN"
];

function desordenar(palabra: string): string[] {
  let desordenada = palabra;
  while (desordenada === palabra) {
    desordenada = palabra.split('').sort(() => Math.random() - 0.5).join('');
  }
  return desordenada.split('');
}

export default function OrdenaLaPalabra() {
  const [palabra, setPalabra] = useState('');
  const [letras, setLetras] = useState<string[]>([]);
  const [respuesta, setRespuesta] = useState<string[]>([]);
  const [correcto, setCorrecto] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    iniciarNuevaPalabra();
  }, []);

  const iniciarNuevaPalabra = () => {
    let nueva = palabra;
    while (nueva === palabra) {
      nueva = palabras[Math.floor(Math.random() * palabras.length)];
    }
    setPalabra(nueva);
    setLetras(desordenar(nueva));
    setRespuesta([]);
    setCorrecto(false);
    setError(false);
  };

  const seleccionarLetra = (letra: string, index: number) => {
    const nuevaRespuesta = [...respuesta, letra];
    const nuevasLetras = [...letras];
    nuevasLetras.splice(index, 1);
    setRespuesta(nuevaRespuesta);
    setLetras(nuevasLetras);

    if (nuevaRespuesta.length === palabra.length) {
      if (nuevaRespuesta.join('') === palabra) {
        setCorrecto(true);
      } else {
        setError(true);
        setTimeout(() => {
          setRespuesta([]);
          setLetras(desordenar(palabra));
          setError(false);
        }, 1500);
      }
    }
  };

  const deseleccionarLetra = (index: number) => {
    const nuevaLetras = [...letras];
    const nuevaRespuesta = [...respuesta];
    const letraDeseleccionada = nuevaRespuesta.splice(index, 1)[0];
    nuevaLetras.push(letraDeseleccionada);
    setRespuesta(nuevaRespuesta);
    setLetras(nuevaLetras);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Ordena la Palabra</h1>
        <div className={styles.zona}>
          <div className={styles.letras}>
            {letras.map((letra, i) => (
              <button key={i} className={styles.letra} onClick={() => seleccionarLetra(letra, i)}>
                {letra}
              </button>
            ))}
          </div>

          <div className={styles.respuesta}>
            {respuesta.map((letra, i) => (
              <div
                key={i}
                className={styles.letraSeleccionada}
                onClick={() => deseleccionarLetra(i)}
              >
                {letra}
              </div>
            ))}
          </div>
        </div>

        {correcto && (
          <div className={styles.modal}>
            <p>🎉 ¡Muy bien! 🎉</p>
            <button onClick={iniciarNuevaPalabra}>Otra palabra</button>
          </div>
        )}

        {error && (
          <div className={styles.modalError}>
            <p>❌ Intenta otra vez</p>
          </div>
        )}

        <div className={styles.buttons}>
          <button onClick={iniciarNuevaPalabra}>Cambiar Palabra</button>
          <button onClick={() => router.push('/')}>Volver al Inicio</button>
        </div>
      </div>
    </div>
  );
}
