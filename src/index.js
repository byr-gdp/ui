import './style/notice/notice.css';
import './style/form/form-style';
import './style/basic/basic-style';

import notice from './lib/notice';
import form from './lib/form';
import carousel from './lib/carousel';

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
    name: '1',
    children: [
      {
        name: '1.1',
        children: [
          {
            name: '1.1.1',
            children: []
          }
        ]
      },
      {
        name: '1.2',
        children: []
      },
      {
        name: '1.3',
        children: [
          {
            name: '1.3.1',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: '2',
    children: [
      {
        name: '2.1',
        children: []
      },
      {
        name: '2.2',
        children: []
      },
      {
        name: '2.3',
        children: []
      },
    ]
  },
  {
    name: '3',
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
carousel(document.querySelector('.eg-carousel'), [0, 1, 2]);
