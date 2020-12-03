function NoTextAreaGrayGuide(dom,backText, init_width, init_height) {
    dom.ntagg = {
        data: {
            mainText: '',
            backText: backText,
            width: init_width,
            height: init_height,
            fontSize: null,
        },
        childDOMs: {
            text: document.createElement('textarea'),
            back: document.createElement('div'),
        },
        styleObj: {
            frame: {
                width: null,
                height: null,
            },
            text: {
                position: 'absolute',
                color: 'black',
                backgroundColor: 'transparent',
                border: '1px solid lightgray',
                width: null,
                height: null,
                resize: 'none',
            },
            back: {
                position: 'absolute',
                color: 'lightgray',
                width: null,
                height: null,
            },
        },
    }

    dom.ntagg.textContentCheck = function(e) {
        if(dom.ntagg.childDOMs.text.value === '') {
            dom.ntagg.childDOMs.back.style.display = '';
        } else {
            dom.ntagg.childDOMs.back.style.display = 'none';
        }
    }
    dom.ntagg.inputEventFunc = dom.ntagg.textContentCheck;
    
    dom.ntagg.setText = function(text) {
        dom.ntagg.childDOMs.text.value = text;
        dom.ntagg.textContentCheck();
    }

    dom.ntagg.getValues = function() {
        return dom.ntagg.childDOMs.text.value;
    }

    dom.ntagg.redraw = function () {
        dom.ntagg.styleObj.frame.width = dom.ntagg.data.width + 'px';
        dom.ntagg.styleObj.frame.height = dom.ntagg.data.height + 'px';
        dom.ntagg.styleObj.text.width = dom.ntagg.data.width + 'px';
        dom.ntagg.styleObj.text.height = dom.ntagg.data.height + 'px';
        dom.ntagg.styleObj.back.width = dom.ntagg.data.width + 'px';
        dom.ntagg.styleObj.back.height = dom.ntagg.data.height + 'px';
        dom.ntagg.styleObj.text.fontSize = dom.ntagg.data.fontSize + 'px';
        dom.ntagg.styleObj.back.fontSize = dom.ntagg.data.fontSize + 'px';
        styleObjApply(dom, dom.ntagg.styleObj.frame);
        styleObjApply(dom.ntagg.childDOMs.text, dom.ntagg.styleObj.text);
        styleObjApply(dom.ntagg.childDOMs.back, dom.ntagg.styleObj.back);
        dom.ntagg.textContentCheck();
    }

    dom.ntagg.resize = function(width, height) {
        dom.ntagg.data.width = width;
        dom.ntagg.data.height = height;
        dom.ntagg.redraw();
    }

    dom.ntagg.changeFontSize = function(fontSize) {
        dom.ntagg.data.fontSize = fontSize;
        dom.ntagg.redraw();
    }

    dom.appendChild(dom.ntagg.childDOMs.back);
    dom.appendChild(dom.ntagg.childDOMs.text);
    dom.ntagg.childDOMs.text.setAttribute('type', 'text');
    dom.ntagg.childDOMs.back.textContent = dom.ntagg.data.backText;
    initDOMStyle(dom.ntagg.childDOMs.text, ['fontSize']);
    initDOMStyle(dom.ntagg.childDOMs.back, ['fontSize']);
    dom.ntagg.childDOMs.text.addEventListener('input', dom.ntagg.inputEventFunc);
    dom.style.height = dom.ntagg.childDOMs.text.clientHeight + 'px';
    dom.ntagg.redraw();
    dom.ntagg.childDOMs.text.addEventListener('change', saveBar.saveBar.changeDetected);
    return dom;
}
