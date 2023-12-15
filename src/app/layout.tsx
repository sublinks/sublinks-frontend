import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import cx from 'classnames';

import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';

import { ThemeProvider } from '@/components/TailwindMaterial';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sublinks',
  description: 'Sublinks'
};

const CurvedCorner = ({ left, right }: { left?: boolean; right?: boolean; }) => (
  <>
    <div className={cx('max-md:hidden bg-primary dark:bg-primary-dark w-40 h-40 absolute -top-24 -z-10', {
      '-right-24': right,
      '-left-24': left
    })}
    />
    <div className={cx('max-md:hidden bg-secondary dark:bg-secondary-dark w-40 h-40 absolute top-0 rounded-full -z-10', {
      '-right-40': right,
      '-left-40': left
    })}
    />
  </>
);

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const theme = {
    menu: {
      defaultProps: {
        dismiss: {
          itemPress: false
        }
      }
    }
  };

  return (
    <ThemeProvider value={theme}>
      <html lang="en" className="h-full">
        <body className={cx(inter.className, 'flex flex-col h-full bg-secondary dark:bg-secondary-dark max-md:pb-48')}>
          <Header />
          <BottomNav />
          <main className="relative flex-grow bg-primary dark:bg-primary-dark w-full l:max-w-[1352px] xl:max-w-[1524px] m-auto md:pt-24">
            <CurvedCorner left />
            <CurvedCorner right />
            {children}
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
};

export default RootLayout;
