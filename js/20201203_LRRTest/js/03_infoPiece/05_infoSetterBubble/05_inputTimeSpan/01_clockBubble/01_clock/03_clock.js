function Clock(dom, init_radius, incrementMinute) {
    dom.clock = {
        data: {
            left: 0,
            top: 0,
            width: init_radius*2,
            height: init_radius*2,
            lengthOfEdge: Math.min(init_radius*2, init_radius*2),
            radius: null,
            timeRadius: null,
            times_coordinate: [],
            time_magnification: 0.5,
            time_quantity: 12,
            display_time_quantity: {
                hour: 12,
                minute: 60 / incrementMinute, //12の約数にすること
            },
            displayMode: 'hour',    //初期値はhour、時間を表示する。funcで切り替える
        },
        styleObj: {
            main: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: init_radius*2 + 'px',
                height: init_radius*2 + 'px',
            },
            clock: {
                borderRadius: '50%',
                boxShadow: '0 0 0 1px lightgray',
                width: null,
                height: null,
                backgroundColor: 'lightgreen',
            }
        },
        childDOMs: {
            clock: document.createElement('div'),
            time_dial: [],
            small_time_dial0: document.createElement('div'),
            small_time_dial12: document.createElement('div'),
            time_display: document.createElement('div')
        },
        timeDialFunc: {
            clickEventFunc: null,
        },
    }
    dom.appendChild(dom.clock.childDOMs.clock);

    dom.clock.redraw = function () {
        dom.clock.data.times_coordinate = dom.clock.calcTimesCoordinate(dom.clock.data.time_magnification + (1 - dom.clock.data.time_magnification) / 2);

        dom.clock.styleObj.main.width = dom.clock.data.width + 'px';
        dom.clock.styleObj.main.height = dom.clock.data.height + 'px';
        dom.clock.styleObj.main.left = dom.clock.data.left + 'px';
        dom.clock.styleObj.main.top = dom.clock.data.top + 'px';
        dom.clock.styleObj.clock.width = dom.clock.data.lengthOfEdge + 'px';
        dom.clock.styleObj.clock.height = dom.clock.data.lengthOfEdge + 'px';
        styleObjApply(dom, dom.clock.styleObj.main);
        styleObjApply(dom.clock.childDOMs.clock, dom.clock.styleObj.clock);
        dom.clock.childDOMs.time_display.timeDisplay.resize(dom.clock.data.time_magnification * dom.clock.data.radius * 2, dom.clock.data.time_magnification * dom.clock.data.radius * 2);
        dom.clock.childDOMs.time_display.timeDisplay.moveCoordinateCenter(dom.clock.data.radius, dom.clock.data.radius);
        for (var i = 1; i < dom.clock.data.times_coordinate.length; i++) {
            dom.clock.childDOMs.time_dial[i].cs.resize(dom.clock.data.timeRadius * 2, dom.clock.data.timeRadius * 2);
            var tmp_left = dom.clock.data.times_coordinate[i].x + dom.clock.data.radius;
            var tmp_top = dom.clock.data.times_coordinate[i].y + dom.clock.data.radius;
            dom.clock.childDOMs.time_dial[i].cs.moveCoordinateCenter(tmp_left, tmp_top);
        }
        dom.clock.childDOMs.small_time_dial0.cs.resize(dom.clock.data.timeRadius * 2 * 0.6, dom.clock.data.timeRadius * 2 * 0.6);
        var small_time_dial0_left = dom.clock.data.times_coordinate[0].x * 1.18 + dom.clock.data.radius;
        var small_time_dial0_top = dom.clock.data.times_coordinate[0].y * 1.18 + dom.clock.data.radius;
        dom.clock.childDOMs.small_time_dial0.cs.moveCoordinateCenter(small_time_dial0_left, small_time_dial0_top);

        dom.clock.childDOMs.small_time_dial12.cs.resize(dom.clock.data.timeRadius * 2 * 0.6, dom.clock.data.timeRadius * 2 * 0.6);
        var small_time_dial12_left = dom.clock.data.times_coordinate[0].x * 0.85 + dom.clock.data.radius;
        var small_time_dial12_top = dom.clock.data.times_coordinate[0].y * 0.85 + dom.clock.data.radius;
        dom.clock.childDOMs.small_time_dial12.cs.moveCoordinateCenter(small_time_dial12_left, small_time_dial12_top);
    }
    dom.clock.resize = function (radius) {
        dom.clock.data.width = 2*radius;
        dom.clock.data.height = 2*radius;
        dom.clock.data.lengthOfEdge = Math.min(dom.clock.data.width, dom.clock.data.height);
        dom.clock.data.radius = Math.min(dom.clock.data.width, dom.clock.data.height) / 2;
        dom.clock.data.timeRadius = calcTimeRadius();
        dom.clock.redraw();
    }
    dom.clock.moveCoordinate = function (left, top) {
        dom.clock.data.left = left;
        dom.clock.data.top = top
        dom.clock.redraw();
    }

    dom.clock.changeDisplayMode = function (hourOrMinute) {
        if (hourOrMinute === 'hour' && dom.clock.data.displayMode !== 'minute') {
            dom.clock.changeDisplayModeHour();
        } else if (hourOrMinute === 'minute' && dom.clock.data.displayMode !== 'hour') {
            dom.clock.changeDisplayModeMinute();
        }
    }
    dom.clock.changeDisplayModeHour = function () {
        dom.clock.data.displayMode = 'hour';
        var display_interval = dom.clock.data.time_quantity / dom.clock.data.display_time_quantity.hour;
        for (var i = 1; i < dom.clock.data.time_quantity; i++) {
            var isDisplayCircle = (i / display_interval === Math.floor(i / display_interval));
            if(isDisplayCircle) {
                dom.clock.childDOMs.time_dial[i].cs.setText(i * (12 / dom.clock.data.time_quantity));
                dom.clock.childDOMs.time_dial[i].addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.time_dial[i] });
            } else {
                dom.clock.childDOMs.time_dial[i].cs.setText('');
                dom.clock.childDOMs.time_dial[i].removeEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.time_dial[i] });
            }
        }
        dom.clock.childDOMs.small_time_dial0.cs.setText('0');
        dom.clock.childDOMs.small_time_dial0.addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.small_time_dial0 });
        dom.clock.childDOMs.small_time_dial12.cs.setText('12');
        dom.clock.childDOMs.small_time_dial12.addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.small_time_dial12 });
        dom.clock.timeDialColorReset();
        dom.clock.redraw();
    }
    dom.clock.changeDisplayModeMinute = function () {
        dom.clock.data.displayMode = 'minute';
        var display_interval = dom.clock.data.time_quantity / dom.clock.data.display_time_quantity.minute;
        for (var i = 1; i < dom.clock.data.time_quantity; i++) {
            var isDisplayCircle = (i / display_interval === Math.floor(i / display_interval));
            if(isDisplayCircle) {
                dom.clock.childDOMs.time_dial[i].cs.setText(i * (60 / dom.clock.data.time_quantity));
                dom.clock.childDOMs.time_dial[i].addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.time_dial[i] });
            } else {
                dom.clock.childDOMs.time_dial[i].cs.setText('');
                dom.clock.childDOMs.time_dial[i].removeEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.time_dial[i] });
            }
        }
        dom.clock.childDOMs.small_time_dial0.cs.setText(5 * 0);
        dom.clock.childDOMs.small_time_dial0.addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.small_time_dial0 });
        dom.clock.childDOMs.small_time_dial12.cs.setText('');
        dom.clock.childDOMs.small_time_dial12.removeEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.small_time_dial12 });
        dom.clock.timeDialColorReset();
        dom.clock.redraw();
    }

    //中心から各頂点への移動を計算
    dom.clock.calcTimesCoordinate = function (magnification) {
        var len1 = magnification * (dom.clock.data.radius);
        var len2 = magnification * (dom.clock.data.radius / 2);
        var len3 = magnification * (dom.clock.data.radius / 2 * Math.sqrt(3));
        return [
            //0
            { x: 0, y: 0 - len1 },
            //1
            { x: len2, y: 0 - len3 },
            //2
            { x: len3, y: 0 - len2 },
            //3
            { x: len1, y: 0 },
            //4
            { x: len3, y: len2 },
            //5
            { x: len2, y: len3 },
            //6
            { x: 0, y: len1 },
            //7
            { x: 0 - len2, y: len3 },
            //8
            { x: 0 - len3, y: len2 },
            //9
            { x: 0 - len1, y: 0 },
            //10
            { x: 0 - len3, y: 0 - len2 },
            //11
            { x: 0 - len2, y: 0 - len3 }
        ]
    }

    var calcTimeRadius = function () {
        //console.log('calcTimeRadius(): called.')
        var cos15 = (Math.sqrt(6) - Math.sqrt(2)) / 4;
        var distanceBetweenCircleCenter = 2 * cos15 * (dom.clock.data.radius * (dom.clock.data.time_magnification + (1 - dom.clock.data.time_magnification) / 2));
        var radiusCalcFromCircleWidth = distanceBetweenCircleCenter / 2;
        var radiusCalcFromClockRadius = dom.clock.data.radius * (1 - dom.clock.data.time_magnification) / 2;
        return Math.min(radiusCalcFromCircleWidth * 0.9, radiusCalcFromClockRadius);
    }

    dom.clock.timeDialColorReset = function () {
        for (var i = 1; i < dom.clock.childDOMs.time_dial.length; i++) {
            dom.clock.childDOMs.time_dial[i].cs.lightDown();
        }
        dom.clock.childDOMs.small_time_dial0.cs.lightDown();
        dom.clock.childDOMs.small_time_dial12.cs.lightDown();
    }
    dom.clock.timeDialFunc.clickEventFunc = function (e) {
        dom.clock.selectTimeDial(this.targetDOM);
    }

    dom.clock.selectTimeDial = function(timeDial) {
        if (dom.clock.data.displayMode === 'hour') {
            dom.clock.childDOMs.time_display.timeDisplay.setHour(timeDial.cs.data.text);
        } else if (dom.clock.data.displayMode === 'minute') {
            dom.clock.childDOMs.time_display.timeDisplay.setMinute(timeDial.cs.data.text);
        } else {
            throw 'Clock().clock.timeDialFunc.clickEventFunc(): displayMode is invalid.';
        }
        dom.clock.timeDialColorReset();
        timeDial.cs.lightUp();
    }

    dom.clock.data.radius = Math.min(dom.clock.data.width, dom.clock.data.height) / 2;
    dom.clock.data.timeRadius = calcTimeRadius();
    dom.appendChild(dom.clock.childDOMs.time_display);
    new TimeDisplay(dom.clock.childDOMs.time_display, 0, 0, dom.clock.data.time_magnification * dom.clock.data.radius * 2, dom.clock.data.time_magnification * dom.clock.data.radius * 2);
    dom.clock.childDOMs.time_display.timeDisplay.focus('hour');
    dom.clock.childDOMs.time_display.timeDisplay.childDOMs.textChild.hour.addEventListener('click', dom.clock.changeDisplayModeHour);
    dom.clock.childDOMs.time_display.timeDisplay.childDOMs.textChild.minute.addEventListener('click', dom.clock.changeDisplayModeMinute);
    for (var i = 1; i < dom.clock.data.time_quantity; i++) {
        dom.clock.childDOMs.time_dial[i] = document.createElement('div');
        dom.appendChild(dom.clock.childDOMs.time_dial[i]);
        new CircleString(dom.clock.childDOMs.time_dial[i], i, dom.clock.data.timeRadius * 2, dom.clock.data.timeRadius * 2);
        dom.clock.childDOMs.time_dial[i].addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.time_dial[i] });
    }

    dom.appendChild(dom.clock.childDOMs.small_time_dial0);
    new CircleString(dom.clock.childDOMs.small_time_dial0, 0, dom.clock.data.timeRadius * 2, dom.clock.data.timeRadius * 2);
    dom.clock.childDOMs.small_time_dial0.addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.small_time_dial0 });

    dom.appendChild(dom.clock.childDOMs.small_time_dial12);
    new CircleString(dom.clock.childDOMs.small_time_dial12, 12, dom.clock.data.timeRadius * 2, dom.clock.data.timeRadius * 2);
    dom.clock.childDOMs.small_time_dial12.addEventListener('mousedown', { handleEvent: dom.clock.timeDialFunc.clickEventFunc, targetDOM: dom.clock.childDOMs.small_time_dial12 });

    dom.clock.getTime = function() {
        return {
            ampm: dom.clock.childDOMs.time_display.timeDisplay.data.ampm,
            hour: dom.clock.childDOMs.time_display.timeDisplay.data.hour,
            minute: dom.clock.childDOMs.time_display.timeDisplay.data.minute,
        }
    }

    dom.clock.queryTimeDialFromTime = function(time) {
        if(dom.clock.data.displayMode==='hour') {
            var hour_per_dial = 12 / dom.clock.data.display_time_quantity.hour;
            var dial_num = time.hour / hour_per_dial;
            if(dial_num===0) {
                return dom.clock.childDOMs.small_time_dial0;
            } else if(dial_num===12) {
                return dom.clock.childDOMs.small_time_dial12;
            } else {
                return dom.clock.childDOMs.time_dial[dial_num];
            }
        } else if(dom.clock.data.displayMode==='minute') {
            var minute_per_dial = 60 / dom.clock.data.display_time_quantity.minute;
            var dial_num = time.minute / minute_per_dial;
            if(dial_num===0) {
                return dom.clock.childDOMs.small_time_dial0;
            } else if(dial_num===12) {
                return dom.clock.childDOMs.small_time_dial12;
            } else {
                return dom.clock.childDOMs.time_dial[dial_num];
            }
        } else {
            throw '.clock.selectTimeDialFromTime(): argument .clock.data.displayMode is invalid.';
        }
    }

    dom.clock.setTime = function(time) {
        //timeDisplay のsetTime()
        dom.clock.childDOMs.time_display.timeDisplay.setTime(time);

        //timeDial のsetTime相当
        dom.clock.selectTimeDial(dom.clock.queryTimeDialFromTime(time));
    }

    dom.clock.redraw();
    return dom;
}
