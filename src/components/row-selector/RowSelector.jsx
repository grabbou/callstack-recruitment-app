import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import propTypes from '../../lib/decorators/propTypes';
import './RowSelector.sass';

@propTypes({
	value: React.PropTypes.number.isRequired,
	onChange: React.PropTypes.func.isRequired
})
export default class RowSelector extends Component {
	render() {
		return (
			<Form inline className="RowSelector">
				<FormGroup controlId="formControlsSelect">
					<ControlLabel className="RowSelector__label">Show rows:</ControlLabel>
					<FormControl className="RowSelector__selector"
						componentClass="select"
						value={this.props.value}
						onChange={this.props.onChange}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
						<option value="20">20</option>
					</FormControl>
				</FormGroup>
			</Form>
		);
	}
}