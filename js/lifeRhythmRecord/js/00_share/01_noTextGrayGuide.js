//input要素にvalueが空のときは背景にグレーの入力促すメッセージを表示する
function NoTextGrayGuide(dom, backText, init_width, init_height, autoResizeMode) {
    dom.ntgg = {
        data: {
            mainText: '',
            backText: backText, //背景に表示する入力促しメッセージ
            width: init_width,  //domの幅
            height: init_height,    //domの高さ
            autoResizeMode: autoResizeMode,   //入力時に自動でfontsizeを調整するかどうか
            borderStyle: {
                width: 1,
                style: 'solid',
                color: 'lightgray'
            }
        },
        childDOMs: {
            text: document.createElement('input'),  //値を入力するinput要素
            back: document.createElement('div'),    //背景に表示するメッセージ
        },
        styleObj: {
            //全体frameのスタイル
            frame: {
                position: '',
                width: null,
                height: null,
                border: 0 + 'px solid lightgray',
            },
            //値を入力するinput要素のスタイル
            text: {
                position: 'absolute',
                color: 'black',
                backgroundColor: 'transparent',
                width: null,
                height: null,
                border: 'none',
            },
            //背景メッセージのスタイル
            back: {
                position: 'absolute',
                color: 'lightgray',
                width: null,
                height: null,
            },
        }
    }

    //値が入力されているか確認し、そうであれば背景メッセージを消す
    dom.ntgg.textContentCheck = function(e) {
        if(dom.ntgg.childDOMs.text.value === '') {
            dom.ntgg.childDOMs.back.style.display = 'block';
            return false;
        } else {
            dom.ntgg.childDOMs.back.style.display = 'none';
            return true;
        }
    }

    //input要素へのinputイベント時の動作
    //入力された値により背景メッセージの表示非表示を切り替え
    //また、autoRisizeMode=trueの場合はfontsizeもwidth,heightに合わせて切り替える
    dom.ntgg.inputEventFunc = function() {
        dom.ntgg.textContentCheck();
        if(dom.ntgg.data.autoResizeMode) {
            dom.ntgg.childDOMs.text.textContent = dom.ntgg.childDOMs.text.value;
            dom.ntgg.childDOMs.text.style.fontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.text,true) + 'px';
        }
    }
    
    //全体の再描画
    dom.ntgg.redraw = function () {
        //styleObjの計算
        dom.ntgg.styleObj.frame.width = dom.ntgg.data.width + 'px';
        dom.ntgg.styleObj.frame.height = dom.ntgg.data.height + 'px';
        dom.ntgg.styleObj.frame.border = dom.ntgg.data.borderStyle.width + 'px ' + dom.ntgg.data.borderStyle.style + ' ' + dom.ntgg.data.borderStyle.color;
        dom.ntgg.styleObj.text.width = (dom.ntgg.data.width - dom.ntgg.data.borderStyle.width * 2) + 'px';
        dom.ntgg.styleObj.text.height = (dom.ntgg.data.height - dom.ntgg.data.borderStyle.width * 2) + 'px';
        dom.ntgg.styleObj.back.width = (dom.ntgg.data.width - dom.ntgg.data.borderStyle.width * 2) + 'px';
        dom.ntgg.styleObj.back.height = (dom.ntgg.data.height - dom.ntgg.data.borderStyle.width * 2) + 'px';

        //styleobjの適用
        styleObjApply(dom, dom.ntgg.styleObj.frame);
        styleObjApply(dom.ntgg.childDOMs.text, dom.ntgg.styleObj.text);
        styleObjApply(dom.ntgg.childDOMs.back, dom.ntgg.styleObj.back);

        //fontsizeの調整
        var textFontSize = null;
        if(dom.ntgg.textContentCheck()) {
            textFontSize = getFontSizeApply2AreaWithValue(dom.ntgg.childDOMs.text);
            dom.ntgg.childDOMs.text.style.fontSize = textFontSize + 'px';
        } else {
            textFontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.back);
            dom.ntgg.childDOMs.back.style.fontSize = textFontSize + 'px';    
        }
    }

    //全体のサイズを変更する
    dom.ntgg.resize = function(width, height) {
        dom.ntgg.data.width = width;
        dom.ntgg.data.height = height;
        dom.ntgg.redraw();
    }

    //値をセットし、fontsizeを整える
    dom.ntgg.setText = function(text) {
        dom.ntgg.childDOMs.text.value = text;
        if(dom.ntgg.textContentCheck()) {
            textFontSize = getFontSizeApply2AreaWithValue(dom.ntgg.childDOMs.text);
            dom.ntgg.childDOMs.text.style.fontSize = textFontSize + 'px';
        } else {
            textFontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.back);
            dom.ntgg.childDOMs.back.style.fontSize = textFontSize + 'px';    
        }
    }

    //値を取得する
    dom.ntgg.getValues = function() {
        return dom.ntgg.childDOMs.text.value;
    }
    
    //appendchildなど初期化
    dom.appendChild(dom.ntgg.childDOMs.back);
    dom.appendChild(dom.ntgg.childDOMs.text);
    dom.ntgg.childDOMs.text.setAttribute('type', 'text');
    dom.ntgg.childDOMs.back.textContent = dom.ntgg.data.backText;
    initDOMStyle(dom.ntgg.childDOMs.text, ['fontSize']);
    initDOMStyle(dom.ntgg.childDOMs.back, ['fontSize']);
    dom.ntgg.childDOMs.text.addEventListener('input', dom.ntgg.inputEventFunc);
    dom.style.height = dom.ntgg.childDOMs.text.clientHeight + 'px';
    dom.ntgg.redraw();
    dom.ntgg.childDOMs.text.addEventListener('change', saveBar.saveBar.changeDetected);
    
    return dom;
}
