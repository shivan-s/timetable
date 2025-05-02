import type { DragDropState } from '@thisux/sveltednd';
import Item, { type ItemBase } from '$lib/items';
import { draggable, droppable } from '@thisux/sveltednd';

export const UNASSIGNED_ITEMS_CONTAINER = 'unassigned';

export function handleDrop(state: DragDropState<ItemBase>) {
	const { draggedItem, sourceContainer, targetContainer } = state;
	const item = new Item(draggedItem);
	if (sourceContainer === targetContainer) {
		return;
	}
	if (!targetContainer || targetContainer === UNASSIGNED_ITEMS_CONTAINER) {
		item.unassign();
	} else {
		item.assign(targetContainer);
	}
}

export { droppable, draggable };
