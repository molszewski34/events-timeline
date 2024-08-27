import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { CalendarWrapper } from './contexts/Calendar/CalendarProvider';
import { AddReservationWrapper } from './contexts/AddReservation/AddReservationProvider';
import { AddRoomWrapper } from './contexts/AddRoom/AddRoomProvider';
import { SidebarWrapper } from './contexts/Sidebar/SidebarProvider';
import { PriceConfigurationWrapper } from './contexts/PriceConfiguration/PriceConfiguration';

import { ReactQueryClientProvider } from './components/ReactQueryClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Sidebar from './components/Sidebar/Sidebar';
import NavMobile from './components/Navigation/mobile/NavMobile';
import AuthButton from './components/Navigation/AuthButton/AuthButton';
import { getPriceSettings } from './components/PriceConfiguration/utils/getPriceSettings';
import { cn } from '@/app/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getPriceSettings();
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased bg-gray-100 relative',
            fontSans.variable
          )}
        >
          <PriceConfigurationWrapper>
            <CalendarWrapper>
              <SidebarWrapper>
                <NavMobile>
                  <AuthButton />
                </NavMobile>
                <Sidebar data={data} />
                <AddRoomWrapper>
                  <AddReservationWrapper>{children}</AddReservationWrapper>
                </AddRoomWrapper>
              </SidebarWrapper>
            </CalendarWrapper>
          </PriceConfigurationWrapper>
        </body>
        <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        />
      </html>
    </ReactQueryClientProvider>
  );
}
