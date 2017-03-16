'use strict';

let form = {
  /**
   * Switch 开关
   * @param {DOM} target 开关组件所在父元素
   * @param {Function} cb_success 开启后回调函数
   * @param {Function} cb_fail 关闭后回调函数
   */

  switch: (target, cb_success, cb_fail) => {
    let switchWrapper = document.createElement('div');

    switchWrapper.classList.add('switch-wrapper');
    switchWrapper.classList.add('cancel');

    switchWrapper.innerHTML = `<div class="circle circle-cancel"></div>`;
    switchWrapper.addEventListener('click', function() {
      let circle = this.querySelector('.circle');

      if(circle.classList.contains('circle-cancel')){
        // 关闭到开启
        this.className = 'switch-wrapper confirm';
        circle.className = 'circle circle-confirm';
        cb_success();
      }else{
        // 开启到关闭
        this.className = 'switch-wrapper cancel';
        circle.className = 'circle circle-cancel';
        cb_fail();
      }
    });

    target.appendChild(switchWrapper);

  }
}


export default form;
