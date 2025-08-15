'use client';

import React from 'react';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function SiteLoader() {
  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center gap-4'>
      <motion.figure
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [0.95, 1, 0.95]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        <Image
          src='/site-logo.svg'
          width={0}
          height={0}
          alt='Site Logo'
          className='h-fit w-full max-w-64 sm:max-w-md lg:max-w-xl'
        />
      </motion.figure>
    </main>
  );
}
