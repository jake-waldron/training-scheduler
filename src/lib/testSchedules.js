import makePrettyTime from './utils/prettyTime';

const easy = {
	name: 'Easy',
	shifts: [
		{
			id: 1,
			scout: 'Louis',
			start: makePrettyTime(new Date('2023-07-22T10:00:00')),
			end: makePrettyTime(new Date('2023-07-22T14:00:00')),
		},
		{
			id: 2,
			scout: 'Vaughn',
			start: makePrettyTime(new Date('2023-07-22T10:00:00')),
			end: makePrettyTime(new Date('2023-07-22T12:00:00')),
		},
		{
			id: 3,
			scout: 'Amal',
			start: makePrettyTime(new Date('2023-07-22T14:00:00')),
			end: makePrettyTime(new Date('2023-07-22T18:00:00')),
		},
		{
			id: 4,
			scout: 'Jake',
			start: makePrettyTime(new Date('2023-07-22T14:00:00')),
			end: makePrettyTime(new Date('2023-07-22T16:00:00')),
		},
	],
};

// // Medium

const medium = {
	name: 'Medium',
	shifts: [
		{
			id: 1,
			scout: 'Louis',
			start: makePrettyTime(new Date('2023-07-22T10:00:00')),
			end: makePrettyTime(new Date('2023-07-22T14:00:00')),
		},
		{
			id: 2,
			scout: 'Vaughn',
			start: makePrettyTime(new Date('2023-07-22T10:00:00')),
			end: makePrettyTime(new Date('2023-07-22T12:00:00')),
		},
		{
			id: 2.5,
			scout: 'Working All Day',
			start: makePrettyTime(new Date('2023-07-22T10:00:00')),
			end: makePrettyTime(new Date('2023-07-22T18:00:00')),
		},
		{
			id: 3,
			scout: 'Amal',
			start: makePrettyTime(new Date('2023-07-22T14:00:00')),
			end: makePrettyTime(new Date('2023-07-22T18:00:00')),
		},
		{
			id: 4,
			scout: 'Jake',
			start: makePrettyTime(new Date('2023-07-22T14:00:00')),
			end: makePrettyTime(new Date('2023-07-22T16:00:00')),
		},
	],
};

// Hard

const hard = {
	name: 'Hard',
	shifts: [
		{
			id: 1,
			scout: 'Louis',
			start: makePrettyTime(new Date('2023-07-22T10:00:00')),
			end: makePrettyTime(new Date('2023-07-22T14:00:00')),
		},
		{
			id: 2,
			scout: 'Vaughn',
			start: makePrettyTime(new Date('2023-07-22T12:00:00')),
			end: makePrettyTime(new Date('2023-07-22T20:00:00')),
		},
		{
			id: 3,
			scout: 'Tricky',
			start: makePrettyTime(new Date('2023-07-22T11:00:00')),
			end: makePrettyTime(new Date('2023-07-22T15:00:00')),
		},
		{
			id: 4,
			scout: 'Amal',
			start: makePrettyTime(new Date('2023-07-22T14:00:00')),
			end: makePrettyTime(new Date('2023-07-22T18:00:00')),
		},
		{
			id: 5,
			scout: 'Jake',
			start: makePrettyTime(new Date('2023-07-22T14:00:00')),
			end: makePrettyTime(new Date('2023-07-22T16:00:00')),
		},
	],
};

export { easy, medium, hard };
