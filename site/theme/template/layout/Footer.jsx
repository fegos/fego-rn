import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer id='footer'>
				<p className='copyright'>powered by <a href='#'>@{this.props.copyright}</a></p>
			</footer>
		);
	}
}