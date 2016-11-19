import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PostTableHeader from '../posts-table-header/PostTableHeader';
import PostTableRow from '../posts-table-row/PostsTableRow';

export default class PostsTable extends Component {
	constructor(props) {
		super(props);
		// rows posts activePage activeUser
		this.state = {
			sort: 0,
			desc: true
		};
		this.columns = [
			'ID',
			'User name',
			'Post title',
			'Views',
			'Likes',
			'Created at'
		];
	}

	setSort(index) {
		if (this.state.sort === index) {
			this.setState({
				desc: !this.state.desc
			});
		} else {
			this.setState({
				sort: index,
				desc: true
			});
		}
		
	}

	get posts() {
		const start = (this.props.activePage - 1) * this.props.rows;
		const end = start + this.props.rows;
		return this.props.posts
			.slice(start, end)
			.map((post, index) => {
				if (post.username === this.props.activeUser) {
					return <PostTableRow key={index} item={post} highlight/>;
				}
				return <PostTableRow key={index} item={post} />
			});
	}

	render() {
		return (
			<Table striped bordered condensed>
				<PostTableHeader
					sort={this.state.sort}
					desc={this.state.desc}
					columns={this.columns}
					onChange={this.setSort.bind(this)}
				/>
				<tbody>
					{this.posts}
				</tbody>
			</Table>
		);
	}
}