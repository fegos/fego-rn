/**
 * 提示框容器
 */
import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

import Dialog from './index'
import UIComponent from '../../common/UIComponent'
export default class TipAgent extends UIComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
		};
	}
	componentWillUnmount() {
		this.close = () => { }
	}
	close(fn) {
		this.setState({
			visible: false,
		}, fn)
	}
	_crtContent(style) {
		const { content, title } = this.props;
		if (typeof content === 'string') {
			return <Text style={ [style.content, title?style.contentHasTitle:null ]}>{content}</Text>
		}
		return content;
	}
	render() {
		const style = this.style;
		const { title, actions, onAnimationEnd } = this.props;
		const setAniEndFn = (endFn) =>{
			this.endFn = endFn;
		}
		const _onAniEnd = (visible)=>{
			onAnimationEnd && onAnimationEnd(visible);
			// 动画关闭时回调
			this.endFn && !visible && this.endFn(visible);
		}
		const footer = actions.map((button) => {
			const orginPress = button.onPress || function () { };
			button.onPress = () => {
				const res = orginPress(button, setAniEndFn);
				// 若返回false则不关闭
				if (res !== false) {
					this.close();
					return;
				}
				// 若返回promise则resolve时才关闭
				if (res && res.then) {
					res.then(() => {
						this.close();
					});
				}
			};
			return button;
		});
		const content = this._crtContent(style);
		return (
			<Dialog
				title={title}
				visible={this.state.visible}
				onClose={() => this.close}
				footer={footer}
				onAnimationEnd={_onAniEnd}
			>
				<ScrollView style={style.container} >
					{content}
				</ScrollView>
			</Dialog>
		);
	}
}
TipAgent.baseStyle = {
	container: {
		
	},
	content: {
		fontSize: 16,
		lineHeight: 22,
		color: '#030303',
		textAlign: 'center'
	},
	contentHasTitle:{
		color: '#888'
	}
}