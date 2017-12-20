import React from 'react';
import DocumentTitle from 'react-document-title';
import collect from 'bisheng/collect';
import '../static/component.less';

class Component extends React.Component {
	render() {
		let { pageData, utils, themeConfig } = this.props;

		return (
			<DocumentTitle title={`${pageData.meta.title} | ${themeConfig.siteTitle}`}>
				<div className='markdown'>
					{utils.toReactComponent(pageData.content)}
				</div>
			</DocumentTitle>
		)
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
})(Component);
