function NoTextGrayGuide(dom,backText, init_width, init_height, resizeMode) {
    dom.ntgg = {
        data: {
            mainText: '',
            backText: backText,
            width: init_width,
            height: init_height,
            resizeMode: null,
            borderStyle: {
                width: 1,
                style: 'solid',
                color: 'lightgray'
            }
        },
        childDOMs: {
            text: document.createElement('input'),
            back: document.createElement('div'),
        },
        styleObj: {
            frame: {
                position: '',
                width: null,
                height: null,
                border: 0 + 'px solid lightgray',
            },
            text: {
                position: 'absolute',
                color: 'black',
                backgroundColor: 'transparent',
                width: null,
                height: null,
                border: 'none',
            },
            back: {
                position: 'absolute',
                color: 'lightgray',
                width: null,
                height: null,
            },
        }
    }
    if(resizeMode) {
        dom.ntgg.data.resizeMode = true;
    }

    dom.ntgg.textContentCheck = function(e) {
        if(dom.ntgg.childDOMs.text.value === '') {
            dom.ntgg.childDOMs.back.style.display = 'block';
            return false;
        } else {
            dom.ntgg.childDOMs.back.style.display = 'none';
            return true;
        }
    }
    dom.ntgg.inputEventFunc = function() {
        dom.ntgg.textContentCheck();
        if(dom.ntgg.data.resizeMode) {
            dom.ntgg.childDOMs.text.textContent = dom.ntgg.childDOMs.text.value;
            dom.ntgg.childDOMs.text.style.fontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.text,true) + 'px';
        }
    }
    
    dom.ntgg.redraw = function () {
        dom.ntgg.styleObj.frame.width = dom.ntgg.data.width + 'px';
        dom.ntgg.styleObj.frame.height = dom.ntgg.data.height + 'px';
        dom.ntgg.styleObj.frame.border = dom.ntgg.data.borderStyle.width + 'px ' + dom.ntgg.data.borderStyle.style + ' ' + dom.ntgg.data.borderStyle.color;
        dom.ntgg.styleObj.text.width = (dom.ntgg.data.width - dom.ntgg.data.borderStyle.width * 2) + 'px';
        dom.ntgg.styleObj.text.height = (dom.ntgg.data.height - dom.ntgg.data.borderStyle.width * 2) + 'px';
        dom.ntgg.styleObj.back.width = (dom.ntgg.data.width - dom.ntgg.data.borderStyle.width * 2) + 'px';
        dom.ntgg.styleObj.back.height = (dom.ntgg.data.height - dom.ntgg.data.borderStyle.width * 2) + 'px';
        styleObjApply(dom, dom.ntgg.styleObj.frame);
        styleObjApply(dom.ntgg.childDOMs.text, dom.ntgg.styleObj.text);
        styleObjApply(dom.ntgg.childDOMs.back, dom.ntgg.styleObj.back);
        var textFontSize = null;
        if(dom.ntgg.textContentCheck()) {
            textFontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.text);
            dom.ntgg.childDOMs.text.style.fontSize = textFontSize + 'px';
        } else {
            textFontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.back);
            dom.ntgg.childDOMs.back.style.fontSize = textFontSize + 'px';    
        }
}

    dom.ntgg.resize = function(width, height) {
        dom.ntgg.data.width = width;
        dom.ntgg.data.height = height;
        dom.ntgg.redraw();
    }

    dom.ntgg.setText = function(text) {
        dom.ntgg.childDOMs.text.value = text;
        if(dom.ntgg.textContentCheck()) {
            textFontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.text);
            dom.ntgg.childDOMs.text.style.fontSize = textFontSize + 'px';
        } else {
            textFontSize = getFontSizeApply2Area(dom.ntgg.childDOMs.back);
            dom.ntgg.childDOMs.back.style.fontSize = textFontSize + 'px';    
        }
    }
    
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
