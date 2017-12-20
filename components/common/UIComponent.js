/**
 * UI组件基类
 * 统一处理基础样式，主题样式的优先级
 * @author esky 
 * 
【样式优先级】
下面优先级由低到高
> 优先级：baseStyle < themeStyle < styles < style < propStyle < simpleStyle

1. baseStyle 组件基础样式【必须】
2. setBaseStyle 由产品项目自定义基础样式
3. setThemeStyle 由产品项目自定义主题样式
4. props.styles 开发者自定义样式类
5. props.style 容器样式等效于styles.container
6. propStyle 以Style为后缀的prop，例如 props.contentStyle
7. simpleStyle 简易样式 例如 props.tipColor
 */
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'

export default class UIComponent extends Component {
	// constructor(props){
	// 	super(props)
	// }
	
	// 基础样式【必需】
	static baseStyle = {}
	/**
	 * 设置默认基础样式
	 * UIComponent.setBaseStyle(Button, {});
	 */
	static setBaseStyle(_class, style = {}) {
		if(_class && _class.baseStyle){
			return merge(_class.baseStyle, style);
		}
	}
	// 主题样式
	static themeStyle
	/**
	 * 设置默认主题样式
	 */
	static setThemeStyle(_class, style = {}) {
		if(_class && _class.themeStyle){
			return merge(_class.themeStyle, style);
		}
	}
	/**
	 * 简易的样式相关prop声明
	 * 示例
	 * simpleStyleProps = {
	 * 	textColor: { name: 'text', attr: 'color' }
	 * }
	 * 若
	 * props.textColor = '#333'
	 * 相当于
	 * style = {
	 * 	text: { color: '#333' }
	 * }
	 */
	static simpleStyleProps = undefined

	/**
	 * style是否自动转换成StyleSheet对象
	 * 若子类需要纯对象，则设成false
	 */
	static autoStyleSheet = true
	/**
	 * 组件当前有效的样式
	 * 由 componentWillMount，componentWillReceiveProps 负责刷新style
	 * 若子类使用上面的钩子则需要先调用父类方法，如 super.componentWillReceiveProps
	 */
	style = {}
	/**
	 * 合并方法lodash/merge的引用
	 */
	merge = merge
	/**
	 * 缓存需要处理的样式类prop,命名规则 *Style
	 */
	_propStyleArr = []
	/**
	 * 挂载前执行一次
	 */
	componentWillMount() {
		this._handlPropStyle()
		this.updateStyle();
	}
	/**
	 * 每次接受prop时执行
	 * @param {} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		if (this.shouldComponentUpdate(nextProps)) {
			this.updateStyle(nextProps);
		}
	}
	/**
	 * 性能优化使用
	 * @param {*} nextProps 
	 * @param {*} nextState 
	 */
	shouldComponentUpdate(nextProps, nextState) {
		// props 或 state 有变化是才render
		if(!isEqual(nextProps, this.props)) return true;
		if(nextState && !isEqual(nextState, this.state)) return true;
		return false;
	}
	/**
	 * 更新this.style，若有必要子类可调用该方法刷新style
	 */
	updateStyle(nextProps){
		// console.log(this.constructor.name + ': updateStyle')
		return this.style = this._getStyle(nextProps);
	}
	/**
	 * 获取最终样式
	 */
	_getStyle(nextProps) {
		let props = nextProps || this.props;
		// 自定义样式
		let { styles, style, contentStyle } = props;
		// 静态属性
		let { baseStyle, themeStyle, simpleStyleProps, autoStyleSheet } = this.constructor;
		// 检查基础样式是否合法
		if(!baseStyle || typeof baseStyle !== 'object'){
			console.warn('UI组件缺少合法的基础样式baseStyle!')
			return;
		}
		// 检查是否需要主题样式
		if(themeStyle && typeof themeStyle === 'object'){
			themeStyle = this._getThemeStyle(props);
		}
		// 容器样式对象 等效于 styles.container
		style && (style = { container: this._mergeStyle(style) });

		// propStyle样式
		let propStyle = this._getPropStyle(props);
		// 简易样式声明
		let simpleStyle = {}
		if(simpleStyleProps){
			simpleStyle = this._getSimpleStyle(props);
		}
		// 优先级 baseStyle < themeStyle < styles < style < propStyle < simpleStyle(简易样式声明)
		let curStyle = merge({}, baseStyle, themeStyle, styles, style, propStyle, simpleStyle);
		return autoStyleSheet ? StyleSheet.create(curStyle) : curStyle;
	}
	/**
	 * 获取主题样式
	 */
	_getThemeStyle(props) {
		let themeStyle = this.constructor.themeStyle;
		let styleArr= [];
		for(let k in themeStyle){
			let propValue = props[k];
			// 例如 themeStyle.type.primary
			styleArr.push(themeStyle[k][propValue])
		}
		return merge({}, ...styleArr);
	}
	/**
	 * 获取简易prop样式
	 * 由simpleStyleProps 声明，详情见其定义说明
	 */
	_getSimpleStyle(props){
		let simpleStyle = {};
		let simpleStyleProps = this.constructor.simpleStyleProps;
		for(let k in simpleStyleProps){
			let propValue = props[k];
			if(propValue){
				let styleDefine = simpleStyleProps[k];
				let styleObj = simpleStyle[styleDefine.name] = simpleStyle[styleDefine.name]||{};
				styleObj[styleDefine.attr] = propValue;
			}
		}
		return simpleStyle;
	}
	/**
	 * 获取prop样式
	 * 格式*Style，是以Style结尾的prop
	 * 例如： contentStyle = { color: '#FFF' } 会在这里 转换成 { content: { color: '#FFF' } }
	 */
	_getPropStyle(props){
		let style = {};
		this._propStyleArr.forEach(k =>{
			let fullStyle = this._mergeStyle(props[k]);
			k = k.replace(/Style$/,'');
			style[k] = fullStyle;
		})
		return style;
	}
	/**
	 * 合并样式 支持数组形式
	 * @param {*} style 
	 */
	_mergeStyle(style){
		if(!style) return {}
		if(style.constructor === Array){
			style.unshift({});
			return merge.apply(null, style);
		}
		return merge({}, style);
	}
	_handlPropStyle(){
		for( let k in this.props){
			if(/(.*)Style$/.test(k)){
				this._propStyleArr.push(k)
			}
		}
	}
}