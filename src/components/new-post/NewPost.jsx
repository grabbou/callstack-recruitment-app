import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import TextInput from '../form-input/TextInput';
import NumberInput from '../form-input/NumberInput';
import propTypes from '../../lib/decorators/propTypes';
import './NewPost.sass';

@propTypes({
	onSubmit: React.PropTypes.func.isRequired
})
export default class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validateError: false,
			formOpen: false,
			username: '',
			postTitle: '',
			views: 0,
			likes: 0
		};
	}

	_toggleFormModal() {
		this.setState({
			validateError: false,
			username: '',
			postTitle: '',
			views: 0,
			likes: 0,
			formOpen: !this.state.formOpen
		});
	}

	_onSubmitHandler() {
		let validateError = !this.state.username.length
			&& !this.state.postTitle.length
			&& typeof this.state.likes !== 'number'
			&& typeof this.state.views !== 'number';
		if (!validateError) {
			validateError = this.props.onSubmit({
				id: 1,
				username: this.state.username,
				postTitle: this.state.postTitle,
				views: this.state.views,
				likes: this.state.likes,
				createdAt: new Date()
			});
		}

		this.setState({
			validateError
		});

		if (!validateError) {
			this._toggleFormModal();
		}
	}

	_getOnhangeHander(stateProp, shouldBeNumber = false) {
		return (event) => {
			const newState = {};
			newState[stateProp] = shouldBeNumber ? +event.target.value : event.target.value;
			this.setState(newState);
		};
	}

	get _form() {
		return (
			<form>
				<TextInput
					placeholder="Enter username"
					onChange={this._getOnhangeHander('username')}
					requiredLength={3}
					value={this.state.username}
				>
					User name
				</TextInput>
				<TextInput
					placeholder="Enter post title"
					onChange={this._getOnhangeHander('postTitle')}
					requiredLength={3}
					value={this.state.postTitle}
				>
					User name
				</TextInput>
				<NumberInput
					value={this.state.views}
					onChange={this._getOnhangeHander('views', true)}
					min={0}
					shouldBeInteger
				>
					Views
				</NumberInput>
				<NumberInput
					value={this.state.likes}
					onChange={this._getOnhangeHander('likes', true)}
					min={0}
					shouldBeInteger
				>
					Likes
				</NumberInput>
			</form>
		);
	}

	get _validationFeedback() {
		return this.state.validateError ? (
			<Alert bsStyle="danger" className="NewPost__alert NewPost__alert--error">
				Invalid form data.
			</Alert>
		) : null;
	}

	get _modal() {
		return (
			<Modal show={this.state.formOpen} className="NewPost__modal">
				<Modal.Header>
					<Modal.Title>Add new post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this._validationFeedback}
					{this._form}
				</Modal.Body>
				<Modal.Footer>
					<Button
						className="NewPost__button NewPost__button--default" 
						onClick={this._toggleFormModal.bind(this)}
					>
						Cancel
					</Button>
					<Button
						bsStyle="primary"
						className="NewPost__button NewPost__button--primary" 
						onClick={this._onSubmitHandler.bind(this)}
					>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	render() {
		return (
			<section className="NewPost">
				<Button
					className="NewPost__button NewPost__button--default"
					onClick={this._toggleFormModal.bind(this)}
				>
					New post
				</Button>
				{this._modal}
			</section>
		);
	}
}