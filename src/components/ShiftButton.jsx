/* eslint-disable react/prop-types */

export default function ShiftButton({ children, ...delegated }) {
	return (
		<button className='px-10 py-2 bg-slate-100 rounded-2xl my-12' {...delegated}>
			{children}
		</button>
	);
}
