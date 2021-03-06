import React, { Component } from 'react';
import './pagination.scoped.css';

export class Pagination extends Component {
	constructor(props) {
		super(props);
		this.handleEndPage = this.handleEndPage.bind(this);
	}

	handlePageChange(newPage, skipRelatedRecords, skipNormalizeRecords) {
		if (this.props.onPageChange) {
			this.props.onPageChange(
				newPage,
				skipRelatedRecords,
				skipNormalizeRecords
			);
		}
	}

	handleEndPage(
		skipNormalizeRecords,
		skipRelatedRecords,
		totalRecord,
		pageIndex
	) {
		console.log(pageIndex, skipNormalizeRecords, totalRecord);
		if (skipRelatedRecords !== 0 && totalRecord < 20) return true;
		if (
			pageIndex === 0 &&
			skipNormalizeRecords !== 0 &&
			skipNormalizeRecords < 20
		)
			return true;
		if (
			(totalRecord < 20 && skipNormalizeRecords !== 0) ||
			totalRecord < 20
		)
			return true;
		else return false;
	}

	render() {
		const {
			pageIndex,
			totalRecord,
			skipRelatedRecords,
			skipNormalizeRecords,
		} = this.props;
		return (
			<nav className="d-flex justify-content-center pagination-margin-bottom">
				<ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
					<li className="page-item">
						<button
							className="page-btn no-border"
							disabled={pageIndex === 0}
							onClick={() =>
								this.handlePageChange(
									pageIndex - 1,
									skipRelatedRecords,
									skipNormalizeRecords
								)
							}
						>
							«
						</button>
					</li>
					<li className="page-item">
						<button
							className="page-btn no-border"
							disabled={totalRecord === 0 || totalRecord === null}
							onClick={() =>
								this.handlePageChange(
									pageIndex + 1,
									skipRelatedRecords,
									skipNormalizeRecords
								)
							}
						>
							»
						</button>
					</li>
				</ul>
			</nav>
		);
	}
}

Pagination.defaultProps = {
	onPageChange: null,
};

export default Pagination;
