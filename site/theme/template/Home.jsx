import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import collect from 'bisheng/collect';
import '../static/home.less';

class Home extends Component {
	render() {
		let { utils, pageData, themeConfig } = this.props,
			title = themeConfig.siteTitle;

		return (
			<DocumentTitle title={title}>
				<div className='home'>
					<p className='welcome'>欢迎来到 {title}</p>
					<div className='markdown'>
						{utils.toReactComponent(pageData.content)}
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default collect(async (nextProps) => {
	let { pageData } = nextProps, 
		returnedPageData;

	returnedPageData = pageData instanceof Function ? pageData : (pageData.README || pageData.index);
	if (!pageData || !returnedPageData) {
		throw 404;
	}
	return {
		pageData: await returnedPageData()
	};
})(Home);