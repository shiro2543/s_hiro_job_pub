//height_per_timeはwcdmfpのblock_heightに合わせる
function TimeRuler(dom, width, height, incrementMinute) {
    var incrementDiv = 60 / incrementMinute;
    if (incrementDiv !== Math.floor(incrementDiv)) {
        throw 'Error: TimeRuler(): increment can\'t divide 60 minute.';
    }
    dom.timeRuler = {
        data: {
            width: width,
            height: height,
            left: 0,
            right: 0,
            incrementMinute: incrementMinute,
            time_quantity: (24 * 60) / incrementMinute,    //(24h * 60min / increment)
            height_per_time: null,
            time_str_height: null,
            timeArray: null,
        },
        styleObj: {
            main: {
                position: 'absolute',
                width: width + 'px',
                height: null,
                left: null,
                top: null,
            },
            time: {
                position: 'absolute',
                width: width + 'px',
                height: null,
                left: 0,
                top: 0,
                textAlign: 'right',
                paddingRight: '3px'
            }
        },
        childDOMs: {
            times: []
        },
        //0時からincrement分刻みごとの時間の配列を返す
        getTimeArray: function (increment) {
            var result = [];
            for (var i = 0; i < Math.floor(24 * 60 / increment); i++) {
                var tmp_minute = i * increment;
                result.push({
                    hour: Math.floor(tmp_minute / 60),
                    minute: tmp_minute % 60
                });
            }
            return result;
        },
        moveCoordinate: function (left, top) {
            dom.timeRuler.data.left = left;
            dom.timeRuler.data.top = top;
            dom.timeRuler.redraw();
        },
    }
    dom.timeRuler.redraw = function () {
        dom.timeRuler.data.height_per_time = Math.floor(dom.timeRuler.data.height / dom.timeRuler.data.time_quantity);
        dom.timeRuler.data.time_str_height = dom.timeRuler.data.height_per_time * 0.8;
        dom.timeRuler.styleObj.main.width = dom.timeRuler.data.width + 'px';
        dom.timeRuler.styleObj.main.height = dom.timeRuler.data.height_per_time * dom.timeRuler.data.time_quantity + 'px';
        dom.timeRuler.styleObj.main.left = dom.timeRuler.data.left + 'px';
        dom.timeRuler.styleObj.main.top = dom.timeRuler.data.top + 'px';
        styleObjApply(dom, dom.timeRuler.styleObj.main);

        dom.timeRuler.styleObj.time.width = dom.timeRuler.data.width + 'px';
        dom.timeRuler.styleObj.time.height = dom.timeRuler.data.time_str_height + 'px';
        for (var i = 0; i < dom.timeRuler.childDOMs.times.length; i++) {
            var childDOM = dom.timeRuler.childDOMs.times[i];
            childDOM.timeRuler.styleObj = JSON.parse(JSON.stringify(dom.timeRuler.styleObj.time))
            childDOM.timeRuler.styleObj.top = (i+1) * dom.timeRuler.data.height_per_time - dom.timeRuler.data.height_per_time / 2 + 'px';
            styleObjApply(childDOM, childDOM.timeRuler.styleObj);
            applyString2Area(childDOM);
        }
    }
    dom.timeRuler.resize = function (width, height) {
        dom.timeRuler.data.width = width;
        dom.timeRuler.data.height = height;
        dom.timeRuler.redraw();
    }

    //初期化
    dom.timeRuler.data.height_per_time = Math.floor(dom.timeRuler.data.height / dom.timeRuler.data.time_quantity);
    dom.timeRuler.data.time_str_height = dom.timeRuler.data.height_per_time * 0.8;
    dom.timeRuler.data.timeArray = dom.timeRuler.getTimeArray(dom.timeRuler.data.incrementMinute);
    dom.timeRuler.styleObj.time.width = dom.timeRuler.data.width + 'px';
    dom.timeRuler.styleObj.time.height = dom.timeRuler.data.time_str_height + 'px';
    for (var i = 1; i < dom.timeRuler.data.timeArray.length; i++) {
        var childDOM = document.createElement('div');
        dom.appendChild(childDOM);
        dom.timeRuler.childDOMs.times.push(childDOM);
        childDOM.textContent = zeroPadding(dom.timeRuler.data.timeArray[i].hour, 2) + ':' + zeroPadding(dom.timeRuler.data.timeArray[i].minute, 2);
        childDOM.timeRuler = {
            time_index: i,
            styleObj: JSON.parse(JSON.stringify(dom.timeRuler.styleObj.time))
        }
        styleObjApply(childDOM, childDOM.timeRuler.styleObj);
        initDOMStyle(childDOM, ['fontSize']);
        applyString2Area(childDOM);
    }
    dom.timeRuler.redraw();

    return dom;
}
