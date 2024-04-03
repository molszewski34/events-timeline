import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { CalendarWrapper } from './contexts/Calendar/CalendarProvider';
import { AddReservationWrapper } from './contexts/AddReservation/AddReservationProvider';
import { cn } from '@/app/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <CalendarWrapper>
          <AddReservationWrapper>{children}</AddReservationWrapper>
        </CalendarWrapper>
      </body>
    </html>
  );
}
