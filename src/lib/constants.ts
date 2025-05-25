export type DAYS = typeof DAYS;
export type DAY = DAYS[number];
export const DAYS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
] as const;

export type HOURS = typeof HOURS;
export type HOUR = HOURS[number];
export const HOURS = [
	'9AM',
	'10AM',
	'11AM',
	'12PM',
	'1PM',
	'2PM',
	'3PM',
	'4PM',
	'5PM',
	'6PM',
	'7PM',
	'8PM'
] as const;

export const SEED = Math.floor(Math.random() * 360);
