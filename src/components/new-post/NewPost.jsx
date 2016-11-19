import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, FieldGroup } from 'react-bootstrap';

export default class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formOpen: false,
			username: '',
			postTitle: '',
			views: 0,
			likes: 0
		};
	}

	toggleFormModal() {
		this.setState({
			formOpen: !this.state.formOpen
		});
	}

	submitHandler() {
		this.toggleFormModal();
		this.props.onSubmit({
			id: 1,
			username: this.state.username,
			postTitle: this.state.postTitle,
			views: this.state.views,
			likes: this.state.likes,
			createdAt: new Date()
		});
	}

	getFormChangeHander(stateProp) {
		return (event) => {
			const newState = {};
			newState[stateProp] = event.target.value;
			this.setState(newState);
		};
	}

	get modal() {
		return (
			<Modal show={this.state.formOpen}>
				<Modal.Header>
					<Modal.Title>Add new post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup
							controlId="formBasicText"
						>
							<ControlLabel>User name</ControlLabel>
							<FormControl
								type="text"
								value={this.state.username}
								placeholder="Enter username"
								onChange={this.getFormChangeHander('username')}
							/>
							<FormControl.Feedback />
						</FormGroup>
						<FormGroup
							controlId="formBasicText"
						>
							<ControlLabel>Post title</ControlLabel>
							<FormControl
								type="text"
								value={this.state.postTitle}
								placeholder="Enter post title"
								onChange={this.getFormChangeHander('postTitle')}
							/>
							<FormControl.Feedback />
						</FormGroup>
						<FormGroup controlId="formBasicNumber">
							<ControlLabel>Views</ControlLabel>
							<FormControl
								type="numer"
								value={this.state.views}
								onChange={this.getFormChangeHander('views')}
							/>
						</FormGroup>
						<FormGroup controlId="formBasicNumber">
							<ControlLabel>Likes</ControlLabel>
							<FormControl
								type="numer"
								value={this.state.likes}
								onChange={this.getFormChangeHander('likes')}
							/>
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.toggleFormModal.bind(this)}>Cancel</Button>
					<Button bsStyle="primary" onClick={this.submitHandler.bind(this)}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	render() {
		return (
			<section>
				<Button onClick={this.toggleFormModal.bind(this)}>New post</Button>
				{this.modal}
			</section>
		);
	}
}