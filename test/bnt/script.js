//script.js
let tag_q1_board = document.getElementById('q1_board');

let board = [
  [
    {},{},{},{}
  ],
  [
    {},{},{},{}
  ],
  [
    {},{},{},{}
  ],
  [
    {},{},{},{}
  ]
];

for(let j=0;j<4;j++) {
  for(let i=0;i<4;i++) {
    board[i][j]['block'] = document.createElement('span');
    board[i][j]['degit'] = document.createElement('span');
    board[i][j]['masu'] = document.createElement('span');
    board[i][j]['select_opts'] = document.createElement('select');
    
    tag_q1_board.appendChild(board[i][j]['block']);
    board[i][j]['block'].appendChild(board[i][j]['degit']);
    board[i][j]['block'].appendChild(board[i][j]['masu']);
    board[i][j]['block'].appendChild(board[i][j]['select_opts']);
    
    let default_opt = board[i][j]['select_opts'].appendChild(document.createElement('option'));
    default_opt.setAttribute('value','');
    default_opt.textContent = '--';
    for(let idx=1;idx<=9;idx++) {
      let tmp_opt = board[i][j]['select_opts'].appendChild(document.createElement('option'));
      tmp_opt.setAttribute('value',idx);
      tmp_opt.textContent = idx;
    }
    
    board[i][j]['block'].setAttribute('class','block');
    board[i][j]['degit'].setAttribute('class','degit');
    board[i][j]['masu'].setAttribute('class','masu');
    board[i][j]['select_opts'].setAttribute('class','select_opts');
    
    board[i][j]['func'] = function(e) {
      let selected = this.selectedIndex;
      setDegit(i,j,selected);
    }
    board[i][j]['select_opts'].addEventListener('change',board[i][j]['func']);
  }
  tag_q1_board.appendChild(document.createElement('br'));
}

function setDegit(i,j,num) {
  board[i][j]['degit'].textContent = num.toString();
}

function setDefault(i,j,num) {
  setDegit(i,j,num);
  board[i][j]['select_opts'].removeEventListener('change',board[i][j]['func']);
  board[i][j]['select_opts'].remove();
}

//初期化
setDefault(0,0,1);
setDefault(0,1,2);
setDefault(0,2,3);
setDefault(2,3,2);
setDefault(3,1,1);

