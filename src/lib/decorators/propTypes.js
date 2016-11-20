export default function propTypes(types) {
	return function (target) {
		target.propTypes = types;
	};
}