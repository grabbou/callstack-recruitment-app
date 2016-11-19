import React, { Component } from 'react';

export default class PostsTableHeader extends Component {
	setSort(index) {
		this.props.onChange(index);
	}

	renderColumn(name, index) {
		const iconClass = index === this.props.sort
			? `glyphicon glyphicon-triangle-${this.props.desc ? 'bottom' : 'top'}`
			: 'hide_it';

		return (
			<th
				key={index}
				className={index === this.props.sort ? 'boldify_it' : ''}
				onClick={this.setSort.bind(this, index)}
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
					{this.props.columns.map((col, index) => this.renderColumn(col, index))}
				</tr>
			</thead>
		);
	}
}