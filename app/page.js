'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';
import Header from './components/Header';
import RegisterModal from './components/RegisterModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.page}>
      martin
    </div>
  );
}

{/* <footer className={styles.footer}>
  <a
    href="https://github.com/martincorredor"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
    Mi github
  </a>
  <a
    href="https://www.linkedin.com/in/martin-corredor/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      aria-hidden
      src="/window.svg"
      alt="Window icon"
      width={16}
      height={16}
    />
    Mi linkedin
  </a>
  <a
    href="https://martincorredor.github.io/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      aria-hidden
      src="/globe.svg"
      alt="Globe icon"
      width={16}
      height={16}
    />
    Mi portafolio →
  </a>
</footer>; */}
