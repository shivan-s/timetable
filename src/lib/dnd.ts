import type { DragDropState } from '@thisux/sveltednd';
import Item, { type ItemBase } from '$lib/items';
import { draggable, droppable } from '@thisux/sveltednd';

export function handleDrop(state: DragDropState<ItemBase>) {
	const { draggedItem, sourceContainer, targetContainer } = state;
	const item = new Item(draggedItem);
	if (sourceContainer === targetContainer) {
		return;
	}
	if (targetContainer) {
		item.assign(targetContainer);
	}
}

export { droppable, draggable };
