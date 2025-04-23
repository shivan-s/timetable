import type { DAY, HOUR } from '$lib/constants';
import { items } from '$lib/stores';

export type Items = Item[];
export type Item = {
	id: ReturnType<typeof crypto.randomUUID>;
	name: string;
	time?: {
		day: DAY;
		hour: HOUR;
	} | null;
};

export type CreateItem = {
	name: string;
	time?: {
		day: DAY;
		hour: HOUR;
	} | null;
};

export type UpdateItem = {
	time?: {
		day: DAY;
		hour: HOUR;
	} | null;
};

export function createItem(item: CreateItem) {
	const newItem = {
		id: crypto.randomUUID(),
		name: item.name
	};
	items.update((i) => [newItem, ...i]);
}

export function deleteItem(params: Pick<Item, 'id'> | Item['id']) {
	const itemId = typeof params === 'string' ? params : params.id;
	items.update((i) => i.filter(({ id }) => id !== itemId));
}
