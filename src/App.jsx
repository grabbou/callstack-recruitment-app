import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Grid, Row, Col } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

import {RestClient} from './rest-client/RestClient';
import RowSelector from './components/row-selector/RowSelector';
import Pagination from './components/pagination/Pagination';


class App extends Component {
	constructor() {
		super();
		this._api = new RestClient();
		this.state = {
			activeUser: 'n/a',
			fetching: true,
			posts: [],
			renderRows: 5,
			activePage: 1
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

	changeRenderRows(event) {
		this.setState({
			renderRows: event.target.value
		});
	}

	selectActivePage(value) {
		this.setState({
			activePage: value
		});
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
					</Col>
					<Col xs={12} md={4}>
						<RowSelector
							value={this.state.renderRows}
							onChange={this.changeRenderRows.bind(this)}
						/>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col xs={12}>
						<Pagination
							activePage={this.state.activePage}
							rows={this.state.renderRows}
							items={this.state.posts.length}
							onSelect={this.selectActivePage.bind(this)}
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
