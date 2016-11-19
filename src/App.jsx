import React, { Component } from 'react';
import {RestClient} from './rest-client/RestClient.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this._api = new RestClient();
		this.state = {
			activeUser: 'n/a',
			fetching: true,
			posts: []
		};
	}

	componentWillMount() {
		this._api.getPosts()
		.then((posts) => {
			this.setState({
				activeUser: posts[59].username,
				fetching: false,
				posts
			});
		})
		.catch((error) => {
			alert(error);
		});
	}

	get appBody() {
		return this.state.fetching ? (
			<div className="">
				Fetching data...
			</div>
		) : (
			<div className="">
				Done
			</div>
		);
	}

	render() {
		return (
			<div className="App">
				{this.appBody}
			</div>
		);
	}
}

export default App;
