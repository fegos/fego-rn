# Icon 的使用

## 一、加载字体文件

### ios 工程加载字体文件
1. 把字体文件 ttf 放在 ios 工程里：`ios` -> `项目名` 文件夹下
2. 在 xcode 里修改文件夹里的 info.plist 文件，新增一项：Fonts provided by application, 填写字体文件名称加后缀
3. 前往 `TARGETS -> Build Phases -> Copy Bundle Resources` 中添加字体文件即可


### android 工程加载字体文件
1. 把字体文件放在 `android->app->src->main->asset->font` 文件夹下，若无文件夹，可以自行新建
2. 在 `android->app->src->main->java->MainActivity` 里加入如下代码
```js
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Typeface tf = Typeface.createFromAsset(getAssets(), "font/FontName.ttf");
    ReactFontManager.getInstance().setTypeface("FontName", 0, tf);
}
```

同时加入相关引用类，eg: Bundle、ReactFontManager 等，做法就是选中相应类然后 `alt`+`enter` 选择 `import class`

## 配置字体文件
- 需自行维护 FontName.json 文件，例如：`demo/app/config/font/` 文件夹下的 `entypo.json` 和 `FontAwesome.json`
- 初始化 Icon 组件
	```js
	Icon.setFamily({
		FontName: require('path/to/FontName.json'),
	})
	Icon.defaultProps.family = 'FontName';
	```

## 使用

```jsx
import { Icon } from 'fego-rn';

<Icon name='user' />
<Icon name='glass' color="#398812" />
<Icon name='music' style={{ color: "#EE0000" }} />
<Icon name='heart' color="#000" style={{ color: "#E00", fontSize: 20 }}  />
<Icon name='search' style = {{
	color: '#993311',
	fontSize: 30,
	padding: 10
}} />
<Icon name='check' size={40} family='entypo'>
	<Text style={{ fontSize: 38, paddingLeft: 10 }}>checkbox</Text>
</Icon>
<Icon name='angle-right' size={40} />
```