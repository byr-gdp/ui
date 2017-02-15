/**
 * 参照 Element UI API 设计
 */

(function(){
  let ui = {};

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
    }
  }

  ui.notice = notice;
  window.ui = ui;
})();
