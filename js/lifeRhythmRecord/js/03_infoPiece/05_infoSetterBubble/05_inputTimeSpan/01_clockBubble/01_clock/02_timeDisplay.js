//時計の中心に時間を表示
function TimeDisplay(dom, hour, minute, width, height) {
    dom.timeDisplay = {
        data: {
            lengthOfEdge: Math.min(width, height),
            radius: Math.min(width, height) / 2,
            left: 0,
            top: 0,
            width: width,
            height: height,
            ampm: 'am',
            hour: hour,
            minute: minute,
            textChildRatio: {
                hour: 2,
                colon: 1,
                minute: 2
            },
            textChildRatioSum: null,
            focused: 'hour',    //初期値
        },
        styleObj: {
            main: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: null,
                height: null,
            },
            circle: {
                borderRadius: '50%',
                boxShadow: '0 0 0 1px lightgray',
                width: null,
                height: null,
                backgroundColor: 'white',
            },
            text: { //textChild.補正用dom
                position: 'absolute',
                left: null,
                top: null,
                width: null,
                height: null,
                textAlign: 'center',
                color: 'transparent',
                backgroundColor: 'transparent',
                fontFamily: 'monospace',
                padding: 'none',
            },
            textChild: {
                hour:{
                    position: 'absolute',
                    left: null,
                    top: null,
                    width: null,
                    height: null,
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    padding: 'none',
                    whiteSpace: 'nowrap',
                    color: null
                },
                colon: {
                    position: 'absolute',
                    left: null,
                    top: null,
                    width: null,
                    height: null,
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    padding: 'none',
                    whiteSpace: 'nowrap',
                },
                minute: {
                    position: 'absolute',
                    left: null,
                    top: null,
                    width: null,
                    height: null,
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    padding: 'none',
                    whiteSpace: 'nowrap',
                    color: null
                }
            },
            ampm: {
                am: {
                    position: 'absolute',
                    left: null,
                    top: null,
                    width: null,
                    height: null,
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    padding: 'none',
                    whiteSpace: 'nowrap',
                },
                pm: {
                    position: 'absolute',
                    left: null,
                    top: null,
                    width: null,
                    height: null,
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    padding: 'none',
                    whiteSpace: 'nowrap',
                }
            }
        },
        childDOMs: {
            circle: document.createElement('div'),
            text: document.createElement('div'),
            textChild: {
                hour: document.createElement('div'),
                colon: document.createElement('div'),
                minute: document.createElement('div'),
            },
            ampm: {
                am: document.createElement('div'),
                pm: document.createElement('div'),
            }
        }
    }
    
    dom.timeDisplay.redraw = function () {
        var inner_left = dom.timeDisplay.data.radius - dom.timeDisplay.data.radius / Math.sqrt(2);
        var inner_top = dom.timeDisplay.data.radius - dom.timeDisplay.data.radius / Math.sqrt(2);
        var inner_width = dom.timeDisplay.data.radius / Math.sqrt(2) * 2;
        var inner_height = dom.timeDisplay.data.radius / Math.sqrt(2) * 2;

        dom.timeDisplay.styleObj.main.left = dom.timeDisplay.data.left + 'px';
        dom.timeDisplay.styleObj.main.top = dom.timeDisplay.data.top + 'px';
        dom.timeDisplay.styleObj.main.width = dom.timeDisplay.data.width + 'px';
        dom.timeDisplay.styleObj.main.height = dom.timeDisplay.data.height + 'px';
        dom.timeDisplay.styleObj.circle.width = dom.timeDisplay.data.width + 'px';
        dom.timeDisplay.styleObj.circle.height = dom.timeDisplay.data.height + 'px';
        dom.timeDisplay.styleObj.text.left = inner_left + 'px';
        dom.timeDisplay.styleObj.text.top = inner_top + 'px';
        dom.timeDisplay.styleObj.text.width = inner_width + 'px';
        dom.timeDisplay.styleObj.text.height = inner_height + 'px';
        dom.timeDisplay.styleObj.textChild.hour.width = inner_width * (dom.timeDisplay.data.textChildRatio.hour/dom.timeDisplay.data.textChildRatioSum) + 'px';
        dom.timeDisplay.styleObj.textChild.hour.height = inner_height + 'px';
        dom.timeDisplay.styleObj.textChild.colon.width = inner_width * (dom.timeDisplay.data.textChildRatio.colon/dom.timeDisplay.data.textChildRatioSum) + 'px';
        dom.timeDisplay.styleObj.textChild.colon.height = inner_height + 'px';
        dom.timeDisplay.styleObj.textChild.minute.width = inner_width * (dom.timeDisplay.data.textChildRatio.minute/dom.timeDisplay.data.textChildRatioSum) + 'px';
        dom.timeDisplay.styleObj.textChild.minute.height = inner_height + 'px';

        dom.timeDisplay.styleObj.textChild.hour.left = inner_left + 'px';
        dom.timeDisplay.styleObj.textChild.hour.top = inner_top + 'px';
        dom.timeDisplay.styleObj.textChild.colon.left = px2num(dom.timeDisplay.styleObj.textChild.hour.width) + inner_left + 'px';
        dom.timeDisplay.styleObj.textChild.colon.top = inner_top + 'px';
        dom.timeDisplay.styleObj.textChild.minute.left = px2num(dom.timeDisplay.styleObj.textChild.hour.width) + px2num(dom.timeDisplay.styleObj.textChild.colon.width) + inner_left + 'px';
        dom.timeDisplay.styleObj.textChild.minute.top = inner_top + 'px';

        var ampm_width = inner_width / 2;
        dom.timeDisplay.styleObj.ampm.am.left = inner_left + 'px';
        dom.timeDisplay.styleObj.ampm.am.top = inner_top + 'px';
        dom.timeDisplay.styleObj.ampm.am.width = ampm_width + 'px';
        dom.timeDisplay.styleObj.ampm.am.height = inner_height + 'px';
        dom.timeDisplay.styleObj.ampm.pm.left = inner_left + ampm_width + 'px';
        dom.timeDisplay.styleObj.ampm.pm.top = inner_top + 'px';
        dom.timeDisplay.styleObj.ampm.pm.width = ampm_width + 'px';
        dom.timeDisplay.styleObj.ampm.pm.height = inner_height + 'px';
        if(dom.timeDisplay.data.ampm === 'am') {
            dom.timeDisplay.styleObj.ampm.am.color = 'pink';
            dom.timeDisplay.styleObj.ampm.pm.color = 'black';
        } else if(dom.timeDisplay.data.ampm === 'pm') {
            dom.timeDisplay.styleObj.ampm.am.color = 'black';
            dom.timeDisplay.styleObj.ampm.pm.color = 'pink';
        } else if(dom.timeDisplay.data.ampm === null) {
            dom.timeDisplay.data.ampm = 'am';
            dom.timeDisplay.styleObj.ampm.am.color = 'pink';
            dom.timeDisplay.styleObj.ampm.pm.color = 'black';
        } else {
            throw '.timeDisplay.redraw(): value .timeDisplay.data.ampm is invalid.'
        }

        if(dom.timeDisplay.data.focused === 'hour') {
            dom.timeDisplay.styleObj.textChild.hour.color = 'pink';
            dom.timeDisplay.styleObj.textChild.minute.color = 'black';
        } else if(dom.timeDisplay.data.focused === 'minute') {
            dom.timeDisplay.styleObj.textChild.hour.color = 'black';
            dom.timeDisplay.styleObj.textChild.minute.color = 'pink';
        } else {
            dom.timeDisplay.styleObj.textChild.hour.color = 'black';
            dom.timeDisplay.styleObj.textChild.minute.color = 'black';
        }

        styleObjApply(dom, dom.timeDisplay.styleObj.main);
        styleObjApply(dom.timeDisplay.childDOMs.circle, dom.timeDisplay.styleObj.circle);
        styleObjApply(dom.timeDisplay.childDOMs.text, dom.timeDisplay.styleObj.text);
        styleObjApply(dom.timeDisplay.childDOMs.textChild.hour, dom.timeDisplay.styleObj.textChild.hour);
        styleObjApply(dom.timeDisplay.childDOMs.textChild.colon, dom.timeDisplay.styleObj.textChild.colon);
        styleObjApply(dom.timeDisplay.childDOMs.textChild.minute, dom.timeDisplay.styleObj.textChild.minute);
        styleObjApply(dom.timeDisplay.childDOMs.ampm.am, dom.timeDisplay.styleObj.ampm.am);
        styleObjApply(dom.timeDisplay.childDOMs.ampm.pm, dom.timeDisplay.styleObj.ampm.pm);

        dom.timeDisplay.childDOMs.text.textContent = zeroPadding(dom.timeDisplay.data.hour,2) + ':' + zeroPadding(dom.timeDisplay.data.minute,2);   //計算用ダミー。transparentで透過
        dom.timeDisplay.childDOMs.textChild.hour.textContent = zeroPadding(dom.timeDisplay.data.hour,2);
        dom.timeDisplay.childDOMs.textChild.minute.textContent = zeroPadding(dom.timeDisplay.data.minute,2);

        //一時的に補正用domを表示する
        dom.timeDisplay.childDOMs.text.style.display = 'inline';
        
        var changeFontSize = getFontSizeApply2Area(dom.timeDisplay.childDOMs.text) + 'px';
        dom.timeDisplay.childDOMs.text.style.fontSize = changeFontSize;
        Object.keys(dom.timeDisplay.childDOMs.textChild).forEach(function(key) {
            dom.timeDisplay.childDOMs.textChild[key].style.fontSize = changeFontSize;
        })

        //.childDOMs.text の位置修正
        var org_text_height = px2num(dom.timeDisplay.childDOMs.text.style.height);
        dom.timeDisplay.childDOMs.text.style.height = '';
        var new_text_height = dom.timeDisplay.childDOMs.text.clientHeight;
        var new_top = (px2num(dom.timeDisplay.childDOMs.text.style.top) + (org_text_height - new_text_height) / 2);
        dom.timeDisplay.childDOMs.text.style.height = new_text_height + 'px';
        dom.timeDisplay.childDOMs.text.style.top = new_top + 'px';
        Object.keys(dom.timeDisplay.childDOMs.textChild).forEach(function(key) {
            dom.timeDisplay.childDOMs.textChild[key].style.height = new_text_height + 'px';
            dom.timeDisplay.childDOMs.textChild[key].style.top = new_top + 'px';
        })

        var ampm_height = new_top - inner_top;
        dom.timeDisplay.styleObj.ampm.am.height = ampm_height + 'px';
        dom.timeDisplay.styleObj.ampm.pm.height = ampm_height + 'px';
        styleObjApply(dom.timeDisplay.childDOMs.ampm.am, dom.timeDisplay.styleObj.ampm.am);
        styleObjApply(dom.timeDisplay.childDOMs.ampm.pm, dom.timeDisplay.styleObj.ampm.pm);
        dom.timeDisplay.childDOMs.ampm.am.style.fontSize = getFontSizeApply2Area(dom.timeDisplay.childDOMs.ampm.am) + 'px';
        dom.timeDisplay.childDOMs.ampm.pm.style.fontSize = getFontSizeApply2Area(dom.timeDisplay.childDOMs.ampm.pm) + 'px';

        //補正用domを非表示にする
        dom.timeDisplay.childDOMs.text.style.display = 'none';
    }

    dom.timeDisplay.setTime = function(time) {
        dom.timeDisplay.data.ampm = time.ampm
        dom.timeDisplay.data.hour = time.hour;
        dom.timeDisplay.data.minute = time.minute;
        dom.timeDisplay.redraw();
    }

    dom.timeDisplay.setHour = function(hour) {
        dom.timeDisplay.data.hour = hour;
        dom.timeDisplay.redraw();
    }

    dom.timeDisplay.setMinute = function(minute) {
        dom.timeDisplay.data.minute = minute;
        dom.timeDisplay.redraw();
    }

    dom.timeDisplay.resize = function(width, height) {
        dom.timeDisplay.data.lengthOfEdge = Math.min(width, height);
        dom.timeDisplay.data.radius = Math.min(width, height) / 2;
        dom.timeDisplay.data.width = width;
        dom.timeDisplay.data.height = height;
        dom.timeDisplay.redraw();
    }
    dom.timeDisplay.moveCoordinateCenter = function(left, top) {
        dom.timeDisplay.data.left = left - dom.timeDisplay.data.radius;
        dom.timeDisplay.data.top = top - dom.timeDisplay.data.radius;
        dom.timeDisplay.redraw();
    }

    dom.timeDisplay.focus = function(target) {
        if(target==='hour') {
            dom.timeDisplay.data.focused = 'hour';
        } else if(target==='minute') {
            dom.timeDisplay.data.focused = 'minute';
        } else {
            console.error('TimeDisplay().timeDisplay.focus(): argument target is invalid.');
        }
        dom.timeDisplay.redraw();
    }
    dom.timeDisplay.amFunc = {
        clickEventFunc: function() {
            dom.timeDisplay.data.ampm = 'am';
            dom.timeDisplay.redraw();
        }
    }
    dom.timeDisplay.pmFunc = {
        clickEventFunc: function() {
            dom.timeDisplay.data.ampm = 'pm';
            dom.timeDisplay.redraw();
        }
    }

	//以下、初期化処理
    Object.keys(dom.timeDisplay.data.textChildRatio).forEach(key => {
        dom.timeDisplay.data.textChildRatioSum += dom.timeDisplay.data.textChildRatio[key];
    });
    dom.appendChild(dom.timeDisplay.childDOMs.circle);
    dom.appendChild(dom.timeDisplay.childDOMs.text);
    Object.keys(dom.timeDisplay.childDOMs.textChild).forEach(function(key) {
        dom.appendChild(dom.timeDisplay.childDOMs.textChild[key]);
    })
    dom.appendChild(dom.timeDisplay.childDOMs.ampm.am);
    dom.appendChild(dom.timeDisplay.childDOMs.ampm.pm);

    dom.timeDisplay.childDOMs.ampm.am.textContent = '午前';
    dom.timeDisplay.childDOMs.ampm.pm.textContent = '午後';
    dom.timeDisplay.childDOMs.textChild.colon.textContent = ':';
    initDOMStyle(dom.timeDisplay.childDOMs.text, ['fontSize']);
    initDOMStyle(dom.timeDisplay.childDOMs.ampm.am, ['fontSize']);
    initDOMStyle(dom.timeDisplay.childDOMs.ampm.pm, ['fontSize']);

    dom.timeDisplay.childDOMs.textChild.hour.addEventListener('click', function() {
        dom.timeDisplay.focus('hour');
    })
    dom.timeDisplay.childDOMs.textChild.minute.addEventListener('click', function() {
        dom.timeDisplay.focus('minute');
    })
    dom.timeDisplay.childDOMs.ampm.am.addEventListener('click', dom.timeDisplay.amFunc.clickEventFunc);
    dom.timeDisplay.childDOMs.ampm.pm.addEventListener('click', dom.timeDisplay.pmFunc.clickEventFunc);

    dom.timeDisplay.redraw();
    return dom;
}
