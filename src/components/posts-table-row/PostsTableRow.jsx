import React, { Component } from 'react';
import propTypes from '../../lib/decorators/propTypes';

@propTypes({
	item: React.PropTypes.object.isRequired,
	highlight: React.PropTypes.bool
})
export default class PostsTableRow extends Component {
	get _body() {
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
			<tr style={this.props.highlight ? { backgroundColor: '#69e05e' } : {}}>
				{this._body}
			</tr>
		);
	}
}