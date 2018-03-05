import React from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { Carousel } from 'fego-rn';

const imageArray = [
  'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=964384135,2680536306&fm=15&gp=0.jpg',
  require('./img/car1.png'),
  require('./img/car2.jpg'),
  require('./img/car3.jpg'),
  require('./img/car4.jpg'),
  require('./img/car5.jpg'),
  require('./img/car6.jpg'),
  require('./img/car7.jpg'),
  require('./img/girl.jpg'),
];

const source0 = [];
const source1 = imageArray.slice(0, 1);
const source2 = imageArray.slice(0, 2);
const source3 = imageArray.slice(0, 3);
const source4 = imageArray.slice(0, 4);
const source5 = imageArray.slice(0, 5);
const source6 = imageArray.slice(0, 6);
const source7 = imageArray.slice(0, 7);
const source8 = imageArray.slice(0, 8);

export default () =>
  (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      onMomentumScrollEnd={
        () => {
          console.log('onMomentumScrollEnd')
        }
      }
    >
      <Text style={{ padding: 10, color: '#333' }}>空的轮播图</Text>
      <Carousel
        source={source0}
      />
      <Text style={{ padding: 10, color: '#333' }}>只有一页的轮播图</Text>
      <Carousel
        source={source1}
      />
      <Text style={{ padding: 10, color: '#333' }}>内容为两页的轮播图</Text>
      <Carousel
        source={source2}
      />
      <Text style={{ padding: 10, color: '#333' }}>内容为三页的轮播图</Text>
      <Carousel
        source={source3}
      />
      <Text style={{ padding: 10, color: '#333' }}>内容为四页的轮播图</Text>
      <Carousel
        source={source4}
      />
      <Text style={{ padding: 10, color: '#333' }}>内容为五页的轮播图</Text>
      <Carousel
        source={source5}
      />
      <Text style={{ padding: 10, color: '#333' }}>内容为六页的轮播图</Text>
      <Carousel
        source={source6}
      />
      <Text style={{ padding: 10, color: '#333' }}>内容为七页的轮播图</Text>
      <Carousel
        source={source7}
      />

      <Text style={{ padding: 10, color: '#333' }}>内容为八页的轮播图</Text>
      <Carousel
        source={source8}
      />

      <Text style={{ padding: 10, color: '#333' }}>水平播放的走马灯,自定义分页样式,rect指示器,显示自定义左右箭头↓</Text>
      <Carousel
        showPagination
        paginationStyle={{ borderRadius: 0, backgroundColor: '#fff' }}
        paginationTextStyle={{ color: 'red' }}
        paginationSeparator=":"
        dotType="rect"
        dotStyle={{ backgroundColor: 'red' }}
        activeDotStyle={{ backgroundColor: 'yellow' }}
        showArrows
        arrowWrapperStyle={{ borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
        arrowTextStyle={{ color: 'red' }}
        rightArrow={<Image source={require('./img/arrow.png')} style={{ width: 30, height: 30 }} />}
        source={source4}
        styles={{ paginationContainer: { bottom: 20 } }}
      />
      <Text style={{ padding: 10, color: '#333' }}>垂直播放的走马灯,rect指示器,显示分页↓</Text>
      <Carousel direction="vertical" dotType="rect" showPagination source={source4} />
    </ScrollView>
  );
