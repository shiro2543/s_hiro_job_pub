//全体のデータ保存ボタン
function SaveBar(dom, initWidth, initHeight) {
    dom.saveBar = {
        data: {
            saved: true,
            width: initWidth,
            height: initHeight,
            layoutRate: {
                width: {
                    message: 5,
                    saveButton: 2,
                }
            },
            layoutRateTotal: {
                width: null,
            },
        },
        styleObj: {
            main: {
                backgroundColor: 'white',
                color: 'green',
                width: null,
                height: null,
            },
            messageSaved: {
                color: 'white',
                backgroundColor: 'lightblue',
                position: 'absolute',
                width: null,
                height: null,
                left: 0,
                top: 0,
            },
            messageUnsaved: {
                color: 'white',
                backgroundColor: 'pink',
                position: 'absolute',
                width: null,
                height: null,
                left: 0,
                top: 0
            },
            saveButton: {
                color: 'white',
                backgroundColor: 'lightgreen',
                position: 'absolute',
                width: null,
                height: null,
                border: 'none',
                left: null,
                top: 0,
                padding: 0,
                margin: 0,
            }
        },
        childDOMs: {
            message: document.createElement('div'),
            saveButton: document.createElement('button'),
        }
    }

    dom.saveBar.data.layoutRateTotal.width = 0;
    Object.keys(dom.saveBar.data.layoutRate.width).forEach(function(key) {
        dom.saveBar.data.layoutRateTotal.width += dom.saveBar.data.layoutRate.width[key];
    })

    dom.saveBar.changeDetected = function() {
        dom.saveBar.data.saved = false;
        dom.saveBar.redraw();
        window.addEventListener('beforeunload', dom.saveBar.windowBeforeUnloadEventFunc);
    }

    dom.saveBar.childDOMs.saveButton.addEventListener('click', function() {
        uploadInfo();   //グローバル関数 99_dataLoad.js
        dom.saveBar.data.saved = true;
        dom.saveBar.redraw();
        window.removeEventListener('beforeunload', dom.saveBar.windowBeforeUnloadEventFunc);
    });

    dom.saveBar.windowBeforeUnloadEventFunc = function(e) {
        e.preventDefault();
    }

    dom.saveBar.redraw = function() {
        dom.saveBar.styleObj.main.width = dom.saveBar.data.width + 'px';
        dom.saveBar.styleObj.main.height = dom.saveBar.data.height + 'px';
        styleObjApply(dom, dom.saveBar.styleObj.main);
        var messageWidth = dom.saveBar.data.width * dom.saveBar.data.layoutRate.width.message / dom.saveBar.data.layoutRateTotal.width;
        dom.saveBar.styleObj.messageSaved.width = messageWidth + 'px';
        dom.saveBar.styleObj.messageSaved.height = dom.saveBar.data.height + 'px';
        dom.saveBar.styleObj.messageUnsaved.width = messageWidth + 'px';
        dom.saveBar.styleObj.messageUnsaved.height = dom.saveBar.data.height + 'px';
        if(dom.saveBar.data.saved) {
            dom.saveBar.childDOMs.message.textContent = '保存済みです';
            styleObjApply(dom.saveBar.childDOMs.message, dom.saveBar.styleObj.messageSaved);
        } else {
            dom.saveBar.childDOMs.message.textContent = '変更が未保存です';
            styleObjApply(dom.saveBar.childDOMs.message, dom.saveBar.styleObj.messageUnsaved);
        }
        applyString2Area(dom.saveBar.childDOMs.message);
        dom.saveBar.styleObj.saveButton.width = dom.saveBar.data.width * dom.saveBar.data.layoutRate.width.saveButton / dom.saveBar.data.layoutRateTotal.width + 'px';
        dom.saveBar.styleObj.saveButton.height = dom.saveBar.data.height + 'px';
        dom.saveBar.styleObj.saveButton.left = messageWidth + 'px';
        styleObjApply(dom.saveBar.childDOMs.saveButton, dom.saveBar.styleObj.saveButton);
        applyString2Area(dom.saveBar.childDOMs.saveButton);
    }

    //初期化
    dom.appendChild(dom.saveBar.childDOMs.message);
    dom.appendChild(dom.saveBar.childDOMs.saveButton);
    dom.saveBar.childDOMs.saveButton.textContent = '保存';
    dom.saveBar.redraw();

    return dom;
}