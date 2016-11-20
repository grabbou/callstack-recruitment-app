import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import propTypes from '../../lib/decorators/propTypes';

@propTypes({
	value: React.PropTypes.number,
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	shouldBeInteger: React.PropTypes.bool,
	onChange: React.PropTypes.func.isRequired,
	children: React.PropTypes.node
})
export default class NumberInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!Number.isNaN(nextProps.value) && +nextProps.value !== +this.state.value) {
			this.setState({
				value: +nextProps.value
			});
		}
	}

	_onChangeHandler(event) {
		if (this._numberValidator(+event.target.value) === 'success') {
			this.props.onChange(event);
		} else {
			this.props.onChange({ target: { value: Number.NaN }});
		}
		this.setState({
			value: +event.target.value
		});
	}

	_numberValidator(number = Number.NaN) {
		const min = typeof this.props.min === 'number' ? this.props.min : Number.NEGATIVE_INFINITY;
		const max = typeof this.props.max === 'number' ? this.props.max : Number.POSITIVE_INFINITY;
		const shouldBeInteger = this.props.shouldBeInteger;
		const value = Number.isNaN(number) ? this.state.value : number;
		return (
			!isNaN(parseFloat(value)) && isFinite(value)
			&& value >= min && value <= max
			&& (!shouldBeInteger|| Number.isInteger(value))
				? 'success'
				: 'error'
		);
	}

	get _label() {
		if (this.props.children) {
			return <ControlLabel>{this.props.children}</ControlLabel>;
		}
	}

	get _helpBlock() {
		let text = null;
		const shouldBeInteger = this.props.shouldBeInteger ? 'integer and' : '';
		if (this.props.min && this.props.max) {
			text = `Value should be ${shouldBeInteger} between ${this.props.min} and ${this.props.max} inclusively.`;
		} else if (this.props.min) {
			text = `Value should be ${shouldBeInteger} grater than ${this.props.min} inclusively.`;
		} else if (this.props.max) {
			text = `Value should be ${shouldBeInteger} lesser than ${this.props.min} inclusively.`;
		}
		if (text) {
			return <HelpBlock>{text}</HelpBlock>;
		}
	}

	render() {
		return (
			<FormGroup
				controlId="formBasicNumber"
				validationState={this._numberValidator()}
			>
				{this._label}
				<FormControl
					type="number"
					value={this.state.value}
					onChange={this._onChangeHandler.bind(this)}
				/>
				<FormControl.Feedback />
				{this._helpBlock}
			</FormGroup>
		);
	}
}
