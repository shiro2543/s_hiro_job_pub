//framepieceにタイトルや時間、カテゴリなどをセットするフォーム
function InfoSetter(dom, init_width, init_height, init_radius, tagList, tagColorList, clockIncrementMinute) {
    dom.infoSetter = {
        data: {
            title: '',
            comment: '',
            tag: null,
            tagList: tagList,
            tagColorList: tagColorList,
            width: init_width,
            height: init_height,
            clockRadius: init_radius,
            paddingWidth: 0,
            lineQuantity: {
                title: 1,
                tagSelect: 2,
                timeSpan: 1,
                comment: 4,
                saveButton: 1,
            },
            buttonQuantityPerLine: 4,
            operatingTarget: {
                fP: null,
            },
            operateButtonLayoutRate: {
                save: 2, cancel: 5, delete: 2
            },
            operateButtonLayoutRateTotal: null
        },
        childDOMs: {
            title: document.createElement('div'),
            timeSpan: document.createElement('div'),
            tagSelect: document.createElement('div'),
            comment: document.createElement('div'),
            saveButton: document.createElement('button'),
            cancelButton: document.createElement('button'),
            deleteButton: document.createElement('button'),
        },
        styleObj: {
            main: {
                backgroundColor: 'lightgreen',
                width: null,
                padding: null,
                borderRadius: null,
            },
            tagButton: {
                backgroundColor: 'white'
            },
            title: {
                backgroundColor: 'white'
            },
            comment: {
                backgroundColor: 'white'
            },
            timeSpan: {
                zIndex: '1000',
            },
            saveButton: {
                border: '1px solid lightgray',
                color: 'lightblue',
                backgroundColor: 'white',
                margin: 0 + 'px',
                padding: 0 + 'px',
                width: null,
                height: null,
                display: 'inline-block',
                position: 'absolute',
                left: null,
            },
            cancelButton: {
                border: '1px solid lightgray',
                color: 'pink',
                backgroundColor: 'white',
                margin: 0 + 'px',
                padding: 0 + 'px',
                width: null,
                height: null,
                display: 'inline-block',
                position: 'absolute',
                left: null,
            },
            deleteButton: {
                border: '1px solid lightgray',
                color: 'red',
                backgroundColor: 'white',
                margin: 0 + 'px',
                padding: 0 + 'px',
                width: null,
                height: null,
                display: 'inline-block',
                position: 'absolute',
                left: null,
            }
        },
        inputEventFunc: {
            title: function (e) {
                dom.infoSetter.data.title = dom.infoSetter.childDOMs.title.ntgg.childDOMs.text.value;
            },
            comment: function (e) {
                dom.infoSetter.data.comment = dom.infoSetter.childDOMs.comment.ntagg.childDOMs.text.value;
            }
        }
    }

    dom.infoSetter.redraw = function () {
        dom.infoSetter.styleObj.main.width = dom.infoSetter.data.width + 'px';
        dom.infoSetter.styleObj.main.height = dom.infoSetter.data.height + 'px';
        dom.infoSetter.styleObj.main.padding = dom.infoSetter.data.paddingWidth + 'px';
        dom.infoSetter.styleObj.main.borderRadius = dom.infoSetter.data.paddingWidth + 'px';

        var form_width = dom.infoSetter.data.width - dom.infoSetter.data.paddingWidth * 2;
        var totalLineQuantity = 0;
        Object.keys(dom.infoSetter.data.lineQuantity).forEach(function (key) {
            totalLineQuantity += dom.infoSetter.data.lineQuantity[key];
        })
        var form_height = (dom.infoSetter.data.height - dom.infoSetter.data.paddingWidth * 2) / totalLineQuantity;

        dom.infoSetter.styleObj.saveButton.height = form_height + 'px';
        dom.infoSetter.styleObj.cancelButton.height = form_height + 'px';
        dom.infoSetter.styleObj.deleteButton.height = form_height + 'px';

        var operateButtonWidth = {
            save: dom.infoSetter.data.width * dom.infoSetter.data.operateButtonLayoutRate.save / dom.infoSetter.data.operateButtonLayoutRateTotal,
            cancel: dom.infoSetter.data.width * dom.infoSetter.data.operateButtonLayoutRate.cancel / dom.infoSetter.data.operateButtonLayoutRateTotal,
            delete: dom.infoSetter.data.width * dom.infoSetter.data.operateButtonLayoutRate.delete / dom.infoSetter.data.operateButtonLayoutRateTotal,
        }
        dom.infoSetter.styleObj.saveButton.width = operateButtonWidth.save + 'px';
        dom.infoSetter.styleObj.cancelButton.width = operateButtonWidth.cancel + 'px';
        dom.infoSetter.styleObj.deleteButton.width = operateButtonWidth.delete + 'px';
        dom.infoSetter.styleObj.saveButton.left = 0 + 'px';
        dom.infoSetter.styleObj.cancelButton.left = operateButtonWidth.save + 'px';
        dom.infoSetter.styleObj.deleteButton.left = (operateButtonWidth.save + operateButtonWidth.cancel) + 'px';

        styleObjApply(dom, dom.infoSetter.styleObj.main);
        styleObjApply(dom.infoSetter.childDOMs.title, dom.infoSetter.styleObj.title);
        styleObjApply(dom.infoSetter.childDOMs.timeSpan, dom.infoSetter.styleObj.timeSpan);
        styleObjApply(dom.infoSetter.childDOMs.comment, dom.infoSetter.styleObj.comment);
        styleObjApply(dom.infoSetter.childDOMs.saveButton, dom.infoSetter.styleObj.saveButton);
        styleObjApply(dom.infoSetter.childDOMs.cancelButton, dom.infoSetter.styleObj.cancelButton);
        styleObjApply(dom.infoSetter.childDOMs.deleteButton, dom.infoSetter.styleObj.deleteButton);

        dom.infoSetter.childDOMs.title.ntgg.resize(form_width, form_height);
        dom.infoSetter.childDOMs.timeSpan.inputTimeSpan.resize(form_width, form_height);
        dom.infoSetter.childDOMs.timeSpan.inputTimeSpan.resizeClock(dom.infoSetter.data.clockRadius);
        dom.infoSetter.childDOMs.tagSelect.selectButtonArea.resize(form_width, form_height * dom.infoSetter.data.lineQuantity.tagSelect);
        dom.infoSetter.childDOMs.comment.ntagg.resize(form_width, form_height * dom.infoSetter.data.lineQuantity.comment);

        //commentのfontsizeをtitleのそれに合わせる
        dom.infoSetter.childDOMs.comment.ntagg.childDOMs.text.style.fontSize = dom.infoSetter.childDOMs.title.ntgg.childDOMs.back.style.fontSize;
        dom.infoSetter.childDOMs.comment.ntagg.childDOMs.back.style.fontSize = dom.infoSetter.childDOMs.title.ntgg.childDOMs.back.style.fontSize;
        
        //保存ボタンなどのfontsizeをwidth,heightに合わせる
        applyString2Area(dom.infoSetter.childDOMs.saveButton);
        applyString2Area(dom.infoSetter.childDOMs.cancelButton);
        applyString2Area(dom.infoSetter.childDOMs.deleteButton);
    }

    //初期化
    dom.appendChild(dom.infoSetter.childDOMs.tagSelect);
    dom.appendChild(dom.infoSetter.childDOMs.timeSpan);
    dom.appendChild(dom.infoSetter.childDOMs.title);
    dom.appendChild(dom.infoSetter.childDOMs.comment);
    dom.appendChild(dom.infoSetter.childDOMs.saveButton);
    dom.appendChild(dom.infoSetter.childDOMs.cancelButton);
    dom.appendChild(dom.infoSetter.childDOMs.deleteButton);

    new NoTextGrayGuide(dom.infoSetter.childDOMs.title, 'タイトルを入力', dom.infoSetter.data.width, dom.infoSetter.data.height);
    new InputTimeSpan(dom.infoSetter.childDOMs.timeSpan, dom.infoSetter.data.width, dom.infoSetter.data.height, dom.infoSetter.data.clockRadius, clockIncrementMinute);
    dom.infoSetter.childDOMs.timeSpan.style.position = 'relative';
    var selectButtonTextList = [];
    for(var i=0;i<tagList.length;i++) {
        selectButtonTextList.push(dom.infoSetter.data.tagList[i]);
    }
    new SelectButtonArea(dom.infoSetter.childDOMs.tagSelect, dom.infoSetter.data.width, dom.infoSetter.data.height, 4, selectButtonTextList);
    Object.keys(dom.infoSetter.childDOMs.tagSelect.selectButtonArea.childDOMs.selectButton).forEach(function(key) {
        var targetButton = dom.infoSetter.childDOMs.tagSelect.selectButtonArea.childDOMs.selectButton[key];
        var orgClickEventFunc = targetButton.selectButton.clickEventFunc;
        targetButton.removeEventListener('click', orgClickEventFunc);
        targetButton.selectButton.clickEventFunc = function() {
            orgClickEventFunc();
            var newTitleValue = dom.infoSetter.childDOMs.tagSelect.selectButtonArea.getSelectedButton();
            if(newTitleValue===null) {
                newTitleValue = '';
            }
            dom.infoSetter.childDOMs.title.ntgg.setText(newTitleValue);
        }
        targetButton.addEventListener('click', targetButton.selectButton.clickEventFunc);
    })


    new NoTextAreaGrayGuide(dom.infoSetter.childDOMs.comment, 'コメントを入力', dom.infoSetter.data.width, dom.infoSetter.data.height);
    dom.infoSetter.childDOMs.title.ntgg.childDOMs.text.addEventListener('input', dom.infoSetter.inputEventFunc.title);
    dom.infoSetter.childDOMs.comment.ntagg.childDOMs.text.addEventListener('input', dom.infoSetter.inputEventFunc.comment);
    dom.infoSetter.childDOMs.saveButton.textContent = '保存';
    dom.infoSetter.childDOMs.cancelButton.textContent = 'キャンセル';
    dom.infoSetter.childDOMs.deleteButton.textContent = '削除';


    dom.infoSetter.resize = function (width, height) {
        dom.infoSetter.data.width = width;
        dom.infoSetter.data.height = height;
        dom.infoSetter.redraw();
    }

    dom.infoSetter.resizeWidthLineHeight = function (line_height) {
        var totalLineQuantity = 0;
        Object.keys(dom.infoSetter.data.lineQuantity).forEach(function (key) {
            totalLineQuantity += dom.infoSetter.data.lineQuantity[key];
        })
        dom.infoSetter.data.height = line_height * totalLineQuantity;
        dom.infoSetter.redraw();
    }

    dom.infoSetter.getInfo = function () {
        return {
            title: dom.infoSetter.childDOMs.title.ntgg.childDOMs.text.value,
            time: {
                start: JSON.parse(JSON.stringify(dom.infoSetter.childDOMs.timeSpan.inputTimeSpan.childDOMs.time.start.inputTimeForm.data.time)),
                end: JSON.parse(JSON.stringify(dom.infoSetter.childDOMs.timeSpan.inputTimeSpan.childDOMs.time.end.inputTimeForm.data.time)),
            },
            tag: dom.infoSetter.childDOMs.tagSelect.selectButtonArea.getSelectedButton(),
            comment: dom.infoSetter.childDOMs.comment.ntagg.childDOMs.text.value,
        };
    }

    dom.infoSetter.setInfo = function(info) {
        dom.infoSetter.childDOMs.title.ntgg.setText(info.title);
        dom.infoSetter.childDOMs.timeSpan.inputTimeSpan.childDOMs.time.start.inputTimeForm.setTime(info.time.start);
        dom.infoSetter.childDOMs.timeSpan.inputTimeSpan.childDOMs.time.end.inputTimeForm.setTime(info.time.end);
        dom.infoSetter.childDOMs.tagSelect.selectButtonArea.setButton(info.tag);
        dom.infoSetter.childDOMs.comment.ntagg.childDOMs.text.value = info.comment;
        dom.infoSetter.redraw();
    }

    dom.infoSetter.startOperateFP = function(framePiece) {
        dom.infoSetter.data.operatingTarget.fP = framePiece;
        dom.infoSetter.setInfo(framePiece.framePiece.data.info);
        dom.infoSetter.childDOMs.saveButton.addEventListener('click', dom.infoSetter.saveOperateFP);
        dom.infoSetter.childDOMs.cancelButton.addEventListener('click', dom.infoSetter.cancelOperateFP);
        dom.infoSetter.childDOMs.deleteButton.addEventListener('click', dom.infoSetter.deleteOperateFP);
        dom.infoSetter.childDOMs.title.ntgg.childDOMs.text.focus();
        dom.infoSetter.childDOMs.timeSpan.inputTimeSpan.clockHide();
    }

    dom.infoSetter.cancelOperateFP = function() {
        dacontroller.initAllListener();
        if(!dom.infoSetter.data.operatingTarget.fP.framePiece.data.inited.allInfo) {
            moveAreaDOM.areaAdjustScale.removeFP(dom.infoSetter.data.operatingTarget.fP);
        }
        dom.infoSetter.data.operatingTarget.fP = null;
    }
    dom.infoSetter.saveOperateFP = function() {
        //保存処理
        var info = dom.infoSetter.getInfo();
        var moveResult = moveAreaDOM.areaAdjustScale.moveFramePiece(dom.infoSetter.data.operatingTarget.fP, info.time.start, info.time.end);
        if(moveResult) {
            dom.infoSetter.data.operatingTarget.fP.framePiece.setInfo(JSON.parse(JSON.stringify(info)));
            dom.infoSetter.data.operatingTarget.fP.framePiece.setColor(tagColorList[info.tag]);
            dacontroller.initAllListener();
        } else {
            //将来的にエラー表示用ポップアップか何かここに実装する
            console.error('.infoSetter.saveOperateFP(): operation failed. Other Piece already exists on move target.')
        }
        dom.infoSetter.data.operatingTarget.fP = null;
        saveBar.saveBar.changeDetected();
    }

    dom.infoSetter.resetInfo = function() {
        var info = {
            title: '',
            time: {
                start: {
                    ampm: null,
                    hour: null,
                    minute: null,
                },
                end: {
                    ampm: null,
                    hour: null,
                    minute: null,
                }
            },
            tag: null,
            comment: '',
        }
        dom.infoSetter.setInfo(info);
    }

    dom.infoSetter.deleteOperateFP = function() {
        dacontroller.initAllListener();
        moveAreaDOM.areaAdjustScale.removeFP(dom.infoSetter.data.operatingTarget.fP);
        dom.infoSetter.data.operatingTarget.fP = null;
        saveBar.saveBar.changeDetected();
    }

    dom.infoSetter.deactivateListener = function() {
        dom.infoSetter.childDOMs.saveButton.removeEventListener('click', dom.infoSetter.saveOperateFP);
        dom.infoSetter.childDOMs.cancelButton.removeEventListener('click', dom.infoSetter.cancelOperateFP);
        dom.infoSetter.childDOMs.deleteButton.removeEventListener('click', dom.infoSetter.deleteOperateFP);
    }

    dacontroller.append(dom.infoSetter.deactivateListener);

    Object.keys(dom.infoSetter.data.operateButtonLayoutRate).forEach(function(key) {
        dom.infoSetter.data.operateButtonLayoutRateTotal += dom.infoSetter.data.operateButtonLayoutRate[key];
    });
    dom.infoSetter.redraw();
    return dom;
}
