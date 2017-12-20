import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

export default class ErrorPage extends Component {
	render() {
		return (
			<DocumentTitle title={`Error Page | ${this.props.themeConfig.siteTitle}`}>
				<div>
					<h1 className='entry-title'>Oops something bad happened!</h1>
				</div>
			</DocumentTitle>
		);
	}
}