# UI

一个简单的交互组件库。在线地址：[52byr.com](http://ui.52byr.com)。

## TODO

- basic

  - button √

- notice

  - alert √
  - loading √
  - toast √
  - messageBox √

- form

  - input ✘
  - switch √
  - slider（两种实现，pureCSS && JS）√
  - timepicker √
  - datepicker √
  - datetimepicker（待定）
  - rate（待定）
  - colorpicker（待定）
  - cascader 级联选择器 √

- others

  - dialog (可由目前的 messageBox 扩展，待定）
  - carousel：关于轮播图，参考 [你还在用轮播图吗 - 体验设计 - 腾讯 ISUX](https://isux.tencent.com/carousels.html)
    - 右往左 √
    - 左往右 √
    - 透明度切换 √
    - 手动左右切换
  - collapse ✘

## Dev

- `npm install`
- `npm run dev`
- visit http://127.0.0.1:8082/dist/

## Demo Deploy

- 项目根目录下执行 `npm run build`。
- 将 dist 目录下 index.html、index.js 放在 HTTP Server 目录即可。
