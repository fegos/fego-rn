/*
 * @author @by zramals
 */
export default {
	topHeight: 60,
	bottomHeight: 60,

	pullRefreshBackgroundColor: 'transparent',
	loadMoreBackgroundColor: 'transparent',

	//图片的刷新频率
	pullingImageFrequence: 50,
	loadingImageFrequence: 50,

	//图片选择light/dark
	styleType: 'light',
	//距离顶部和底部的模糊数，根据情况选择大小，太小则对顶底的到达要求高，大则相隔较远也会响应
	blurSize: 2,

	textConfig: {
		'normal': '下拉可以刷新',
		'pulling': '下拉可以刷新',
		'pullrelease': '正在刷新数据中..',
		'pullok': '释放立即刷新',
		'loadok': '释放加载',
		'loading': '上拉加载',
		'loadrelease': '正在加载...',
	},
}