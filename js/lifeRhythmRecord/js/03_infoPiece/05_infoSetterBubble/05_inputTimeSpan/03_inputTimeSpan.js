//inputtimeformを2つ持ち、時間の範囲を表示する
function InputTimeSpan(dom, init_width, init_height, init_radius, clockIncrementMinute) {
    dom.inputTimeSpan = {
        data: {
            left: 0,
            top: 0,
            width: init_width,
            height: init_height,
            clockRadius: init_radius,
            operatingTimeDOM: null,
            widthRatio: {
                startTime: 7,
                wave: 1,
                endTime: 7,
            },
            widthMagnification: {
                startTime: null,
                wave: null,
                endTime: null,
            }
        },
        styleObj: {
            main: {
                left: null,
                top: null,
                width: null,
                height: null,
                backgroundColor: 'white',
            },
            wave: {
                position: 'absolute',
                left: null,
                top: 0,
                width: null,
                height: null,
                textAlign: 'center',
            }
        },
        childDOMs: {
            time: {
                start: document.createElement('div'),
                end: document.createElement('div'),
            },
            wave: document.createElement('div'),
        },
        startTimeFunc: {
            clickEventFunc: function() {
                if(dom.inputTimeSpan.data.operatingTimeDOM===null) {
                    dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockDisplay();
                    dom.inputTimeSpan.data.operatingTimeDOM = 'start';
                } else if(dom.inputTimeSpan.data.operatingTimeDOM==='end') {
                    dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockHide();
                    dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockDisplay();
                    dom.inputTimeSpan.data.operatingTimeDOM = 'start';
                } else if(dom.inputTimeSpan.data.operatingTimeDOM==='start') {
                    dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockHide();
                    dom.inputTimeSpan.data.operatingTimeDOM = null;
                } else {
                    throw '.inputTimeSpan.startTimeFunc.clickEventFunc(): argument .inputTimeSpan.data.operationgTimeDOM is invalid.';
                }
            }
        },
        endTimeFunc: {
            clickEventFunc: function() {
                if(dom.inputTimeSpan.data.operatingTimeDOM===null) {
                    dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockDisplay();
                    dom.inputTimeSpan.data.operatingTimeDOM = 'end';
                } else if(dom.inputTimeSpan.data.operatingTimeDOM==='start') {
                    dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockHide();
                    dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockDisplay();
                    dom.inputTimeSpan.data.operatingTimeDOM = 'end';
                } else if(dom.inputTimeSpan.data.operatingTimeDOM==='end') {
                    dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockHide();
                    dom.inputTimeSpan.data.operatingTimeDOM = null;
                } else {
                    throw '.inputTimeSpan.endTimeFunc.clickEventFunc(): argument .inputTimeSpan.data.operationgTimeDOM is invalid.';
                }
            }
        }
    }

    dom.inputTimeSpan.redraw = function() {
        var startTimeWidth = dom.inputTimeSpan.data.width * dom.inputTimeSpan.data.widthMagnification['startTime'];
        var waveWidth = dom.inputTimeSpan.data.width * dom.inputTimeSpan.data.widthMagnification['wave'];
        var endTimeWidth = dom.inputTimeSpan.data.width * dom.inputTimeSpan.data.widthMagnification['endTime'];

        dom.inputTimeSpan.styleObj.main.left = dom.inputTimeSpan.data.left + 'px';
        dom.inputTimeSpan.styleObj.main.top = dom.inputTimeSpan.data.top + 'px';
        dom.inputTimeSpan.styleObj.main.width = dom.inputTimeSpan.data.width + 'px';
        dom.inputTimeSpan.styleObj.main.height = dom.inputTimeSpan.data.height + 'px';
        styleObjApply(dom, dom.inputTimeSpan.styleObj.main);

        dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.resize(startTimeWidth, dom.inputTimeSpan.data.height);
        dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.resizeClock(dom.inputTimeSpan.data.clockRadius);
        dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.moveCoordinate(0,0);

        dom.inputTimeSpan.styleObj.wave.left = startTimeWidth + 'px';
        dom.inputTimeSpan.styleObj.wave.width = waveWidth + 'px';
        dom.inputTimeSpan.styleObj.wave.height = dom.inputTimeSpan.data.height + 'px';
        styleObjApply(dom.inputTimeSpan.childDOMs.wave, dom.inputTimeSpan.styleObj.wave);
        dom.inputTimeSpan.childDOMs.wave.style.fontSize = getFontSizeApply2Area(dom.inputTimeSpan.childDOMs.wave) + 'px';

        dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.resize(endTimeWidth, dom.inputTimeSpan.data.height);
        dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.resizeClock(dom.inputTimeSpan.data.clockRadius);
        dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.moveCoordinate(startTimeWidth+waveWidth, 0);

        if(dom.inputTimeSpan.data.operatingTimeDOM===null) {
            dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockHide();
            dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockHide();
        } else if(dom.inputTimeSpan.data.operatingTimeDOM==='start') {
            dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockDisplay();
            dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockHide();
        } else if(dom.inputTimeSpan.data.operatingTimeDOM==='end') {
            dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockHide();
            dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockDisplay();
        } else {
            throw '.inputTimeSpan.redraw(): argument .inputTimeSpan.data.operationgTimeDOM is invalid.'
        }
    }

    dom.inputTimeSpan.moveCoordinate = function(left, top) {
        dom.inputTimeSpan.data.left = left;
        dom.inputTimeSpan.data.top = top;
        dom.inputTimeSpan.redraw();
    }

    dom.inputTimeSpan.resize = function(width, height) {
        dom.inputTimeSpan.data.width = width;
        dom.inputTimeSpan.data.height = height;
        dom.inputTimeSpan.redraw();
    }

    dom.inputTimeSpan.resizeClock = function(radius) {
        dom.inputTimeSpan.data.clockRadius = radius;
        dom.inputTimeSpan.redraw();
    }

    dom.inputTimeSpan.clockHide = function() {
        dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockHide();
        dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockHide();
    }

    dom.appendChild(dom.inputTimeSpan.childDOMs.time.start);
    dom.appendChild(dom.inputTimeSpan.childDOMs.wave);
    dom.appendChild(dom.inputTimeSpan.childDOMs.time.end);

    var widthRatioSum = 0;
    Object.keys(dom.inputTimeSpan.data.widthRatio).forEach(key => {
        widthRatioSum += dom.inputTimeSpan.data.widthRatio[key];
    });
    dom.inputTimeSpan.data.widthMagnification['startTime'] = dom.inputTimeSpan.data.widthRatio['startTime'] / widthRatioSum;
    dom.inputTimeSpan.data.widthMagnification['wave'] = dom.inputTimeSpan.data.widthRatio['wave'] / widthRatioSum;
    dom.inputTimeSpan.data.widthMagnification['endTime'] = dom.inputTimeSpan.data.widthRatio['endTime'] / widthRatioSum;

    var initStartTimeWidth = dom.inputTimeSpan.data.width * dom.inputTimeSpan.data.widthMagnification['startTime'];
    var initWaveWidth = dom.inputTimeSpan.data.width * dom.inputTimeSpan.data.widthMagnification['wave'];
    var initEndTimeWidth = dom.inputTimeSpan.data.width * dom.inputTimeSpan.data.widthMagnification['endTime'];

    new InputTimeForm(dom.inputTimeSpan.childDOMs.time.start, '開始時間を入力',initStartTimeWidth,init_height,init_radius, clockIncrementMinute);
    dom.inputTimeSpan.childDOMs.wave.textContent = '～';
    initDOMStyle(dom.inputTimeSpan.childDOMs.wave, ['fontSize', 'width', 'height', 'left', 'top']);
    new InputTimeForm(dom.inputTimeSpan.childDOMs.time.end, '終了時間を入力',initEndTimeWidth,init_height,init_radius, clockIncrementMinute);

    dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.clockHide();
    dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.clockHide();

    dom.inputTimeSpan.childDOMs.time.start.inputTimeForm.childDOMs.displayArea.addEventListener('click', dom.inputTimeSpan.startTimeFunc.clickEventFunc);
    dom.inputTimeSpan.childDOMs.time.end.inputTimeForm.childDOMs.displayArea.addEventListener('click', dom.inputTimeSpan.endTimeFunc.clickEventFunc);

    dom.inputTimeSpan.redraw();
    return dom;
}
