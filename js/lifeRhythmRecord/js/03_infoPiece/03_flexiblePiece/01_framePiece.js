//フレーム一つ一つにあたるオブジェクト
function FramePiece(dom, init_width, init_height, init_color) {
    dom.framePiece = {
        data: {
            inited: {
                time: false,
                allInfo: false,
            },

            width: init_width,
            height: init_height,
            left: 0,
            top: 0,
            backgroundColor: init_color,
            borderWidth: 3,
            borderType: 'solid',
            borderColor: 'gray',
            titleInited: false,
            //maxFontSize: 50,
            minFontSize: 0,

            info: {
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
        },
        styleObj: {
            main: {
                position: 'absolute',
                width: null,
                height: null,
                left: 0,
                top: 0,
                backgroundColor: init_color,
                border: null,
                padding: 0,
            },
            text: {
                position: 'absolute',
                width: null,
                height: null,
                left: 0,
                top: 0,
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0,
                overflow: 'hidden',
            }
        },
        childDOMs: {
            text: document.createElement('div'),
        }
    };

    //初期化
    dom.appendChild(dom.framePiece.childDOMs.text);

    dom.framePiece.redraw = function () {
        dom.framePiece.styleObj.main.width = dom.framePiece.data.width + 'px';
        dom.framePiece.styleObj.main.height = dom.framePiece.data.height + 'px'
        dom.framePiece.styleObj.main.left = dom.framePiece.data.left + 'px';
        dom.framePiece.styleObj.main.top = dom.framePiece.data.top + 'px';
        dom.framePiece.styleObj.main.backgroundColor = dom.framePiece.data.backgroundColor;
        dom.framePiece.styleObj.main.border = dom.framePiece.data.borderWidth + 'px ' + dom.framePiece.data.borderType + ' ' + dom.framePiece.data.borderColor;
        styleObjApply(dom, dom.framePiece.styleObj.main);

        dom.framePiece.styleObj.text.width = (dom.framePiece.data.width - dom.framePiece.data.borderWidth * 2) + 'px';
        dom.framePiece.styleObj.text.height = (dom.framePiece.data.height - dom.framePiece.data.borderWidth * 2) + 'px';
        styleObjApply(dom.framePiece.childDOMs.text, dom.framePiece.styleObj.text);
        dom.framePiece.childDOMs.text.textContent = dom.framePiece.data.info.title;
        if(!dom.framePiece.data.titleInited && dom.framePiece.childDOMs.text.textContent==='' && dom.framePiece.data.info.title!=='') {
            dom.framePiece.data.titleInited = true;
            initDOMStyle(dom.framePiece.childDOMs.text, ['fontSize']);
        }

        var applyFontSize = getFontSizeApply2Area(dom.framePiece.childDOMs.text);
        if (applyFontSize < dom.framePiece.data.minFontSize) {
            applyFontSize = dom.framePiece.data.minFontSize;
        }
        dom.framePiece.childDOMs.text.style.fontSize = applyFontSize + 'px';
    }

    //タイトルの変更
    dom.framePiece.setTitle = function (title) {
        dom.framePiece.data.info.title = title;
        dom.framePiece.redraw();
    }

    dom.framePiece.setColor = function(backgroundColor) {
        dom.framePiece.data.backgroundColor = backgroundColor;
        dom.framePiece.redraw();
    }

    dom.framePiece.isStartTimeNull = function () {
        return dom.framePiece.data.info.time.start.ampm === null||dom.framePiece.data.info.time.start.hour === null||dom.framePiece.data.info.time.start.minute;
    }
    dom.framePiece.isEndTimeNull = function () {
        return dom.framePiece.data.info.time.end.ampm === null||dom.framePiece.data.info.time.end.hour === null||dom.framePiece.data.info.time.end.minute;
    }
    dom.framePiece.isTimeNull = function () {
        return dom.framePiece.isStartTimeNull() || dom.framePiece.isEndTimeNull();
    }

    dom.framePiece.getCoordinate = function () {
        return {
            left: dom.framePiece.data.left,
            top: dom.framePiece.data.top,
            right: dom.framePiece.data.left + dom.framePiece.data.width,
            bottom: dom.framePiece.data.top + dom.framePiece.data.height
        };
    }
    dom.framePiece.moveCoordinate = function (left, top) {
        dom.framePiece.data.left = left;
        dom.framePiece.data.top = top;
        dom.framePiece.redraw();
    }
    dom.framePiece.resizeRight = function (width) {
        dom.framePiece.data.width = width;
        dom.framePiece.redraw();
    }
    dom.framePiece.resizeBottom = function (height) {
        dom.framePiece.data.height = height;
        dom.framePiece.redraw();
    }
    dom.framePiece.resizeLeft = function (width) {
        dom.framePiece.data.left += (dom.framePiece.data.width - width);
        dom.framePiece.data.width = width;
        dom.framePiece.redraw();
    }
    dom.framePiece.resizeTop = function (height) {
        dom.framePiece.data.top += (dom.framePiece.data.height - height);
        dom.framePiece.data.height = height;
        dom.framePiece.redraw();
    }
    dom.framePiece.remove = function () {
        dom.parentNode.removeChild(dom);
    }
    
    dom.framePiece.setInfo = function(infoObj) {
        dom.framePiece.data.info = JSON.parse(JSON.stringify(infoObj));
        if(!dom.framePiece.data.inited.allInfo) {
            dom.framePiece.data.inited.time = true;
            dom.framePiece.data.inited.allInfo = true;
        }
        dom.framePiece.redraw();
    }
    dom.framePiece.setStartTime = function(time) {
        dom.framePiece.data.info.time.start = JSON.parse(JSON.stringify(time));
    }
    dom.framePiece.setEndTime = function(time) {
        dom.framePiece.data.info.time.end = JSON.parse(JSON.stringify(time));
    }

    dom.framePiece.redraw();
    return dom;
}
