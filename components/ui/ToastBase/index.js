import React, { Component } from 'react'
import AppContainer from '../AppContainer'
import ToastContainer from './ToastContainer'
let topViewKey = 'toast'
let hide = function(){
	AppContainer.remove(topViewKey);
}
let notice = (content, opt) => {
	hide();
	function animationEnd() {
		hide();
	}
	AppContainer.add( 
		<ToastContainer 
			{...opt}
			key={topViewKey} 
			content={content} 
			onAnimationEnd={animationEnd} />
	)
}

export default {
	notice: notice,
	hide: hide
}