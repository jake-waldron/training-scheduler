import { useState } from 'react';
import getTrainingShifts from './lib/trainings';
import { easy, hard, medium } from './lib/testSchedules';
import makePrettyTime from './lib/utils/prettyTime';
import ShiftButton from './components/ShiftButton';
import { Fragment } from 'react';

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

function App() {
	const [count, setCount] = useState(0);
	const [shifts, setShifts] = useState(shiftStart);
	const [trainingShifts, setTrainingShifts] = useState([]);

	function handleSubmit(e) {
		e.preventDefault();
		console.log('submitted');
		setTrainingShifts(getTrainingShifts(shifts));
	}

	return (
		<main className='min-h-screen flex flex-col items-center p-20'>
			<div className='flex gap-10'>
				{preScheduledShifts.map((shift, idx) => (
					<ShiftButton
						key={idx}
						onClick={() => {
							setShifts(shift.shifts);
							setTrainingShifts([]);
						}}>
						{shift.name}
					</ShiftButton>
				))}
				<ShiftButton onClick={() => setShifts(shiftStart)}>Custom</ShiftButton>
			</div>

			{shifts.length > 0 && (
				// <table className='table-auto border-separate w-1/2'>
				// 	<thead>
				// 		<tr>
				// 			<th>Scout</th>
				// 			<th>Start</th>
				// 			<th>End</th>
				// 		</tr>
				// 	</thead>
				// 	<tbody>
				// 		{shifts.map((shift) => (
				// 			<tr className='h-4 bg-slate-300 py-4' key={shift.id}>
				// 				<td>{shift.scout}</td>
				// 				<td>{makePrettyTime(shift.start)}</td>
				// 				<td>{makePrettyTime(shift.end)}</td>
				// 			</tr>
				// 		))}
				// 	</tbody>
				// </table>
				<div className='grid grid-cols-3 w-1/2 justify-items-center'>
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
									const newShifts = oldShifts.map((oldShift) => {
										if (oldShift.id === shift.id) {
											return { ...oldShift, scout: e.target.value };
										}
										return oldShift;
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
									setShifts(newShifts);
								}}
							/>
						</Fragment>
					))}
				</div>
			)}
			<ShiftButton onClick={handleSubmit}>Process Schedule</ShiftButton>
			{trainingShifts.length > 0 && (
				<p>Schedule trainings for : {trainingShifts.map((shift) => shift.scout).join(', ')}</p>
			)}
		</main>
	);
}

export default App;
