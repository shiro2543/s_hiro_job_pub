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

dom_test.addEventListener('mousedown',mouseDownOnTest);

function mouseDownOnTest(e) {
  console.log('mouseDownOnTest(): called.');
  
  //ドラッグスタート位置の初期化
  if(e.target.drag_start ===undefined) {
    e.target.drag_start = {};
  }
  e.target.drag_start.left_num = px2num(e.target.style.left);
  e.target.drag_start.top_num = px2num(e.target.style.top);
  e.target.drag_start.page_x = e.pageX;
  e.target.drag_start.page_y = e.pageY;
  e.target.drag_status = 'down';
  
  //リスナを削除
  e.target.removeEventListener('mousedown', mouseDownOnTest);
  
  //リスナを追加(動く場合)
  e.target.addEventListener('mousemove', draggingOnTest);
  
  //リスナを追加(クリックの場合)
  e.target.addEventListener('mouseup', clickUp);
}

function clickUp(e) {
  console.log('clickUp(): called.');
  e.target.drag_status = 'clickup';
  e.target.removeEventListener('mousemove',draggingOnTest);
  e.target.removeEventListener('mouseup',clickUp);
  e.target.addEventListener('mousedown',mouseDownOnTest);
}

function draggingOnTest(e) {
  console.log('draggingOnTest(): called.');
  
  //クリックの場合のリスナが残っていたら削除し、ドラッグ終了時のリスナを追加する
  if(e.target.drag_status !== 'moving') {
    e.target.removeEventListener('mouseup', clickUp);
    e.target.addEventListener('mouseup', dragEndOnTest);
  }
  e.target.drag_status = 'moving';
  
  let move_x = e.pageX - e.target.drag_start.page_x;
  let move_y = e.pageY - e.target.drag_start.page_y;
  e.target.style.left = (e.target.drag_start.left_num + move_x) + 'px';
  e.target.style.top = (e.target.drag_start.top_num + move_y) + 'px';
}

function dragEndOnTest(e) {
  console.log('dragEndOnTest(): called.');
  e.target.removeEventListener('mousemove', draggingOnTest);
  e.target.removeEventListener('mouseup', dragEndOnTest);
  e.target.addEventListener('mousedown',mouseDownOnTest);
  e.target.drag_start.left_num = px2num(e.target.style.left);
  e.target.drag_start.top_num = px2num(e.target.style.top);
  e.target.drag_start.page_x = null;
  e.target.drag_start.page_y = null;
}

