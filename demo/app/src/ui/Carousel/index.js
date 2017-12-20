import React, { Component } from 'react'
import { ScrollView, Image, Dimensions, View, Text } from 'react-native'
import { Style } from '../../../common'
import { Carousel } from 'fego-rn'

const width = Dimensions.get('window').width

export default class Page extends Component {
	render () {
		let arr4 = [
			<Image key='1' source={require('./img/carousel1.jpg')} style={{width: width, height: 170}} />,
			<Image key='2' source={require('./img/carousel2.jpg')} style={{width: width, height: 170}} />,
			<Image key='3' source={require('./img/carousel3.jpg')} style={{width: width, height: 170}} />,
			<Image key='4' source={require('./img/carousel4.jpg')} style={{width: width, height: 170}} />
		], arr3 = [
			<Image key='1' source={require('./img/carousel1.jpg')} style={{width: width, height: 170}} />,
			<Image key='2' source={require('./img/carousel2.jpg')} style={{width: width, height: 170}} />,
			<Image key='3' source={require('./img/carousel3.jpg')} style={{width: width, height: 170}} />,
		],arr2 = [
			<Image key='1' source={require('./img/carousel1.jpg')} style={{width: width, height: 170}} />,
			<Image key='2' source={require('./img/carousel2.jpg')} style={{width: width, height: 170}} />,
		],arr1 = [
			<Image key='1' source={require('./img/carousel1.jpg')} style={{width: width, height: 170}} />,
		],arr0=[], arr;
		return (
			<ScrollView style={{backgroundColor: '#fff'}}>
				<Text style={{padding: 10, color: '#333'}}>Carousel children 测试</Text>
				<Carousel>{arr0}
				</Carousel>
				<Carousel>
					{arr1}
				</Carousel>
				<Carousel>
				{arr2}
				</Carousel>
				<Carousel>
				{arr3}
				</Carousel>
				<Text style={{padding: 10, color: '#333'}}>水平播放的走马灯,circle指示器,不显示分页,不显示左右箭头↓</Text>
				<Carousel>
				{arr4}
				</Carousel>
				<Text style={{padding: 10, color: '#333'}}>水平播放的走马灯,自定义分页样式,rect指示器,显示自定义左右箭头↓</Text>
				<Carousel
					showPagination={true}
					paginationStyle={{borderRadius: 0, backgroundColor: '#fff'}}
					paginationTextStyle={{color: 'red'}}
					paginationSeparator=':'
					showDot={true}
					dotType='rect'
					dotsWrapperStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
					dotStyle={{backgroundColor: 'red'}}
					activeDotStyle={{backgroundColor:'yellow'}}
					showArrows={true}
					arrowWrapperStyle={{borderRadius:20, backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
					arrowTextStyle={{color:'red'}}
					rightArrow={<Image source={require('./img/arrow.png')} style={{width: 30, height: 30}} />}
				>
						<Image key='1' source={require('./img/carousel1.jpg')} style={{width: width, height: 170}} />
						<Image key='2' source={require('./img/carousel2.jpg')} style={{width: width, height: 170}} />
						<Image key='3' source={require('./img/carousel3.jpg')} style={{width: width, height: 170}} />
						<Image key='4' source={require('./img/carousel4.jpg')} style={{width: width, height: 170}} />
				</Carousel>
				<Text style={{padding: 10, color: '#333'}}>垂直播放的走马灯,rect指示器,显示分页↓</Text>
				<Carousel direction='vertical' dotType='rect' showPagination={true}>
					<Image key='1' source={require('./img/carousel1.jpg')} style={{width: width, height: 170}} />
					<Image key='2' source={require('./img/carousel2.jpg')} style={{width: width, height: 170}} />
					<Image key='3' source={require('./img/carousel3.jpg')} style={{width: width, height: 170}} />
					<Image key='4' source={require('./img/carousel4.jpg')} style={{width: width, height: 170}} />
				</Carousel>
			</ScrollView>
		)
	}
}