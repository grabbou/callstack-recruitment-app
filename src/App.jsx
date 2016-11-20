import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { RestClient } from './rest-client/RestClient';
import RowSelector from './components/row-selector/RowSelector';
import Pagination from './components/pagination/Pagination';
import PostsTable from './components/posts-table/PostsTable';
import NewPost from './components/new-post/NewPost';

import './App.sass';


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

	_filterPosts(filter = '') {
		return filter.length
			? this.rawPosts.filter((value) => value.username.startsWith(filter))
			: this.rawPosts;
	}

	_rowSelectorOnChangeHandler(event) {
		let activePage = this.state.renderRows / event.target.value * this.state.activePage;
		activePage = event.target.value > this.state.renderRows ? Math.ceil(activePage) : Math.floor(activePage); 
		this.setState({
			renderRows: +event.target.value,
			activePage
		});
	}

	_paginationOnSelectHandler(value) {
		this.setState({
			activePage: value
		});
	}

	_filterOnChangeHandler(event) {
		this.setState({
			usernameFilter: event.target.value,
			posts: this._filterPosts(event.target.value),
			activePage: 1
		});
	}

	_newPostOnSubmitHandler(value) {
		const valid = this.rawPosts.findIndex((post) => {
			return post.username === value.username && post.postTitle === value.postTitle;
		}) === -1;

		if (valid) {
			this.rawPosts = [value].concat(this.rawPosts.map((post) => {
				post.id++;
				return post;
			}));
			this.setState({
				posts: this.filterPosts(this.state.usernameFilter)
			});
			this._api.insertPost(value);
			return;
		}
		return !valid;
	}

	get _header() {
		return (
			<header>
				<div className="App__welcome-msg">
					Welcome <b>{this.state.activeUser}</b>!
				</div>
				<Row className="show-grid App__flex-row">
					<Col xs={12} md={8}>
						<FormGroup controlId="formBasicText">
							<ControlLabel>Type username to filter posts</ControlLabel>
							<FormControl
								type="text"
								className="App__filter"
								value={this.state.usernameFilter}
								onChange={this._filterOnChangeHandler.bind(this)}
							/>
						</FormGroup>
					</Col>
					<Col xs={12} md={4} className="App__push-bottom">
						<RowSelector
							value={this.state.renderRows}
							onChange={this._rowSelectorOnChangeHandler.bind(this)}
						/>
						<NewPost onSubmit={this._newPostOnSubmitHandler.bind(this)}/>
					</Col>
				</Row>
			</header>
		);
	}

	get _body() {
		return (
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
		);
	}

	get _footer() {
		return (
			<Row className="show-grid">
				<Col xs={12}>
					<Pagination
						activePage={this.state.activePage}
						rows={this.state.renderRows}
						items={this.state.posts.length}
						onSelect={this._paginationOnSelectHandler.bind(this)}
					/>
				</Col>
			</Row>
		);
	}

	render() {
		return (
			<div className="App">
				<Grid>
					{this.state.fetching ? (
						<div className="">
							Fetching data...
						</div>
					) : (
						<div className="">
							{this._header}
							{this._body}
							{this._footer}
						</div>
					)}
				</Grid>
			</div>
		);
	}
}

export default App;
