---
title: ActivityIndicator
subTitle: 活动指示器 
---

# 活动指示器

### 组件描述
- 活动指示器

### 示例代码

```html
<ActivityIndicator />
<ActivityIndicator color="#33F" text="正在加载" />
<ActivityIndicator size="large" />
<ActivityIndicator text="正在加载" />
<ActivityIndicator size="large" color="#FFF"/>
<ActivityIndicator size="large" color="#F22" text="正在加载" />
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| visible | 是否显示指示器 | boolean | true |
| color | 指示器颜色 | string | #999 |
| size | 指示器大小 | string | small |
| text | 指示器显示文本内容 | string | - |

### 样式对象styles

属性 | 说明 | 适用类型
----|-----|------
| container | 容器样式 | View |
| text | 文本样式 | Text |