import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	Dimensions
} from 'react-native';

// import PullView from './JBRefreshView';
import { RefreshView } from 'fego-rn'


export default class extends Component {

	constructor(props) {
		super(props);
		this.state = { refreshing: false };
	}

	onRefresh=(PullRefresh)=> {
		//do something
		setTimeout(() => {
			PullRefresh.refreshed();
		}, 3000);
	}

	render() {
		return (
			<View style={[styles.container]}>
				<RefreshView
					style={{ width: Dimensions.get('window').width }}
					onRefresh={this.onRefresh}
					//topIndicatorRender={this.topIndicatorRender}
					topIndicatorHeight={60}>
					<View style={{ backgroundColor: '#eeeeee' }}>
						<Text>1</Text>
						<Text>2</Text>
						<Text>2</Text>
						<Text>3</Text>
						<Text>4</Text>
						<Text>5</Text>
						<Text>6</Text>
						<Text>7</Text>
						<Text>8</Text>
						<Text>9</Text>
						<Text>13</Text>
						<Text>14</Text>
						<Text>15</Text>
						<Text>7</Text>
						<Text>8</Text>
						<Text>9</Text>
						<Text>13</Text>
						<Text>14</Text>
						<Text>15</Text>
						<Text>7</Text>
						<Text>8</Text>
						<Text>9</Text>
						<Text>13</Text>
						<Text>14</Text>
						<Text>15</Text>
						<Text>7</Text>
						<Text>8</Text>
						<Text>9</Text>
						<Text>13</Text>
						<Text>14</Text>
						<Text>15</Text>
						<Text>7</Text>
						<Text>8</Text>
						<Text>9</Text>
						<Text>13</Text>
						<Text>14</Text>
						<Text>15</Text>
						<Text>15</Text>
						<Text>7</Text>
						<Text>8</Text>
						<Text>9</Text>
						<Text>13</Text>
						<Text>14</Text>
						<Text>15</Text>
						<Text>7</Text>
						<Text>8</Text>
						<Text>9</Text>
						<Text>13</Text>
						<Text>14</Text>
					</View>
				</RefreshView>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
