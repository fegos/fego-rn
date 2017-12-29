import React, { Component } from 'react';
import StackNav from './config/StackNav';
import Font from './config/font';
import { AppContainer } from 'fego-rn';

export default {
	init: () => {
		Font.init();
		return AppContainer.setApp(<StackNav />)
	}
}
