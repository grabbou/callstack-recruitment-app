import React, { Component } from 'react';
import propTypes from '../../lib/decorators/propTypes';

@propTypes({
	sort: React.PropTypes.number.isRequired,
	desc: React.PropTypes.bool.isRequired,
	columns: React.PropTypes.array.isRequired,
	onChange: React.PropTypes.func.isRequired
})
export default class PostsTableHeader extends Component {
	_onClickHandler(index) {
		this.props.onChange(index);
	}

	_renderColumn(name, index) {
		const iconClass = index === this.props.sort
			? `glyphicon glyphicon-triangle-${this.props.desc ? 'bottom' : 'top'}`
			: 'hide_it';

		return (
			<th
				key={index}
				className={index === this.props.sort ? 'boldify_it' : ''}
				onClick={this._onClickHandler.bind(this, index)}
			>
				{name}
				<span
					className={iconClass}
					aria-hidden="true"
				></span>
			</th>
		);
	}

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((col, index) => this._renderColumn(col, index))}
				</tr>
			</thead>
		);
	}
}