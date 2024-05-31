import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import cx from 'classnames';
import { GetSiteResponse } from 'sublinks-js-client';

import SublinksApi from '@/utils/api-client/server';
import logger from '@/utils/logger';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';

import { ThemeProvider } from '@/components/TailwindMaterial';
import UserProvider from '@/context/user';

import * as testData from '../../test-instance-data.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sublinks',
  description: 'Sublinks'
};

// @todo: Allow test data when in non-docker dev env
// as Sublinks Core doesn't yet handle all post features
const getSite = async () => {
  try {
    const site = process.env.NEXT_PUBLIC_SUBLINKS_API_BASE_URL
      ? await SublinksApi.Instance().Client().getSite()
      : JSON.parse(JSON.stringify(testData)) as unknown as GetSiteResponse;

    return site;
  } catch (e) {
    logger.error('Failed to retrieve site for layout', e);
    return undefined;
  }
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

const RootLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const site = await getSite();
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
    <UserProvider>
      <ThemeProvider value={theme}>
        <html lang="en" className="h-full dark">
          <body className={cx(inter.className, 'flex flex-col min-h-full bg-secondary dark:bg-secondary-dark')}>
            <Header site={site} />
            <BottomNav site={site} />

            <main className="relative flex-grow bg-primary dark:bg-primary-dark w-full l:max-w-[1352px] xl:max-w-[1524px] m-auto">
              <CurvedCorner left />
              <CurvedCorner right />
              {children}
            </main>
          </body>
        </html>
      </ThemeProvider>
    </UserProvider>
  );
};

export default RootLayout;
