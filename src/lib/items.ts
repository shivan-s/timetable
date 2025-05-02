import { DAYS, HOURS, type DAY, type HOUR } from '$lib/constants';
import { items } from '$lib/stores';
import { error } from '@sveltejs/kit';

type Time = {
	day: DAY;
	hour: HOUR;
};

export interface ItemBase {
	id: ReturnType<typeof crypto.randomUUID>;
	name: string;
	time: Time | null;
}

class Item implements ItemBase {
	id;
	name;
	time: Time | null;

	constructor(item: Partial<ItemBase> & Omit<ItemBase, 'id' | 'time'>) {
		this.id = item.id ?? crypto.randomUUID();
		this.time = item.time ?? null;
		this.name = item.name;
		this.#updateItems();
	}

	static find(itemId: string, items: ItemBase[]): Item {
		const item = items.find(({ id }) => id === itemId);
		if (item) {
			return new Item(item);
		}
		throw Error('Item not found');
	}

	/** Parse `${day}-${hour}` container name into assignment on item */
	assign(targetContainer: string): void {
		const [day, hour] = targetContainer.split('-');
		const isDay = (day: string): day is DAY => DAYS.some((d) => day === d);
		const isHour = (hour: string): hour is HOUR => HOURS.some((h) => hour === h);
		this.time = {
			day: isDay(day) ? day : error(500, 'Invalid day'),
			hour: isHour(hour) ? hour : error(500, 'Invalid hour')
		};
		this.#updateItems();
	}

	/** Removes time and day assignment  */
	unassign(): void {
		this.time = null;
		this.#updateItems();
	}

	/** Deletes the item */
	delete(): void {
		this.#removeItems();
		Object.assign(this, undefined);
	}

	/** @private Remove from items store */
	#removeItems(): void {
		items.update((i) => i.filter(({ id }) => id !== this.id));
	}

	/** @private Refresh the items store */
	#updateItems(): void {
		this.#removeItems();
		items.update((i) => [...i, this]);
	}
}
export default Item;
