import React, { Component } from 'react';

export default class PostsTableRow extends Component {
	
	get body() {
		return Object.values(this.props.item)
		.map((value, index) => {
			if (typeof value.getMonth === 'function') {
				value = value.toISOString().substr(0, 10);
			}
			return <td key={index}>{value}</td>;
		});
	}

	render() {
		return (
			<tr>
				{this.body}
			</tr>
		);
	}
}