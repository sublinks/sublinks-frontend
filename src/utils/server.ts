'use server';

import { revalidatePath } from 'next/cache';

export const revalidateAll = () => revalidatePath('/', 'layout');
