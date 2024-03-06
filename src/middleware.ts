import { NextResponse } from 'next/server';
import fetch from 'cross-fetch';

export const middleware = async () => {
  // Check auth header for server

  const site = await fetch('http://sublinks:8080/api/v3/site');
  console.log(await site.json());

  return NextResponse.next();
};
