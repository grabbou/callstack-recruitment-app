// TODO: change null/undefined/invalid values.
export default class Sorter {
	static get numberComparator() {
		return function numberComparator(a, b) {
			return a - b;
		};
	}

	static get stringComparator() {
		return function stringComparator(a, b) {
			return a.localeCompare(b);
		};
	}

	static get dateComparator() {
		return function dateComparator(a, b) {
			return a.getTime() - b.getTime();
		};
	}

	/**
	 * Creates an instance of Sorter.
	 * 
	 * @param {((a: any, b: any): number)[]} comparators Array of comparators, which will be available
	 * to use when invoking sort() method.
	 * 
	 * @memberOf Sorter
	 */
	constructor(comparators) {
		this.comparators = {};
		this.cache = {};

		comparators.forEach((cmp, index) => {
			if (typeof cmp !== 'function') {
				throw new Error(`Comparator at index ${index} is not a function.`);
			}
			if (typeof cmp.name !== 'string') {
				throw new Error(`Comparator at index ${index} cannot be a array function.`);
			}
			this.comparators[cmp.name] = cmp;
		});
	}

	/**
	 * Sorts ascending given array using specified comparator or return cache
	 * if invalidateCache param is false. If invalidateCache is false but data length is different
	 * from cached length, cache will automatically be invalidated and sorted data will be recached.
	 * 
	 * @param {any[]} data Array of data to be sorted (ready only). 
	 * @param {string} comparator Comparator name to sort with. Must have been registered when creating sorter
	 * instance.
	 * @param {string} [id=null] Data identifier to retrive sorted array from cache. IF not specified sorted array
	 * will not be cached.
	 * @param {boolean} [invalidateCache=false] Invalidate cache if given array of data was previously sorted and
	 * cached by given id and comparator.
	 * 
	 * @memberOf Sorter
	 */
	sort(data, comparator, id = null, invalidateCache = false) {
		const cmpFn = this.comparators[comparator] || this.comparators[`${comparator}Comparator`];
		if (!cmpFn) {
			throw new Error(`Comparator ${comparator} was not registered.`);
		}

		if (id && (invalidateCache || this.cache[`${id}-${cmpFn.name}`].length !== data.length)) {
			delete this.cache[`${id}-${cmpFn.name}`];
		} else if (id && !invalidateCache && this.cache[`${id}-${cmpFn.name}`]) {
			console.log(1);
			return this.cache[`${id}-${cmpFn.name}`];
		}

		const sortedData = [].concat(data).sort(cmpFn);

		if (id && !invalidateCache) {
			this.cache[`${id}-${cmpFn.name}`] = sortedData;
		}

		return sortedData;
	}

	/**
	 * Invalidates all cached results.
	 * 
	 * 
	 * @memberOf Sorter
	 */
	invalidateCache() {
		this.cache = {};
	}
}