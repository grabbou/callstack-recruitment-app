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
		this.sortCache = [];
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

	setSort(index) {
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


	getSortedPosts() {
		if(!this.sortCache[this.state.sort]) {
			this.sortCache[this.state.sort] = this.props.posts.slice(0).sort((a, b) => {
				switch(this.state.sort) {
					case 0:
					default:
						return this.sortingMethods.numberComparator(a.id, b.id);
					case 1:
						return this.sortingMethods.stringComparator(a.username, b.username);
					case 2:
						return this.sortingMethods.stringComparator(a.postTitle, b.postTitle);
					case 3:
						return this.sortingMethods.numberComparator(a.views, b.views);
					case 4:
						return this.sortingMethods.numberComparator(a.likes, b.likes);
					case 5:
						return this.sortingMethods.dateComparator(a.createdAt, b.createdAt);
				}
			});
		}
		return  this.state.desc ? this.sortCache[this.state.sort].slice(0).reverse() : this.sortCache[this.state.sort];
	}

	get posts() {
		const start = (this.props.activePage - 1) * this.props.rows;
		const end = start + this.props.rows;
		return this.getSortedPosts()
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