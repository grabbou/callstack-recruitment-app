import React, { Component } from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';
import propTypes from '../../lib/decorators/propTypes';
import './Pagination.sass';

@propTypes({
	items: React.PropTypes.number.isRequired,
	rows: React.PropTypes.number.isRequired,
	activePage: React.PropTypes.number.isRequired,
	onSelect: React.PropTypes.func.isRequired
})
export default class Pagination extends Component {
	get _itemsLength() {
		return Math.ceil(this.props.items / this.props.rows);
	}

	render() {
		return (
			<section className="Pagination">
				<BSPagination
					bsSize="small"
					items={this._itemsLength}
					activePage={this.props.activePage}
					onSelect={this.props.onSelect}
				/>
			</section>
		);
	}
}
