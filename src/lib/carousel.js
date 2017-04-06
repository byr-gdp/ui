'use strict';
import './../style/carousel/carousel.styl';

/**
 * Carousel: 无限循环轮播图
 * @param {HTMLElement} target 轮播图附属节点，需要设置宽高
 * @param {Array} photoArr 数组形式存储图片 url 地址
 * @param {String} type 目前考虑四种类型，自右向左（toLeft）、自左向右（toRight）、淡入淡出（fadeInOut）、手动切换（缺省）
 */
const carousel = (target, photoArr, type) => {
  const wrapper = document.createElement('div');
  const len = photoArr.length; // 3
  let tpl = '';
  let initClass = '';

  switch (type) {
    case 'toLeft': initClass = 'right'; break;
    case 'toRight': initClass = 'left'; break;
    case 'fadeInOut': initClass = 'center hide'; break;
    default: initClass = 'right';
  }

  wrapper.classList.add('carousel-wrapper');
  photoArr.forEach((item, index) => {
    if (index === 0) {
      tpl += `<img class='carousel-item  photo-${index} active center' src='${photoArr[index]}'/>`
    } else {
      tpl += `<img class='carousel-item photo-${index} active ${initClass}' src='${photoArr[index]}'/>`
    }
  });

  wrapper.innerHTML = tpl;
  target.appendChild(wrapper);

  // 自右向左
  const playToLeft = (init) => {
    let last = target.querySelector(`.photo-${(init - 1 + len) % len}`);
    let first = target.querySelector(`.photo-${init}`);

    const onTransitionEnd = (e) => {
      last.classList.remove('left');
      last.classList.add('right');
      last.classList.remove('active');
      init = (init += 1) % len;
      first.removeEventListener('transitionend', onTransitionEnd);
      playToLeft(init);
    }

    first.addEventListener('transitionend', onTransitionEnd);
    // 触发动画
    // http://stackoverflow.com/questions/25900479/why-is-settimeout-needed-when-applying-a-class-for-my-transition-to-take-effect
    window.requestAnimationFrame(() => {
      first.classList.add('active');
      first.classList.remove('right')
      first.classList.add('center');
      last.classList.add('active');
      last.classList.remove('center');
      last.classList.add('left');
    });
  }

  // 自左向右
  const playToRight = (init) => {
    const last = target.querySelector(`.photo-${(init - 1 + len) % len}`);
    const cur = target.querySelector(`.photo-${init}`);

    const onTransitionEnd = (e) => {
      last.classList.remove('active');
      last.classList.remove('right');
      last.classList.add('left');
      init = (init += 1) % len;
      cur.removeEventListener('transitionend', onTransitionEnd);
      playToRight(init);
    }

    cur.addEventListener('transitionend', onTransitionEnd);
    window.requestAnimationFrame(() => {
      cur.classList.add('active');
      cur.classList.remove('left')
      cur.classList.add('center');
      last.classList.add('active');
      last.classList.remove('center');
      last.classList.add('right');
    });
  }

  // 淡入淡出效果
  const playFadeInOut = (init) => {
    const last = target.querySelector(`.photo-${(init - 1 + len) % len}`);
    const cur = target.querySelector(`.photo-${init}`);

    const onTransitionEnd = (e) => {
      init = (init += 1) % len;
      cur.removeEventListener('transitionend', onTransitionEnd);
      playFadeInOut(init);
    }

    cur.addEventListener('transitionend', onTransitionEnd);
    window.requestAnimationFrame(() => {
      cur.classList.remove('hide');
      last.classList.add('hide');
    });
  }

  // 缺省效果：手动切换
  const playDefault = () => {
    let curIdx = 0;
    let isTransitionEnd = true;
    const len = photoArr.length;
    const dfg = document.createDocumentFragment();
    const prev = document.createElement('div');
    const next = document.createElement('div');

    prev.classList.add('prev');
    prev.innerText = 'prev';
    next.classList.add('next');
    next.innerText = 'next';
    dfg.appendChild(prev);
    dfg.appendChild(next);
    wrapper.appendChild(dfg);

    wrapper.addEventListener('transitionstart', () => {
      console.log('start');
    });

    wrapper.addEventListener('transitionend', () => {
      console.log('end');
      isTransitionEnd = true;
    });

    const updateOperation = () => {
      if (curIdx === 0) {
        prev.style.display = 'none';
        next.style.display = 'block';
      } else if (curIdx === len - 1) {
        next.style.display = 'none';
        prev.style.display = 'block';
      } else {
        next.style.display = 'block';
        prev.style.display = 'block';
      }
    }

    const onNextHandler = () => {
      // 当前图不是最后一张
      if (curIdx + 1 < len && isTransitionEnd) {
        const nextPhoto = target.querySelector(`.photo-${curIdx + 1}`);
        const curPhoto = target.querySelector(`.photo-${curIdx}`);

        isTransitionEnd = false;
        nextPhoto.classList.remove('right');
        nextPhoto.classList.add('center');
        curPhoto.classList.remove('center');
        curPhoto.classList.add('left');
        curIdx += 1;
        updateOperation();
      }
    }

    const onPrevHandler = () => {
      // 当前图不是第一张
      if (curIdx > 0 && isTransitionEnd) {
        const prevPhoto = target.querySelector(`.photo-${curIdx - 1}`);
        const curPhoto = target.querySelector(`.photo-${curIdx}`);

        isTransitionEnd = false;
        prevPhoto.classList.remove('left');
        prevPhoto.classList.add('center');
        curPhoto.classList.remove('center');
        curPhoto.classList.add('right');
        curIdx -= 1;
        updateOperation();
      }
    }

    next.addEventListener('click', onNextHandler);
    prev.addEventListener('click', onPrevHandler);
    updateOperation();
  }

  // 第一张移动的图片应该索引为 1，索引为 0 初始状态即出现。
  if (type === 'toLeft') {
    playToLeft(1);
  } else if (type === 'toRight') {
    playToRight(1);
  } else if (type === 'fadeInOut') {
    playFadeInOut(1);
  } else {
    playDefault();
  }
}

export default carousel;
