import { writable } from 'svelte/store';
import type { Items } from './items';

export const items = writable<Items>([]);
