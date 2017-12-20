---
title: Tag
subTitle: 标签
---
# 标签
### 组件描述
- 可选择，可关闭的标签元素
### 示例代码
```html
<Tag>普通Tag</Tag>
<Tag defaultSelected>默认已选Tag</Tag>
<Tag disabled>禁用Tag</Tag>
<Tag onClose={()=>doSomething()}>禁用Tag</Tag>
<Tag onChange={()=>doSomething()}>禁用Tag</Tag>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| type | 主题类型 | string | default |
| size | 尺寸 | string | 可选择small,large |
| text | 标签显示的文本 | - | - |
| children | 标签显示的文本，使用时 text 属性失效 | - | - |
| selected | 是否选择 | boolean | false |
| defaultSelected | 是否默认选择 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| closed | 是否可以关闭 | boolean | false |
| onClose | 关闭后的回调 | func | |
| onChange | 点击后的回调 | func | |
| closeIconName | 关闭按钮图标名称 | string | |
| closeIconFamily | 关闭按钮图标字体库 | string | |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | Tag容器样式 | View |
| text | Tag文本样式 | Text |
| textSelected | 已选Tag文本样式 | Text |
| textDisabled | 禁用Tag文本样式 | Text |
