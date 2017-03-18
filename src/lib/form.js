'use strict';

let form = {
  /**
   * Switch 开关
   * @param {HTMLElement} target 开关组件所在父元素
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

  },

  /**
   * Slider 滑块
   * @param {HTMLElement} target 滑块所附属节点
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @param {Function} cb_change 拖动滑块后回调
   */
  slider: (target, min, max, cb_change) => {
    const tpl = `
                <div class='slider-default'>
                  <div class='slider-overlay'></div>
                  <div class='slider-point'></div>
                </div>
                `;

    target.innerHTML = tpl;

    const point = document.querySelector('.slider-point');
    const overlay = document.querySelector('.slider-overlay');
    const dft = document.querySelector('.slider-default');
    const dftBegin = dft.offsetLeft;
    const dftWidth = dft.offsetWidth;
    const dftEnd = dftBegin + dftWidth;
    const halfPointWidth = point.clientWidth / 2;

    const onMove = (e) => {
      if (e.clientX < dftBegin) {
        overlay.style.width = 0;
        point.style.left = (0 - halfPointWidth) + 'px';
      } else if (e.clientX > dftEnd) {
        overlay.style.width = dftWidth + 'px';
        point.style.left = (dftWidth - halfPointWidth) + 'px';
      } else {
        overlay.style.width = (e.clientX - dftBegin) + 'px';
        point.style.left = (e.clientX - dftBegin - halfPointWidth) + 'px';
      }
      cb_change();
    }

    const onDown = (e) => {
      if (e.type === 'mousedown' && (e.target.classList.contains('slider-default') || e.target.classList.contains('slider-overlay') || e.target.classList.contains('slider-point'))) {
        cb_change();
        onMove(e);
        window.addEventListener('mousemove', onMove);
     }
    }

    window.addEventListener('mousedown', onDown);

    window.addEventListener('mouseup', (e) => {
      window.removeEventListener('mousemove', onMove);
    });

    return {
      getValue: () => {
        return overlay.clientWidth / dft.clientWidth * (max - min)
      },
      setValue: (newVal) => {
        let finalNewVal;

        if (newVal < min) {
          finalNewVal = 0;
        } else if (newVal > max) {
          finalNewVal = max;
        } else {
          finalNewVal = newVal
        }

        overlay.style.width = ((finalNewVal - min) / (max - min) * dftWidth) + 'px';
        point.style.left = (((finalNewVal - min) / (max - min) * dftWidth) - halfPointWidth) + 'px';
      }
    }
  }
}

export default form;
