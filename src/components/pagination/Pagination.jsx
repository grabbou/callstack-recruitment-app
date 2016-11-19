import React, { Component } from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

export default class Pagination extends Component {
	get itemsLength() {
		return Math.ceil(this.props.items / this.props.rows);
	}

	render() {
		return (
			<BSPagination
				bsSize="small"
				items={this.itemsLength}
				activePage={this.props.activePage}
				onSelect={this.props.onSelect}
			/>
		);
	}
}