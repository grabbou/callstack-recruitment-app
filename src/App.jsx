import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

import { RestClient } from './rest-client/RestClient';
import RowSelector from './components/row-selector/RowSelector';
import Pagination from './components/pagination/Pagination';
import PostsTable from './components/posts-table/PostsTable';
import NewPost from './components/new-post/NewPost';


class App extends Component {
	constructor() {
		super();
		this._api = new RestClient();
		this.rawPosts = [];
		this.state = {
			activeUser: 'n/a',
			fetching: true,
			posts: [],
			renderRows: 5,
			activePage: 1,
			usernameFilter: ''
		};
	}

	componentWillMount() {
		this._api.getPosts()
		.then((posts) => {
			this.rawPosts = posts;
			this.setState({
				activeUser: posts[59].username,
				fetching: false,
				posts,
			});
		})
		.catch((error) => {
			alert(error);
		});
	}

	filterPosts(filter = '') {
		return filter.length
			? this.rawPosts.filter((value) => value.username.startsWith(filter))
			: this.rawPosts;
	}

	rowSelectorOnChangeHandler(event) {
		this.setState({
			renderRows: +event.target.value
		});
	}

	paginationOnSelectHandler(value) {
		this.setState({
			activePage: value
		});
	}

	filterOnChangeHandler(event) {
		this.setState({
			usernameFilter: event.target.value,
			posts: this.filterPosts(event.target.value)
		});
	}

	newPostOnSubmitHandler(value) {
		this.rawPosts = [value].concat(this.rawPosts.map((post) => {
			post.id++;
			return post;
		}));
		this.setState({
			posts: this.filterPosts(this.state.usernameFilter)
		});
		this._api.insertPost(value);
	}

	get appBody() {
		return this.state.fetching ? (
			<div className="">
				Fetching data...
			</div>
		) : (
			<div className="">
				<Row className="show-grid">
					<Col xs={12} md={8}>
						<FormGroup controlId="formBasicText">
							<ControlLabel>Type username to filter posts</ControlLabel>
							<FormControl
								type="text"
								value={this.state.usernameFilter}
								onChange={this.filterOnChangeHandler.bind(this)}
							/>
						</FormGroup>
					</Col>
					<Col xs={12} md={4}>
						<RowSelector
							value={this.state.renderRows}
							onChange={this.rowSelectorOnChangeHandler.bind(this)}
						/>
						<NewPost onSubmit={this.newPostOnSubmitHandler.bind(this)}/>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col xs={12}>
						<PostsTable
							rows={this.state.renderRows}
							posts={this.state.posts}
							activePage={this.state.activePage}
							activeUser={this.state.activeUser}
						/>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col xs={12}>
						<Pagination
							activePage={this.state.activePage}
							rows={this.state.renderRows}
							items={this.state.posts.length}
							onSelect={this.paginationOnSelectHandler.bind(this)}
						/>
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		return (
			<div className="App">
				<Grid>
					{this.appBody}
				</Grid>
			</div>
		);
	}
}

export default App;
