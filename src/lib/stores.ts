import { writable } from 'svelte/store';
import type Item from './items';

export const items = writable<Item[]>([]);
export const dragging = writable<Item['id'] | null>(null);
