import React, { Component } from 'react';
import { ScrollView, TouchableWithoutFeedback, Text, View, Image, Dimensions } from 'react-native';
import { Carousel, Radio, Group } from 'fego-rn';

const { width } = Dimensions.get('window');

const imageArray = [
  require('./img/car1.png'),
  require('./img/car2.jpg'),
  require('./img/car3.jpg'),
  require('./img/car4.jpg'),
  require('./img/car5.jpg'),
  require('./img/car6.jpg'),
  require('./img/car7.jpg'),
  require('./img/girl.jpg'),
];

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 4,
      showDot: true,
      showPagination: false,
      showArrows: false,
      autoPlay: true,
      infinite: true,
      childrenType: 'image',
    };
  }

  _addPage = () => {
    let pageCount = this.state.pageCount + 1;
    if (pageCount > imageArray.length) {
      pageCount = imageArray.length;
    }
    this.setState({
      pageCount,
    });
  }

  _deletePage = () => {
    let pageCount = this.state.pageCount - 1;
    if (pageCount < 0) {
      pageCount = 0;
    }
    this.setState({
      pageCount,
    });
  }

  render() {
    const {
      autoPlay, infinite, showDot, showPagination, showArrows, childrenType,
    } = this.state;
    const source = imageArray.slice(0, this.state.pageCount);

    return (
      <ScrollView
        style={{ backgroundColor: '#fff' }}
      >
        <Text style={{
          fontSize: 15, color: '#333333', marginTop: 10, marginLeft: 15,
        }}
        >页面管理
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableWithoutFeedback
            onPress={this._addPage}
          >
            <View
              style={{
                marginLeft: 15, width: 100, height: 35, backgroundColor: 'brown', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{
                fontSize: 14, color: 'white',
              }}
              >加一张
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={this._deletePage}
          >
            <View
              style={{
                marginLeft: 20, width: 100, height: 35, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{
                fontSize: 14, color: 'white',
              }}
              >减一张
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Text style={{
          fontSize: 15, color: '#333333', marginTop: 15, marginLeft: 15,
        }}
        >属性管理
        </Text>

        <View style={{
          flexDirection: 'row', marginLeft: 15, alignItems: 'center',
        }}
        >
          <Text style={{
            fontSize: 13, color: '#555555',
          }}
          >子view类型
          </Text>

          <Group
            style={{ alignItems: 'center' }}
            defaultValue="image"
            onChange={(value) => {
              this.setState({
                childrenType: value,
              });
            }}
          >
            <Radio value="image">image</Radio>
            <Radio style={{ marginLeft: 5 }} value="custom">custom</Radio>
          </Group>
        </View >
        <View style={{
          flexDirection: 'row', marginLeft: 15, marginTop: 5,
        }}
        >
          <Radio
            style={{ marginLeft: 5, marginTop: 10 }}
            checked={autoPlay}
            onChange={(checked) => {
              this.setState({
                autoPlay: checked,
              });
            }}
          >autoPlay
          </Radio>
          <Radio
            style={{ marginLeft: 5, marginTop: 10 }}
            checked={infinite}
            onChange={(checked) => {
              this.setState({
                infinite: checked,
              });
            }}
          >infinite
          </Radio>
        </View>

        <View style={{
          flexDirection: 'row', marginLeft: 15, marginTop: 5,
        }}
        >
          <Radio
            style={{ marginLeft: 5, marginTop: 10 }}
            checked={showDot}
            onChange={(checked) => {
              this.setState({
                showDot: checked,
              });
            }}
          >showDot
          </Radio>
          <Radio
            style={{ marginLeft: 5, marginTop: 10 }}
            checked={showPagination}
            onChange={(checked) => {
              this.setState({
                showPagination: checked,
              });
            }}
          >showPagination
          </Radio>
        </View>

        <View
          style={{
            flexDirection: 'row', marginLeft: 15, marginTop: 5, marginBottom: 10,
          }}
        >
          <Radio
            style={{ marginLeft: 5, marginTop: 10 }}
            checked={showArrows}
            onChange={(checked) => {
              this.setState({
                showArrows: checked,
              });
            }}
          >showArrows
          </Radio>
        </View>

        <Carousel
          childrenType={childrenType}
          source={source}
          autoPlay={autoPlay}
          infinite={infinite}
          showDot={showDot}
          showPagination={showPagination}
          showArrows={showArrows}
        >
          <Image resizeMode="stretch" source={source[0]} style={{ width, height: width * 180 / 375 }} />
        </Carousel>

      </ScrollView >
    );
  }
}

