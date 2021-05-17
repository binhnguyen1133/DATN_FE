import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Emitter from '../../../services/event.js';
import './search-bar.scoped.css';
import { debounce } from 'lodash';

export class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.SEARCH_EVENT_NAME = 'SEARCH_EVENT';
		this.state = {
			error: null,
			isLoaded: false,
			suggestions: [],
			value: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.getSuggestionData = this.getSuggestionData.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.getSuggestionData = debounce(
			this.getSuggestionData.bind(this),
			500
		);
	}

	componentDidMount() {
		$(document).click(function() {
			$('.suggestionItems').hide();
		});

		$('.suggestionItems').click(function(e) {
			e.stopPropagation();
		});
	}

	handleSearch(e) {
		// console.log('Search' + this.state.value);
		Emitter.emit(this.SEARCH_EVENT_NAME, this.state.value);
	}

	getSuggestionData(params) {
		fetch(
			`${process.env.REACT_APP_API_SUGGESTION}${encodeURIComponent(
				params
			)}`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						suggestions: result,
					});
					console.log(this.state.suggestions);
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
	}

	handleChange(event) {
		let params = event.target.value;
		if (params.trim().length === 0)
			this.setState({
				value: params,
				suggestions: [],
			});
		else {
			this.getSuggestionData(params);
			this.setState({
				value: params,
			});
		}
	}

	renderSuggestion() {
		const { suggestions } = this.state;
		if (suggestions.length === 0) return null;
		return (
			<ul className="listItems">
				{suggestions.map((item, key) => (
					<li
						key={key}
						className="suggestionItems"
						onClick={this.handleComplete}
					>
						<div className="item">{item}</div>
					</li>
				))}
			</ul>
		);
	}

	handleComplete(event) {
		this.setState({
			value: event.target.outerText,
		});
	}

	render() {
		return (
			<div className="input-group" id="search-bar">
				<input
					type="search"
					className="form-control rounded"
					placeholder="Search"
					onChange={this.handleChange}
					value={this.state.value}
				/>
				{this.renderSuggestion()}
				<div
					onClick={this.handleSearch}
					className="btn btn-outline-primary"
				>
					Search
				</div>
			</div>
		);
	}
}

export default SearchBar;
