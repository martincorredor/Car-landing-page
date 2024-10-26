'use client';
import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinksContainer}>
        <Typography>CONOCE UN POCO MÁS DE MÍ</Typography>
        <div className={styles.footerLinks}>
          <a
            href="https://drive.google.com/file/d/1MC-Ke8oOPN89Ts2VUMWpfnKTSsI2eBuL/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Mi CV
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
            href="https://github.com/martincorredor"
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
            Mi Github →
          </a>
        </div>
      </div>
      <div className={styles.footerInfoContainer}>
        <Typography>CONTÁCTAME</Typography>
        <div className={styles.footerInfo}>
          <Typography>Email: dev.martincorredor@gmail.com</Typography>
          <Typography>Whatsapp: (+57)3224682353</Typography>
        </div>
      </div>
    </footer>
  );
}
