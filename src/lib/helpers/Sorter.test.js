import Sorter from './Sorter';

// Typings
import 'jest';

//TODO: test auto invalidating cache.

describe('Sorter module', () => {
	it('should sort array based on numberComparator and save results to cache', () => {
		const sorter = new Sorter([Sorter.numberComparator]);
		const results = sorter.sort([3, 2, 5, 1, 4], 'number', 'id1');
		expect(results).toEqual([1, 2, 3, 4, 5]);
		expect(sorter.cache['id1-numberComparator']).toEqual(results);
	});

	it('should sort array based on stringComparator and save results to cache', () => {
		const sorter = new Sorter([Sorter.stringComparator]);
		const results = sorter.sort(['a', 'ba', 'acs'], 'string', 'id1');
		expect(results).toEqual(['a', 'acs', 'ba']);
		expect(sorter.cache['id1-stringComparator']).toEqual(results);
	});

	it('should sort array based on dateComparator and save results to cache', () => {
		const sorter = new Sorter([Sorter.dateComparator]);
		const results = sorter.sort([new Date('2016-11-20'), new Date('2016-11-19')], 'date', 'id1');
		expect(results).toEqual([new Date('2016-11-19'), new Date('2016-11-20')]);
		expect(sorter.cache['id1-dateComparator']).toEqual(results);
	});
});