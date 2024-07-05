import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import '@/styles/globals.css'
import { ReactNode } from 'react'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sudoku',
  description:
    'Site feito para testar complexidade de algoritmo do Jogo Sudoku',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  )
}
