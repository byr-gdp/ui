import './style/notice/notice.css';
import './style/form/form-style';
import './style/basic/basic-style';

import notice from './lib/notice';
import form from './lib/form';

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
