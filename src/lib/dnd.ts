import type { DragDropState } from '@thisux/sveltednd';
import type { Item } from '$lib/items';
import { DAYS, HOURS, type DAY, type HOUR } from '$lib/constants';
import { error } from '@sveltejs/kit';
import { items } from '$lib/stores';
import { draggable, droppable } from '@thisux/sveltednd';

export const UNASSIGNED_ITEMS_CONTAINER = 'unassigned';

export function handleDrop(state: DragDropState<Item>) {
	const { draggedItem, sourceContainer, targetContainer } = state;
	if (sourceContainer === targetContainer) {
		return;
	}
	if (!targetContainer || targetContainer === UNASSIGNED_ITEMS_CONTAINER) {
		draggedItem.time = null;
		return;
	} else {
		const [day, hour] = targetContainer.split('-');
		const isDay = (day: string): day is DAY => DAYS.some((d) => day === d);
		const isHour = (hour: string): hour is HOUR => HOURS.some((h) => hour === h);
		draggedItem.time = {
			day: isDay(day) ? day : error(500, 'Invalid day'),
			hour: isHour(hour) ? hour : error(500, 'Invalid hour')
		};
	}
	items.update((i) => i.filter(({ id }) => id !== draggedItem.id));
	items.update((i) => [...i, draggedItem]);
}

export { droppable, draggable };
