//script.js

//※注意: domはabsoluteであることが前提

function px2num(px) {
  return Number(px.replace('px',''));
}

function setStyleFromCSS(dom, style_tag) {
  dom.style[style_tag] = window.getComputedStyle(dom, null).getPropertyValue(style_tag);
}

//テスト用dom
let dom_test = document.querySelector('#test');

//domのstyleにcssで設定されている値と同じ値を設定
let css_styles = ['left', 'top', 'width', 'height'];
for(let i=0;i<css_styles.length;i++) {
  setStyleFromCSS(dom_test, css_styles[i]);
}

//クリックイベントのテスト
//マウスダウンやマウスアップと被るか？
//クリックだけ発生させることは可能か？
//dom_test.addEventListener('click', clickOnTest);

dom_test.addEventListener('mousedown',dragStartOnTest);

function clickOnTest(e) {
  console.log('click event occurred.');
}

function dragStartOnTest(e) {
  console.log('dragStartOnTest(): called.')
  //ドラッグスタート位置の初期化
  if(e.target.drag_start ===undefined) {
    e.target.drag_start = {};
  }
  e.target.drag_start.left_num = px2num(dom_test.style.left);
  e.target.drag_start.top_num = px2num(dom_test.style.top);
  e.target.drag_start.page_x = e.pageX;
  e.target.drag_start.page_y = e.pageY;
  
  //リスナを削除
  e.target.removeEventListener('mousedown', dragStartOnTest);
  
  //リスナを追加
  e.target.addEventListener('mousemove', draggingOnTest);
  e.target.addEventListener('mouseup', dragEndOnTest);
}

function draggingOnTest(e) {
  console.log('draggingOnTest(): called.');
  let move_x = e.pageX - e.target.drag_start.page_x;
  let move_y = e.pageY - e.target.drag_start.page_y;
  e.target.style.left = (e.target.drag_start.left_num + move_x) + 'px';
  e.target.style.top = (e.target.drag_start.top_num + move_y) + 'px';
}

function dragEndOnTest(e) {
  console.log('dragEndOnTest(): called.');
  e.target.removeEventListener('mousemove', draggingOnTest);
  e.target.removeEventListener('mouseup', dragEndOnTest);
  e.target.addEventListener('mousedown',dragStartOnTest);
}

