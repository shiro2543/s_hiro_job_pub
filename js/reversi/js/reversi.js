//設定
const retry_num_per_turn = 3;
//<-何か変更可能な設定値をセットする場合はここに追加する

//改行
function addBrTag(parent) {
  parent.appendChild(document.createElement('br'));
}

//セレクタ取得
const tag_body = document.querySelector('body');
const tag_footer = document.querySelector('footer');
const tag_whole_board = document.querySelector('.whole_board');
const tag_msg_box = document.querySelector('.msg_box');

/*デバッグ用メッセージエリア*/
tag_body.insertBefore(tag_msg_box,tag_footer);

//デバッグ用メッセージ出力
const max_msg_count = 5;
function appendMsg(text) {
  let tag_msg = document.createElement('p');
  tag_msg.setAttribute('class','msg');
  tag_msg.textContent = text;
  if(tag_msg_box.childElementCount >= max_msg_count) {
    tag_msg_box.removeChild(tag_msg_box.firstChild);
  }
  tag_msg_box.appendChild(tag_msg);
  console.log(text);
}

//初期メッセージ
appendMsg('white to play.');

/*ボードデータ初期化*/
let board = [
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ],
  [
    [],[],[],[],[],[],[],[]
  ]
];

//ボードの端にいるか判定
function isEdge(w,h,direction_w, direction_h) {
  if((w===0&&direction_w===-1)||(w===7&&direction_w===1)||(h===0&&direction_h===-1)||(h===7&&direction_h===1)) {
    return true;
  } else {
    return false;
  }
}

/*---プレイ用関数群---*/

//コマの色を取得する
function getPieceColor(w,h) {
  if(board[w][h]['piece'].getAttribute('class').indexOf('white')!==-1) {
    return 'white';
  } else if(board[w][h]['piece'].getAttribute('class').indexOf('black')!==-1) {
    return 'black';
  } else {
    return 'empty';
  }
}

//逆の色を返す
function reverse_color(color) {
  if(color==='white') {
    return 'black';
  } else if(color==='black') {
    return 'white';
  }
}

//コマをセットする
function setPiece(color,w,h) {
  board[w][h]['piece'].setAttribute('class', 'piece absolute ' + color);
}

//コマを裏返す
function reversePiece(w,h) {
  let current_color = getPieceColor(w,h);
  let next_color = reverse_color(current_color);
  //appendMsg('reversePiece('+w+','+h+'): '+'current_color: '+current_color);
  //appendMsg('reversePiece('+w+','+h+'): '+'next_color: '+next_color);
  setPiece(next_color,w,h);
}

//再帰して隣をチェックを繰り返す
function gonext(color, w, h, d_w, d_h) {
  //appendMsg('gonext('+color+','+w+','+h+','+d_w+','+d_h+','+') called');
  if(isEdge(w,h,d_w,d_h)) {
    return false;
  }
  
  let next_color = getPieceColor(w+d_w,h+d_h);
  if(next_color==='empty') {
    //ひっくりかえせないことがわかった
    //appendMsg('empty detected: ('+(w+d_w)+','+(h+d_h)+')');
    return false;
  } else if(next_color===color) {
    //ひっくりかえせることがわかった
    reversePiece(w,h);
    return true;
  } else {
    if(gonext(color,w+d_w,h+d_h,d_w,d_h)) {
      //ひっくり返す
      appendMsg('reverse one piece !');
      reversePiece(w,h);
      return true;
    } else {
      //ひっくり返さない
      return false;
    }
  }
}

function play(color,w,h) {
  //appendMsg(' play('+color+',' + w + ',' + h +') called');
  if(getPieceColor(w,h)!=='empty') {
    appendMsg('piece already exist.');
    return false;
  }
  let reverse_enable = false;
  for(let d_w = -1;d_w<=1;d_w++) {
    for(let d_h = -1;d_h<=1;d_h++) {
      //appendMsg('gonext_first('+d_w+','+d_h+') calling');
      if(isEdge(w,h,d_w,d_h)) {
        continue;
      } else if(getPieceColor(w+d_w,h+d_h)===color) {
        continue;
      } else {
        reverse_enable = gonext(color,w,h,d_w,d_h)||reverse_enable;
      }
    }
  }
  if(reverse_enable) {
    setPiece(color,w,h);
    appendMsg('reversed!');
    return true;
  } else {
    appendMsg('failed...');
    return false;
  }
}

/*---ターン進行---*/
//終了条件: 双方が操作ミスをretry_num_per_turn以上連続してする
let white_missed = false;
let black_missed = false;

//ミスしたら呼ぶ
function miss(color) {
  if(color==='white') {
    white_missed = true;
  } else if(color==='black') {
    black_missed = true;
  }
}

//片方がプレイ出来たらリセットする
function reset_missed() {
  white_missed = false;
  black_missed = false;
}

//両方がミスしているか確認する
function both_missed() {
  return white_missed&&black_missed;
}

//盤上のコマ数を数える
function countwb() {
  let count_white = 0;
  let count_black = 0;
  for(let h=0;h<8;h++) {
    for(let w=0;w<8;w++) {
      color = getPieceColor(w,h);
      if(color==='white') {
        count_white++;
      } else if(color==='black') {
        count_black++;
      }
    }
  }
  return [count_white, count_black];
}

//操作をストップする
function stopOperation() {
  for(let h=0;h<8;h++) {
    for(let w=0;w<8;w++) {
      board[w][h]['block'].removeEventListener('click',board[w][h]['func']);
    }
  }
}

//終了処理
function finishChk() {
  return both_missed();
}

function gameFinish() {
  //操作をストップする。イベントハンドラの削除
  stopOperation();
  let cwb = countwb();
  let countw = cwb[0];
  let countb = cwb[1];
  let winner;
  if(countw>countb) {
    winner = 'White';
  } else if(countw<countb) {
    winner = 'Black';
  } else {
    winner = 'Draw';
  }
  appendMsg('white gets '+countw+' pieces.');
  appendMsg('black gets '+countb+' pieces.');
  if(winner==='Draw') {
    appendMsg('Draw.');
  } else {
    appendMsg(winner+' is the Winner!');
  }
  appendMsg('Game finished.');
}

//1ターンに操作した回数
let tried_num = 0;

//操作している側
let turn_color = 'white';  //攻め手 白で初期化

//それぞれのコマを初期化+イベントハンドラ設定
for(let h=0;h<8;h++) {
  for(let w=0;w<8;w++) {
    //1つ1つのブロック(コマ+ボード)毎に初期化
    board[w][h] = {};
    board[w][h]['block'] = document.createElement('span');
    board[w][h]['piece'] = document.createElement('span');
    board[w][h]['board'] = document.createElement('span');
    
    tag_whole_board.appendChild(board[w][h]['block']);
    board[w][h]['block'].appendChild(board[w][h]['piece']);
    board[w][h]['block'].appendChild(board[w][h]['board']);
    
    board[w][h]['block'].setAttribute('class','block relative');
    board[w][h]['board'].setAttribute('class','board');
    
    if((w===3&&h===3)||(w===4&&h===4)) {
      board[w][h]['piece'].setAttribute('class','piece absolute white');
    } else if((w===3&&h===4)||(w===4&&h===3)) {
      board[w][h]['piece'].setAttribute('class','piece absolute black');
    } else {
      board[w][h]['piece'].setAttribute('class','piece absolute');
    }
    
    board[w][h]['func'] = function(e) {
      let target_piece = board[w][h]['piece'];
      let current_class = target_piece.getAttribute('class');
      tried_num++;
      let play_result;
      if(turn_color === 'white') {
        play_result = play(turn_color,w,h);
      } else if(turn_color === 'black') {
        play_result = autoplay();
      }
      
      if(play_result) {
        let next_color = reverse_color(turn_color);
        appendMsg(turn_color+' played. '+next_color+' to play.');
        if(next_color==='black') {
          appendMsg('black plays by automation. click anywhere on the board.');
        }
        reset_missed();
        turn_color = next_color;
        tried_num = 0;
      } else if(tried_num===retry_num_per_turn) {
        appendMsg('retry count over.');
        let next_color = reverse_color(turn_color);
        appendMsg(turn_color+' played. '+next_color+' to play.');
        miss(turn_color);
        turn_color = next_color;
        tried_num = 0;
        
        if(finishChk()) {
          gameFinish();
        }
      }
    };
    board[w][h]['block'].addEventListener('click', board[w][h]['func']);
  }
  addBrTag(tag_whole_board);
}


/*black をautomation する*/
//盤上の白を見つける
function findWhite() {
  let white_coordinates = [];
  for(let h=0;h<8;h++) {
    for(let w=0;w<8;w++) {
      if(getPieceColor(w,h)==='white') {
        white_coordinates.push({
          width: w,
          height: h
        });
      }
    }
  }
  return white_coordinates;
}

//あるコマの周りの空白マスを見つける
function findAroundEmpty(w,h) {
  let result = [];
  for(let d_h=-1;d_h<=1;d_h++) {
    for(let d_w=-1;d_w<=1;d_w++) {
      if(isEdge(w,h,d_w,d_h)) {
        continue;
      } else if(getPieceColor(w+d_w, h+d_h)==='empty') {
        result.push({
          width: w+d_w,
          height: h+d_h
        });
      }
    }
  }
  return result;
}

function gonext_checkonly(color, w, h, d_w, d_h) {
  if(isEdge(w,h,d_w,d_h)) {
    return false;
  }
  
  let next_color = getPieceColor(w+d_w,h+d_h);
  if(next_color==='empty') {
    return false;
  } else if(next_color===color) {
    return true;
  } else {
    if(gonext_checkonly(color,w+d_w,h+d_h,d_w,d_h)) {
      return true;
    } else {
      return false;
    }
  }
}

function autoplay() {
  let color = 'black';
  let fw_result = findWhite();
  let fae_result = [];
  for(let i=0;i<fw_result.length;i++) {
    //appendMsg('autoplay(): fw_result: ('+fw_result[i]['width']+','+fw_result[i]['height']+')')
    fae_result = fae_result.concat(findAroundEmpty(fw_result[i]['width'],fw_result[i]['height']));
  }
  
  let put_enable = false;
  let result_w;
  let result_h;
  for(let i=0;i<fae_result.length;i++) {
    //appendMsg('autoplay(): fae_result: ('+fae_result[i]['width']+','+fae_result[i]['height']+')');
    for(let d_h=-1;d_h<=1;d_h++) {
      for(let d_w=-1;d_w<=1;d_w++) {
        //appendMsg('autoplay(): d_w,d_h: ('+d_w+','+d_h+')');
        if(isEdge(fae_result[i]['width'],fae_result[i]['height'],d_w,d_h)) {
          continue;
        } else if(getPieceColor(fae_result[i]['width']+d_w,fae_result[i]['height']+d_h)===color) {
          continue;
        } else {
          put_enable = gonext_checkonly(color,fae_result[i]['width'],fae_result[i]['height'],d_w,d_h)||put_enable;
        }
      }
    }
    if(put_enable) {
      result_w = fae_result[i]['width'];
      result_h = fae_result[i]['height'];
      break;
    }
  }
  
  if(put_enable) {
    for(let d_w = -1;d_w<=1;d_w++) {
      for(let d_h = -1;d_h<=1;d_h++) {
        if(isEdge(result_w,result_h,d_w,d_h)) {
          continue;
        } else if(getPieceColor(result_w+d_w,result_h+d_h)===color) {
          continue;
        } else {
          gonext(color, result_w, result_h, d_w, d_h);
        }
      }
    }
    setPiece(color,result_w,result_h);
    appendMsg('reversed!');
    return true;
  } else {
    appendMsg('failed...');
    return false;
  }
}
