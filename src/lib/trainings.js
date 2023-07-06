function getOverlappingShifts(shift, allShifts) {
	const otherShifts = allShifts.filter((s) => s.id !== shift.id);
	const overlaps = otherShifts.filter((s) => {
		return shift.start < s.end && shift.end > s.start;
	});
	return overlaps;
}

function getAverageNumberOfOverlaps(array) {
	const numberOfOverlaps = array.map((shift) => shift.overlaps.length);
	const mean = numberOfOverlaps.reduce((acc, val) => acc + val, 0) / numberOfOverlaps.length;
	return mean;
}

function prettyPrint(shifts) {
	const prettyPrint = shifts.map((shift) => {
		return {
			...shift,
			overlaps: shift.overlaps.map((s) => {
				return `Shift ${s.id} (${s.scout})`;
			}),
		};
	});

	// console.table(prettyPrint);
}

////////////////////////////////////////////////////////////////////////////////////////////////
export default function getTrainingShifts(shifts) {
	// Add the overlapping shifts to each shift
	const shiftsWithOverlaps = shifts
		.map((shift) => {
			return {
				...shift,
				overlaps: getOverlappingShifts(shift, shifts),
			};
		})
		.filter((shift) => shift.overlaps.length > 0);

	// ----------------- //
	// this just makes something that prints nicely
	// prettyPrint(shiftsWithOverlaps);
	// ----------------- //

	// find the mean number of overlaps
	const averageNumberOfOverlaps = getAverageNumberOfOverlaps(shiftsWithOverlaps);

	function removeCommonOverlaps(shifts) {
		const arr = shifts.filter((shift) => shift.overlaps.length <= averageNumberOfOverlaps);
		const removedShifts = shifts.filter((shift) => shift.overlaps.length > averageNumberOfOverlaps);
		const filteredShifts = arr.map((shift) => {
			return {
				...shift,
				overlaps: getOverlappingShifts(shift, arr),
			};
		});
		return [filteredShifts, removedShifts];
	}

	// remove any shifts with more than the mean number of overlaps
	const [remainingShifts, removedShifts] = removeCommonOverlaps(shiftsWithOverlaps);

	// const mostCommonOverlaps = shiftsWithOverlaps.filter((shift) => shift.overlaps.length >= averageOverlaps);

	// prettyPrint(remainingShifts);

	// create set of unique overlaps
	const shiftOverlaps = []; // array of arrays

	const commonBetweenRemovedShifts = []; // individual shifts

	removedShifts.forEach((shift) => {
		shift.overlaps.forEach((overlap) => {
			// if the overlap is not in the common overlaps array and not in the removed shifts array
			if (
				!commonBetweenRemovedShifts.map((s) => s.id).includes(overlap.id) &&
				!removedShifts.map((s) => s.id).includes(overlap.id)
			)
				// add it to the common overlaps array
				commonBetweenRemovedShifts.push(overlap);
		});
	});

	// add the common overlaps to the shift overlaps array
	shiftOverlaps.push(...commonBetweenRemovedShifts.map((shift) => [shift]));

	// console.dir(shiftOverlaps, { depth: null });

	// remove the common overlaps from the remaining shifts
	const updatedAvailableShifts = remainingShifts.filter(
		(s) => !commonBetweenRemovedShifts.map((s) => s.id).includes(s.id)
	);

	// prettyPrint(updatedAvailableShifts);

	// if anything is left, check to see if it should be added to the shift overlaps array
	updatedAvailableShifts.forEach((shift) => {
		// if (shift.overlaps.length < 1) {
		// 	shiftOverlaps.push([shift]);
		// } else {
		// remove most common overlaps from shift overlaps
		// TODO: if shifts have a common overlap, they can both be added

		const availableOverlaps = getOverlappingShifts(shift, updatedAvailableShifts);
		availableOverlaps.forEach((overlap) => {
			// shift 2
			// check shift overlaps array to see if it already contains the overlap
			if (!shiftOverlaps.find((o) => o.includes(shift.id) && o.includes(overlap.id))) {
				shiftOverlaps.push([shift.id, overlap.id]);
			}
		});
		// }
	});
	// console.log({ shiftOverlaps });

	// pick a random shift from each overlap to assign trainings to
	const luckyWinners = shiftOverlaps.map((overlap) => {
		if (overlap.length === 1) return overlap[0];
		const randomShift = overlap[Math.floor(Math.random() * overlap.length)];
		return updatedAvailableShifts.find((shift) => shift.id === randomShift);
	});

	// console.log('Assign trainings to:', luckyWinners);

	return luckyWinners;
}
