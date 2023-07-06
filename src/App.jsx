import { useState } from 'react';
import getTrainingShifts from './lib/trainings';
import { easy, hard, medium } from './lib/testSchedules';
import ShiftButton from './components/ShiftButton';
import { Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

const preScheduledShifts = [easy, medium, hard];

function generateEmptyShift() {
	return {
		id: `${Math.random()}`,
		scout: '',
		start: '',
		end: '',
	};
}
const shiftStart = [generateEmptyShift(), generateEmptyShift()];
let originalShifts = [];

function App() {
	const [shifts, setShifts] = useState(shiftStart);
	const [trainingShifts, setTrainingShifts] = useState([]);

	function handleSubmit(e) {
		e.preventDefault();
		const shiftForTrainings = getTrainingShifts(shifts).map((shift) => {
			return {
				...shift,
				color: 'red',
			};
		});
		setTrainingShifts(shiftForTrainings);
		const updatedShifts = originalShifts.map((shift) => {
			if (shiftForTrainings.find((trainingShift) => trainingShift.scout === shift.scout)) {
				return {
					...shift,
					color: 'red',
				};
			}
			return shift;
		});
		setShifts(updatedShifts);
	}

	function handleAddShift() {
		const newShift = generateEmptyShift();
		originalShifts = [...originalShifts, newShift];
		setShifts([...shifts, newShift]);
	}

	return (
		<main className='min-h-screen flex flex-col items-center p-20'>
			<div className='flex h-auto w-full  justify-center'>
				<div className='flex flex-col w-full items-center h-full'>
					<div className='flex gap-10'>
						{preScheduledShifts.map((shift, idx) => (
							<ShiftButton
								key={idx}
								onClick={() => {
									originalShifts = [...shift.shifts];
									setShifts(shift.shifts);
									setTrainingShifts([]);
								}}>
								{shift.name}
							</ShiftButton>
						))}
						<ShiftButton
							onClick={() => {
								originalShifts = [...shiftStart];
								setShifts(shiftStart);
							}}>
							Custom
						</ShiftButton>
					</div>
					{shifts.length > 0 && (
						<div className='grid grid-cols-3 justify-items-center mt-12 gap-y-4'>
							<p>Scout</p>
							<p>Start</p>
							<p>End</p>
							{shifts.map((shift) => (
								<Fragment key={shift.id}>
									<input
										className='border border-slate-300 rounded-md p-2 pl-4'
										type='text'
										value={shift.scout}
										onChange={(e) => {
											const oldShifts = [...shifts];
											const newShifts = oldShifts
												.map((oldShift) => {
													if (oldShift.id === shift.id) {
														return { ...oldShift, scout: e.target.value };
													}
													return oldShift;
												})
												.map((shift) => {
													return {
														...shift,
														color: 'blue',
													};
												});
											originalShifts = [...newShifts];
											setShifts(newShifts);
										}}
									/>
									<input
										className='border border-slate-300 rounded-md p-1'
										type='time'
										value={shift.start}
										onChange={(e) => {
											const oldShifts = [...shifts];
											const newShifts = oldShifts
												.map((oldShift) => {
													if (oldShift.id === shift.id) {
														return { ...oldShift, start: e.target.value };
													}
													return oldShift;
												})
												.map((shift) => {
													return {
														...shift,
														color: 'blue',
													};
												});
											originalShifts = [...newShifts];
											setShifts(newShifts);
										}}
									/>
									<input
										className='border border-slate-300 rounded-md p-1'
										type='time'
										value={shift.end}
										onChange={(e) => {
											const oldShifts = [...shifts];
											const newShifts = oldShifts
												.map((oldShift) => {
													if (oldShift.id === shift.id) {
														return { ...oldShift, end: e.target.value };
													}
													return oldShift;
												})
												.map((shift) => {
													return {
														...shift,
														color: 'blue',
													};
												});
											originalShifts = [...newShifts];
											setShifts(newShifts);
										}}
									/>
								</Fragment>
							))}
						</div>
					)}
					<button className='mt-6 p-2 bg-slate-100 rounded-full' onClick={handleAddShift}>
						<svg
							className='svg-snoweb svg-theme-light'
							height='30'
							preserveAspectRatio='xMidYMid meet'
							viewBox='0 0 100 100'
							width='30'
							x='0'
							xmlns='http://www.w3.org/2000/svg'
							y='0'>
							<path
								className='svg-fill-primary'
								d='M50,18a6.4,6.4,0,0,1,6.4,6.4V43.6H75.6a6.4,6.4,0,1,1,0,12.8H56.4V75.6a6.4,6.4,0,0,1-12.8,0V56.4H24.4a6.4,6.4,0,0,1,0-12.8H43.6V24.4A6.4,6.4,0,0,1,50,18Z'
								fillRule='evenodd'></path>
						</svg>
					</button>
					<div className='flex flex-col items-center'>
						<ShiftButton onClick={handleSubmit}>Process Schedule</ShiftButton>
						{trainingShifts.length > 0 && (
							<p className='text-2xl'>
								Schedule trainings for : {trainingShifts.map((shift) => shift.scout).join(', ')}
							</p>
						)}
					</div>
				</div>
				<div className='w-1/3 mr-40 '>
					<FullCalendar
						height={800}
						plugins={[timeGridPlugin]}
						initialView='timeGridDay'
						initialDate={new Date('2023-07-23')}
						headerToolbar={{ start: '', center: 'title', end: '' }}
						slotMinTime={'09:00:00'}
						events={shifts.map((shift) => {
							return {
								title: shift.scout,
								start: new Date(`2023-07-22T${shift.start}`),
								end: new Date(`2023-07-22T${shift.end}`),
								color: shift.color,
							};
						})}
					/>
				</div>
			</div>
		</main>
	);
}

export default App;
