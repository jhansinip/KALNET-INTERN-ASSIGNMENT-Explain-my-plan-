import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Explain My Plan | AI Clarity Tool',
  description: 'Convert your vague ideas into structured, actionable plans with AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container animate-fade-in">
          {children}
        </div>
      </body>
    </html>
  );
}
