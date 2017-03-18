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
  },

  /**
   * Time Picker 时间选择器
   * Note: 若传入 step，则会计算出所有可选时间项；若不传 step，则可以任意选择小时和分钟
   * @param {HTMLElement} target 时间选择器所附属节点
   * @param {Number} from 开始时间，单位小时（24小时制）
   * @param {Number} to 结束时间，单位小时（24小时制）
   * @param {Number} step 间隔，单位分钟，非必须
   */

  timepicker: (target, from, to, step) => {
    if (typeof step !== 'undefined') {
      const tpl = `
                  <div class='timepicker-wrapper'>
                    <input type='text' class='timepicker-result'>
                    <div class='timepicker-list-wrapper'>
                      <ul class='timepicker-list'></ul>
                    </div>
                  </div>
                  `;
      target.innerHTML = tpl;

      const list = target.querySelector('.timepicker-list');
      const result = target.querySelector('.timepicker-result');
      let listTpl = '';

      let hour = from;
      let min = 0;


      while (1) {
        if (hour > to) {
          break;
        }

        listTpl += `<li class='timepicker-item'>${hour < 10 ? ('0' + hour) : hour}:${min < 10 ? ('0' + min) : min}</li>`;
        min += step;

        if (min >= 60) {
          hour++;
          min %= 60;
        }
      }

      list.innerHTML = listTpl;

      list.addEventListener('click', (e) => {
        if (e.target.classList.contains('timepicker-item')) {
          result.value = e.target.innerText;
          list.classList.remove('active');
        }
      });

      result.addEventListener('click', (e) => {
        if (!list.classList.contains('active')) {
          list.classList.add('active');
        }
      });
    } else {
      const tpl = `
                  <div class='timepicker-wrapper'>
                    <input type='text' class='timepicker-result'>
                    <div class='timepicker-list-wrapper'>
                      <ul class='timepicker-hour-list'></ul>
                      <ul class='timepicker-min-list'></ul>
                    </div>
                  </div>
                  `;
      target.innerHTML = tpl;

      const listWrapper = target.querySelector('.timepicker-list-wrapper');
      const hourList = target.querySelector('.timepicker-hour-list');
      const minList = target.querySelector('.timepicker-min-list');
      const result = target.querySelector('.timepicker-result');
      let hourListTpl = '';
      let minListTpl = '';
      let select = {
        hour: null,
        min: null
      }

      const updateResult = (select) => {
        const displayHour = select.hour || '';
        const displayMin = select.min || '';

        if (select.hour !== null && select.min !== null) {
          hourList.classList.remove('active');
          minList.classList.remove('active');
        }
        result.value = `${displayHour} : ${displayMin}`;
      }

      let hour = from;
      let min = 0;

      for (let i = from; i <= to; i++) {
        hourListTpl += `<li class='timepicker-item'>${i < 10 ? ('0' + i) : i}</li>`
      }

      for (let i = 0; i < 60; i++) {
        minListTpl += `<li class='timepicker-item'>${i < 10 ? ('0' + i) : i}</li>`
      }

      hourList.innerHTML = hourListTpl;
      minList.innerHTML = minListTpl;

      hourList.addEventListener('click', (e) => {
        if (e.target.classList.contains('timepicker-item')) {
          select.hour = e.target.innerText;
          updateResult(select);
        }
      });

      minList.addEventListener('click', (e) => {
        if (e.target.classList.contains('timepicker-item')) {
          select.min = e.target.innerText;
          updateResult(select);
        }
      });

      result.addEventListener('click', (e) => {
        hourList.classList.add('active');
        minList.classList.add('active');
      });
    }
  }
}

export default form;
