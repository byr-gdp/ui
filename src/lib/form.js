'use strict';
import './../style/form/form-style';

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
  },

  /**
   * Date Picker 日期选择器
   * Note: 目前只考虑起始时间为今天。年月无法自定义，只能由当前日期逐次修改。
   * @param {HTMLElement} target 日期选择器所附属节点
   * @param {Function} cb_confirm 选择日期后的回调
   */

  datepicker: (target, cb_confirm) => {
    const tpl = `
                <div class='datepicker-wrapper'>
                  <input type='text' class='datepicker-result'/>
                  <div class='datepicker-container'>
                    <div class='datepicker-header'>
                      <span class='icon icon-double-arrow-left' data-type='prevYear'></span>
                      <span class='icon icon-arrow-left' data-type='prevMonth'></span>
                      <span class='cur-date'></span>
                      <span class='icon icon-arrow-right' data-type='nextMonth'></span>
                      <span class='icon icon-double-arrow-right' data-type='nextYear'></span>
                    </div>
                    <div class='datepicker-body'>
                      <div class='week-header'>
                        <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                      </div>
                      <div class='week-detail'>
                      </div>
                    </div>
                  </div>
                </div>
                `;
    target.innerHTML = tpl;

    const datepickerResult = target.querySelector('.datepicker-result');
    datepickerResult.addEventListener('focus', (e) => {
      e.target.nextElementSibling.classList.add('active');
    });

    // datepickerResult.addEventListener('blur', (e) => {
    //   e.target.nextElementSibling.classList.remove('active');
    // });

    const calculateDays = (year, month) => {
      const totalDays = 35; // 一共显示 35 天
      // const month = today.getMonth(); // index from 0
      // const year = today.getFullYear();
      const totalDaysOfCurMonth = new Date(year, month + 1, 0).getDate(); // 当月天数
      const totalDaysOfLastMonth = new Date(year, month, 0).getDate();    // 上月天数
      const firstDayOfCurMonth = new Date(year, month, 1).getDay();       // 当月第一天星期几
      const prevDays = firstDayOfCurMonth;                                // 当月前需要补充的天数
      const afterDays = totalDays - totalDaysOfCurMonth - prevDays;

      const today = new Date(year, month);
      const curYear = today.getFullYear();
      const curMonth = today.getMonth();

      console.log(curYear, curMonth);

      const showDate = target.querySelector('.cur-date');
      showDate.innerText = `${curYear}年，${curMonth + 1}月`;

      console.info(`本月一共有${totalDaysOfCurMonth}天`);
      console.info(`本月第一天星期${firstDayOfCurMonth}`);
      console.info(`上月一共有${totalDaysOfLastMonth}天`);
      console.info(`本月前补充${prevDays}天`);
      console.info(`本月后补充${afterDays}天`);

      // 日期显示五周
      // 指定月份含有多少天
      // 指定月份第一天星期几，并补全之前几天，计算上月一共多少天
      // 指定月份最后一天星期几，并补全之后几天

      const weekDetail = target.querySelector('.week-detail');
      let monthTpl = `<div class='line'>`;

      for (let i = 0; i < totalDays; i++) {
        if (i % 7 === 0 && i !== 0) {
          monthTpl += `</div><div class='line'>`
        }
        if (i < prevDays) {
          monthTpl += `<span class='week-item disabled'>${totalDaysOfLastMonth - prevDays + i + 1}</span>`
        } else if (i < prevDays + totalDaysOfCurMonth) {
          monthTpl += `<span class='week-item'>${i - prevDays + 1}</span>`
        } else {
          monthTpl += `<span class='week-item disabled'>${i - prevDays - totalDaysOfCurMonth + 1}</span>`
        }
      }

      monthTpl += `</div>`;
      weekDetail.innerHTML = monthTpl;
    }

    // 初始化日期
    const today = new Date();
    let curYear = today.getFullYear();
    let curMonth = today.getMonth();

    calculateDays(curYear, curMonth);

    // 更新日期
    const datepickerHeader = target.querySelector('.datepicker-header');
    datepickerHeader.addEventListener('click', (e) => {
      if (e.target.dataset.type !== 'undefined') {
        switch (e.target.dataset.type) {
          case 'prevYear': curYear--; break;
          case 'prevMonth': curMonth--; break;
          case 'nextMonth': curMonth++; break;
          case 'nextYear': curYear++; break;
        }

        calculateDays(curYear, curMonth);
      }
    });

    // 选择日期
    const datepickerBody = target.querySelector('.datepicker-body');
    datepickerBody.addEventListener('click', (e) => {
      console.log(e.target.innerText);
      if (!e.target.classList.contains('disabled')) {
        datepickerResult.value = new Date(curYear, curMonth, e.target.innerText).toLocaleDateString();
        e.target.offsetParent.classList.remove('active');
      }
    });
  },

  /**
   * Cascader 级联选择器
   * Note: 目前不考虑动态加载次级选项，所有选项载入前已经确定
   * @param {HTMLElement} target 级联选择器所附属节点
   * @param {Array} source 级联选择数据
   * source 数据结构如下所致
    [
      {
        name: '1',
        children: [
          {
            name: '1.1',
            children: []
          },
          {
            name: '1.2',
            children: [
              {
                name: '1.2.1'
                children: []
              }
            ]
          }
        ]
      },
      {
        name: '2',
        children: []
      }
    ]
   */
  cascader: (target, source) => {
    const tpl = `
                  <input type='text' class='cascader-result'>
                  <div class='cascader-wrapper'></div>
                `;

    target.innerHTML = tpl;

    const wrapper = target.querySelector('.cascader-wrapper');
    const cascaderResult = target.querySelector('.cascader-result');
    let cascaderTpl = `<div class='cascader-column' data-deep=1>`;
    let deep = 0;

    source.forEach((item, index) => {
      cascaderTpl += `<div class='cascader-item' data-children=${JSON.stringify(item.children)} data-deep=${deep + 1}>
          ${item.name}
        </div>`;
    });

    cascaderTpl += '</div>';
    wrapper.innerHTML = cascaderTpl;

    const mouseoverHandler = (e) => {
      if (e.target.classList.contains('cascader-item')) {
        const children = JSON.parse(e.target.dataset.children);
        const deep = parseInt(e.target.dataset.deep);
        const leftBase = 100 - 1;

        // 清除除当前 deep 以外的 cascaderColumn
        const columns = target.querySelectorAll('.cascader-column');
        columns.forEach(item => {
          if (item.dataset.deep > deep) {
            item.remove();
          }
        });

        // 继续展开
        if (children.length > 0) {
          let docfrag = document.createDocumentFragment();
          let cascaderTpl = '';
          let cascaderColumn = document.createElement('div');
          cascaderColumn.dataset.deep = deep + 1;
          cascaderColumn.classList.add('cascader-column');

          children.forEach((item, index) => {
            cascaderTpl += `<div class='cascader-item' data-children=${JSON.stringify(item.children)} data-deep=${deep + 1}>
                ${item.name}
              </div>`;
          });

          cascaderColumn.innerHTML = cascaderTpl;
          cascaderColumn.style.left = deep * leftBase + 'px';
          docfrag.appendChild(cascaderColumn);
          wrapper.appendChild(docfrag);
        }
      }
    }
    const clickHandler = (e) => {
      if (e.target.classList.contains('cascader-item') && JSON.parse(e.target.dataset.children).length === 0) {
        cascaderResult.value = e.target.innerText;
        wrapper.classList.remove('active');
      }
    }
    const mouseleaveHandler = (e) => {
      // 清除除第一层以外 cascaderColumn
      const columns = target.querySelectorAll('.cascader-column');
      columns.forEach(item => {
        if (item.dataset.deep > 1) {
          item.remove();
        }
      });
    }

    const focusHandler = (e) => {
      console.log('focus');
      console.log(e.target.nextElementSibling.classList);
      if (!e.target.nextElementSibling.classList.contains('active')) {
        e.target.nextElementSibling.classList.add('active');
      }
    }

    wrapper.addEventListener('mouseover', mouseoverHandler);
    wrapper.addEventListener('mouseleave', mouseleaveHandler);
    wrapper.addEventListener('click', clickHandler);
    cascaderResult.addEventListener('focus', focusHandler);
  },
}

export default form;
