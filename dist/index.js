import { notice, form, carousel } from './../index.js';

let root = document.querySelector('#root');

form.switch(document.querySelector('.form-switch'), () => {
  notice.toast('开启成功', 'success')
}, () => {
  notice.toast('正在关闭', 'loading')
});

const rangeSlider = form.slider(document.querySelector('.eg-form-slider'), 0, 100, () => {
  console.log('changed');
});

form.timepicker(document.querySelector('.eg-timepicker'), 0, 22, 30);
form.timepicker(document.querySelector('.eg-timepicker-2'), 0, 22);
form.datepicker(document.querySelector('.eg-datepicker'));

// eg for cascader
const source = [
  {
    name: '指南',
    children: [
      {
        name: '设计原则',
        children: [
          {
            name: '一致',
            children: []
          },
          {
            name: '反馈',
            children: []
          },
          {
            name: '效率',
            children: []
          },
          {
            name: '可控',
            children: []
          }
        ]
      },
      {
        name: '导航',
        children: [
          {
            name: '侧向导航',
            children: []
          },
          {
            name: '顶部导航',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: '组件',
    children: [
      {
        name: 'Basic',
        children: []
      },
      {
        name: 'Form',
        children: []
      },
      {
        name: 'Data',
        children: []
      },
      {
        name: 'Notice',
        children: []
      },
      {
        name: 'Navigation',
        children: []
      },
      {
        name: 'Others',
        children: []
      },
    ]
  },
  {
    name: '资源',
    children: []
  }
]
form.cascader(document.querySelector('.eg-cascader'), source);

root.addEventListener('click', function(e){
  if(e.target.dataset.category === 'toast'){
    notice.toast(e.target.dataset.type, e.target.dataset.type);
  }else if(e.target.dataset.category === 'alert'){
    notice.alert(e.target.dataset.type, e.target.dataset.type);
  }else if(e.target.dataset.category === 'messageBox'){
    notice.messageBox('提示', '这是一个 messageBox', () => {
      notice.toast('You confirmed', 'success');
    });
  }else if(e.target.dataset.category === 'notify'){
    notice.notify(e.target.dataset.type, '提示', '这是一条不会关闭的消息');
    // 理想调用方式，以 success 为例：
    // notice.notify().success('提示', '这是一条成功的消息');
  }
});

// 轮播图
const photoArr = ['https://v2ex.assets.uxengine.net/avatar/3eb1/c847/28148_large.png', 'https://v2ex.assets.uxengine.net/avatar/0b05/e2f5/45395_large.png', 'https://v2ex.assets.uxengine.net/gravatar/cdc3b5746102b1b6b90917847f93724a', 'https://v2ex.assets.uxengine.net/avatar/82ad/5076/224475_large.png'];

carousel(document.querySelector('.eg-carousel'), photoArr, 'toLeft');
carousel(document.querySelector('.eg-carousel-2'), photoArr, 'toRight');
carousel(document.querySelector('.eg-carousel-3'), photoArr, 'fadeInOut');
carousel(document.querySelector('.eg-carousel-4'), photoArr);
