/*便利関数------------------------------*/
//DOMの新規作成or取得時にcssからスタイルを取得する関数
//init_style_listにはleft,top,...などの文字列をリストで保存しておいて使う
var initDOMStyle = function (dom, init_style_list) {
    var init_style_data = window.getComputedStyle(dom);
    for (var i = 0; i < init_style_list.length; i++) {
        dom.style[init_style_list[i]] = init_style_data[init_style_list[i]];
    }
}

var styleObjApply = function (dom, styleObj) {
    Object.keys(styleObj).forEach(function (key) {
        //console.log('key: ' + key + ' > styleobj: ' + styleObj[key]);
        dom.style[key] = styleObj[key];
    });
}

//末尾のpxを削除してpx->数値変換
var px2num = function (px) {
    return Number(px.replace(/px$/, ''));
}

var getDOMCoordinate = function (dom) {
    return {
        left: px2num(dom.style.left),
        top: px2num(dom.style.top)
    }
}
var getDOMCoordinateAll = function (dom) {
    var leftTop = getDOMCoordinate(dom);
    return {
        leftTop: {
            left: leftTop.left,
            top: leftTop.top
        },
        leftBottom: {
            left: leftTop.left,
            top: leftTop.top + tmp_dom.getHeight()
        },
        rightTop: {
            left: leftTop.left + tmp_dom.getWidth(),
            top: leftTop.top
        },
        rightBottom: {
            left: leftTop.left * tmp_dom.getWidth(),
            top: leftTop.top + tmp_dom.getHeight()
        }
    }
}
var getDOMCoordinateCorner = function (dom) {
    var leftTop = getDOMCoordinate(dom);
    var width = px2num(dom.style.width);
    var height = px2num(dom.style.height);
    return {
        left: leftTop.left,
        top: leftTop.top,
        right: leftTop.left + width,
        bottom: leftTop.top + height
    }
}

//domのwidthとheightに入るようにfontSizeを合わせてくれる関数
var applyString2Area = function(dom) {
    dom.style.fontSize = getFontSizeApply2Area(dom) + 'px';
}

var hiddenDOMForCalcFS = document.createElement('span');
document.body.appendChild(hiddenDOMForCalcFS);
hiddenDOMForCalcFS.style.visibility = 'hidden';
hiddenDOMForCalcFS.style.display = 'inline';
hiddenDOMForCalcFS.style.whiteSpace = 'nowrap';
hiddenDOMForCalcFS.style.fontSize = 10 + 'px';  //調整のための初期値 10

var getFontSizeApply2Area = function(dom, check) {
    hiddenDOMForCalcFS.textContent = dom.textContent;
    hiddenDOMForCalcFS.style.width = dom.style.width;
    hiddenDOMForCalcFS.style.height = dom.style.height;
    var result_x = (px2num(dom.style.width) / (hiddenDOMForCalcFS.offsetWidth + 1)) * px2num(hiddenDOMForCalcFS.style.fontSize);
    var result_y = (px2num(dom.style.height) / (hiddenDOMForCalcFS.offsetHeight + 1)) * px2num(hiddenDOMForCalcFS.style.fontSize);
    /*
    if(check) {
        console.log('getFontSizeApply2Area(): result_x: ' + result_x);
        console.log('getFontSizeApply2Area(): result_y: ' + result_y);
    }
    */
    var result = null;
    if(result_x <= result_y) {
        result = result_x;
    } else {
        result = result_y;
    }
    return result;
}

//数字を指定した桁までゼロ埋めする
var zeroPadding = function(num, whole_digits) {
    var digits = 0;
    var div = num;
    while(true) {
        div = Math.floor(div/10);
        if(div>0) {
            digits++;
        } else if(div===0) {
            digits++;
            break;
        } else {
            console.error('error: zeroPadding(): ');
            return;
        }
    }
    var padding_digits = whole_digits - digits;
    var result = '';
    for(var i=0;i<padding_digits;i++) {
        result += '0';
    }
    result = result + num;
    return result;
}

/*便利関数ここまで------------------------*/
