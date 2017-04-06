import './../style/notice/notice.css';
// notice 相关

// alertBox 用于容纳多个 alert DOM
let alertBox = document.createElement('div');
alertBox.classList.add('alert-box');
document.body.append(alertBox);

// loading DOM，全局维护一个实例
let loadingIns = null;

let notice = {

  /**
  * Alert
  * @param {String} title
  * @param {String} type success/warning/info/error
  */
  alert: (title, type) => {
    if(typeof title === 'undefined' || title.toString().trim().length === 0){
      throw new Error('title 不能为空或未定义');
    }

    switch(type){
      case 'success':
      case 'warning':
      case 'error':
        break;
      default:
        type = 'info';
    }

    let dom = document.createElement('div');
    dom.className = `alert-wrapper alert-${type} alert-wrapper-hide`;
    let tpl =
        `<span class="alert-title">${title}</span>
          <span class="close-text">关闭</span>`

    // 通过 DOMParser 解析 html 片段样式不能生效，http://krasimirtsonev.com/blog/article/Convert-HTML-string-to-DOM-element
    // let parser = new DOMParser();
    // let el = parser.parseFromString(tpl, 'text/xml').firstChild;
    // document.body.append(el);

    dom.innerHTML = tpl;
    alertBox.insertBefore(dom, alertBox.firstChild);

    setTimeout(() => {
      dom.classList.remove('alert-wrapper-hide');
    }, 0);

    dom.addEventListener('click', (e) => {
      if(e.target.className === 'close-text'){
        dom.classList.add('alert-wrapper-hide');
        setTimeout(() => {
          dom.remove();
        }, 500);
      }
    })
  },

  /**
   * Loading：思考如何采用单例模式，全局只有一个 loading 实例。
   * @param {HTMLElement} target loading 需要覆盖的 DOM
   * @param {String} text
   * @param {Boolean} fullscreen 是否全屏覆盖
   */
  loading: (target, text, fullscreen) => {
    // 两部分组成：一个遮罩层、一个信息层
    if(typeof target === 'undefined' || target === null){
      target = document.body;
    }

    if(typeof text === 'undefined' || text.toString().trim().length === 0){
      text = '拼命加载中';
    }

    if(fullscreen === true){
      dom.style.width = window.innerWidth + 'px';
      dom.style.height = window.innerHeight + 'px';
    }

    let dom = null;
    if(loadingIns === null){
      dom = document.createElement('div');
    }else{
      dom = loadingIns;
    }

    let tpl =
      `<div class="loading-mask"></div>
        <div class="loading-text">
          <i class="icon-loading"></i>
          <div class="loading-text-detail">${text}</div>
        </div>`

    dom.className = 'loading-wrapper';
    dom.innerHTML = tpl;
    // 判断 target position，若为 static，设置为 relative，否则不变
    if(window.getComputedStyle(target).position === 'static'){
      target.style.position = 'relative';
    }
    target.append(dom);
    loadingIns = dom;
  },

  hideLoading: () => {
    if(loadingIns !== null){
      loadingIns.remove();
    }
  },

  /**
   * Toast，模拟微信小程序 showToast 效果
   * QUESTION: 连续两次调用 toast 效果如何处理？
   * @param {String} text
   * @param {String} type default/success/loading/error, default(缺省)表示无任何 icon
   * @param {Number} duration 单位毫秒，暂不考虑
   */

  toast: (text, type) => {
    if(typeof type !== 'undefined'){
      switch(type){
        case 'success':
        case 'loading':
        case 'error':
          break;
        default:
          type = 'default'
      }
    }else{
      type = 'default';
    }

    if(typeof text === 'undefined' || text.toString().length === 0){
      throw new Error('invalid param text');
    }

    // let box = document.querySelector('.toast-wrapper')
    // if(box === null){
    //   box = document.createElement('div');
    //   box.classList.add('toast-wrapper');
    // }

    let prevBox = document.querySelector('.toast-wrapper');
    let box = document.createElement('div');

    box.classList.add('toast-wrapper');
    box.innerHTML =
      `
        <div class='icon icon-${type}'></div>
        <div class='toast-text'>${text}</div>
      `;

    if(prevBox !== null){
      prevBox.remove();
    }
    document.body.append(box);
  },

  /**
   * messageBox: 消息弹框，目前一切从简，只有确认后回调
   * QUESTION: 如何禁止滚动
   * @param {String} title 弹框标题
   * @param {String} message 弹框内容
   * @param {Function} cb 弹框确认成功后回调
   */
  messageBox: (title, message, cb) => {
    let render = (title, message) => {
      return `
              <div class="message-box-mask"></div>
              <div class="message-box-container">
                <div class="message-title">${title}</div>
                <div class="message-content">${message}</div>
                <div class="message-operation">
                  <button class="btn-cancel">取消</button>
                  <button class="btn-confirm">确定</button>
                </div>
              </div>
            `
    };

    let messageBox = document.querySelector('.message-box-wrapper');
    if(messageBox === null){
      messageBox = document.createElement('div');
      messageBox.classList.add('message-box-wrapper');
    }

    messageBox.innerHTML = render(title, message);

    let box = messageBox.querySelector('.message-box-container');
    let mask = messageBox.querySelector('.message-box-mask');
    messageBox.addEventListener('click', function(e){
      if(e.target.tagName.toLowerCase() === 'button' || e.target.classList.contains('message-box-mask')){
        if(e.target.classList.contains('btn-confirm')){
          cb();
        }
        box.classList.remove('enter');
        box.classList.add('leave');
        mask.classList.add('hide');
        setTimeout(() => {
          messageBox.remove();
        }, 500);
      }
    });

    document.body.append(messageBox);
    box.classList.add('enter');
  },
  /**
   * Notify: 消息通知，3s 自动关闭，分为 info success waring error 四种状态
   * TODO: API 调用方式有待改进，期望 notify.success() 的形式，而非 notify('success',...)
   * @param {String} type 类型
   * @param {String} title 标题
   * @param {String} message 消息内容
   */
  notify: (type, title, message) => {
    let notifyBox = document.querySelector('.notify-box');
    let topValue = 10;
    const notifyItems = document.querySelectorAll('.notify-item');

    notifyItems.forEach((item) => {
      if(item.style.top.length !== 0){
        let top = parseInt(item.style.top.slice(0, -2)) + 10 + parseInt(item.offsetHeight);
        topValue = (top > topValue) ? top : topValue;
      }
    })

    if(notifyBox === null){
      notifyBox = document.createElement('div');
      notifyBox.classList.add('notify-box');
      document.body.append(notifyBox);
    }

    let updatePosition = () => {
      let leftNotifyItems = document.querySelectorAll('.notify-item');
      leftNotifyItems.forEach((item, index) => {
        if(index === 0){
          // TODO: 10px 硬编码替换
          item.style.top = '10px';
        }else{
          item.style.top = parseInt(leftNotifyItems[index - 1].style.top.slice(0, -2)) + 10 + parseInt(leftNotifyItems[index - 1].offsetHeight) + 'px';
        }
      });
    }

    // 创建一个新的 notify dom
    let notifyItem = document.createElement('div');
    notifyItem.classList.add('notify-item');
    notifyItem.innerHTML =
      `
        <div class="icon ${type}-icon"></div>
        <div class="notify-desc">
          <div class="notify-title">${title}</div>
          <div class="notify-content">${message}</div>
        </div>
      `;


    notifyItem.style.top = topValue + 'px';
    notifyBox.append(notifyItem);
    notifyItem.classList.add('enter');
    setTimeout(() => {
      notifyItem.classList.remove('enter');
      notifyItem.classList.add('leave');
      notifyItem.addEventListener('webkitAnimationEnd', () => {
        notifyItem.remove();
        updatePosition();
      });
    }, 3 * 1000);

    // 点击关闭处理
    // notifyItem.addEventListener('click', () => {
    //   notifyItem.classList.remove('enter');
    //   notifyItem.classList.add('leave');
    //   notifyItem.addEventListener('webkitAnimationEnd', () => {
    //     notifyItem.remove();
    //     updatePosition();
    //   });
    // });
  }
}

export default notice;
