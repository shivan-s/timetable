import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handlePreload: Handle = ({ event, resolve }) => {
	const response = resolve(event, {
		preload: ({ type }) => {
			return type === 'font' || type === 'css' || type === 'js';
		}
	});
	return response;
};

export const handle: Handle = sequence(handleParaglide, handlePreload);
