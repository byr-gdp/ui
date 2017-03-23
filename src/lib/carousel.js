'use strict';
import './../style/carousel/carousel.styl';

/**
 * Carousel: 无限循环轮播图
 * 目前方案是：从右向左滑动，覆盖住之前的图。被覆盖的图始终不动。
 * @param {HTMLElement} target 轮播图附属节点，需要设置宽高
 * @photoArr {Array} photoArr 数组形式存储图片 url 地址
 */
const carousel = (target, photoArr) => {
  const wrapper = document.createElement('div');

  wrapper.classList.add('carousel-wrapper');
  target.appendChild(wrapper);

  let tpl = '';

  photoArr.forEach((item, index) => {
    if (index === 0) {
      tpl += `<div class='carousel-item photo-${index} center'></div>`;
    } else {
      tpl += `<div class='carousel-item photo-${index}'></div>`;
    }
  });

  wrapper.innerHTML = tpl;


  const len = photoArr.length; // 3
  const init = 1;

  const play = (init) => {
    const onTransitionEnd = (e) => {
      last.classList.remove('left');
      last.classList.remove('active');
      init = ++init % len;
      first.removeEventListener('transitionend', onTransitionEnd);
      play(init);
    }

    let last = document.querySelector(`.photo-${(init - 1 + len) % len}`);
    let first = document.querySelector(`.photo-${init}`);

    first.addEventListener('transitionend', onTransitionEnd);
    // 触发动画
    // http://stackoverflow.com/questions/25900479/why-is-settimeout-needed-when-applying-a-class-for-my-transition-to-take-effect

    // setTimeout(() => {
    //   first.classList.add('active');
    //   first.classList.add('center');
    //   last.classList.add('active');
    //   last.classList.remove('center');
    //   last.classList.add('left');
    // }, 0)

    window.requestAnimationFrame(() => {
      first.classList.add('active');
      first.classList.add('center');
      last.classList.add('active');
      last.classList.remove('center');
      last.classList.add('left');
    });
  }

  play(1);
}

export default carousel;
