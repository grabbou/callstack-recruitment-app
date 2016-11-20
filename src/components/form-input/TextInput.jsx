import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class TextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value && nextProps.value !== this.state.value) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	_onChangeHandler(event) {
		const validation = this._lengthValidator(event.target.value);
		if(validation === 'success' || validation === 'warning') {
			this.props.onChange(event);
		} else {
			this.props.onChange({ target: { value: '' }});
		}
		this.setState({
			value: event.target.value
		});
	}

	_lengthValidator(value = '') {
		const requiredLength = +this.props.requiredLength || 0;
		const length = value.length ? value.length : this.state.value.length;
		return length > requiredLength ? 'success' : (length === requiredLength) ? 'warning' : 'error';
	}

	get _label() {
		if (this.props.children) {
			return <ControlLabel>{this.props.children}</ControlLabel>;
		}
	}

	get _helpBlock() {
		if (this.props.requiredLength > 0) {
			return <HelpBlock>Value should have at least {this.props.requiredLength} characters.</HelpBlock>;
		}
	}

	render() {
		return (
			<FormGroup
				controlId="formBasicText"
				validationState={this._lengthValidator()}
			>
				{this._label}
				<FormControl
					type="text"
					value={this.state.value}
					placeholder={this.props.placeholder}
					onChange={this._onChangeHandler.bind(this)}
				/>
				<FormControl.Feedback />
				{this._helpBlock}
			</FormGroup>
		);
	}
}

TextInput.propTypes = {
	value: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	requiredLength: React.PropTypes.number,
	onChange: React.PropTypes.func.isRequired,
	children: React.PropTypes.node
};