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
			desc: false
		};
		this.columns = [
			'ID',
			'User name',
			'Post title',
			'Views',
			'Likes',
			'Created at'
		];
		this.sortingMethods = {
			numberComparator(a, b) {
				return a - b;
			},
			stringComparator(a, b) {
				// TODO: check if it's sorting correctly.
				return a.localeCompare(b);
			},
			dateComparator(a, b) {
				return a.getTime() - b.getTime();
			}
		};
	}

	sortOnChangeHandler(index) {
		if (this.state.sort === index) {
			this.setState({
				desc: !this.state.desc
			});
		} else {
			this.setState({
				sort: index,
				desc: false
			});
		}
		
	}

	preparePosts() {
		const start = (this.props.activePage - 1) * this.props.rows;
		const end = start + this.props.rows;
		return this.props.posts
			.sort((a, b) => {
				let cmp = 0;
				switch(this.state.sort) {
					case 0:
					default:
						cmp = this.sortingMethods.numberComparator(a.id, b.id);
						break;
					case 1:
						cmp = this.sortingMethods.stringComparator(a.username, b.username);
						break;
					case 2:
						cmp = this.sortingMethods.stringComparator(a.postTitle, b.postTitle);
						break;
					case 3:
						cmp = this.sortingMethods.numberComparator(a.views, b.views);
						break;
					case 4:
						cmp = this.sortingMethods.numberComparator(a.likes, b.likes);
						break;
					case 5:
						cmp = this.sortingMethods.dateComparator(a.createdAt, b.createdAt);
						break;
				}
				return cmp * (this.state.desc ? -1 : 1);
			})
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
					onChange={this.sortOnChangeHandler.bind(this)}
				/>
				<tbody>
					{this.preparePosts()}
				</tbody>
			</Table>
		);
	}
}