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
											setShifts(newShifts);
										}}
									/>
									<input
										className='border border-slate-300 rounded-md p-1'
										type='time'
										value={shift.start}
										onChange={(e) => {
											const oldShifts = [...shifts];
											const newShifts = oldShifts.map((oldShift) => {
												if (oldShift.id === shift.id) {
													return { ...oldShift, start: e.target.value };
												}
												return oldShift;
											});
											setShifts(newShifts);
										}}
									/>
									<input
										className='border border-slate-300 rounded-md p-1'
										type='time'
										value={shift.end}
										onChange={(e) => {
											const oldShifts = [...shifts];
											const newShifts = oldShifts.map((oldShift) => {
												if (oldShift.id === shift.id) {
													return { ...oldShift, end: e.target.value };
												}
												return oldShift;
											});
											originalShifts = [...newShifts];
											setShifts(newShifts);
										}}
									/>
								</Fragment>
							))}
						</div>
					)}
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
