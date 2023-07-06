export default function makePrettyTime(time) {
	if (!(time instanceof Date)) return '';
	return time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
}
