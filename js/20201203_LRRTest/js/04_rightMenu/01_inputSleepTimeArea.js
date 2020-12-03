function InputSleepTimeArea(dom, width, height) {
    dom.inputSleepTimeArea = {
        data: {
            left: 0,
            top: 0,
            width: width,
            height: height,
            sleepTimeLength: null,
            layoutRate: {
                'title': 2,
                'inputArea': 4,
                'unit': 1,
            },
            layoutRateTotal: null,
        },
        styleObj: {
            main: {
                backgroundColor: 'lightgreen',
                color: 'white',
                width: null,
                height: null,
            },
            title: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: null,
                height: null,
            },
            inputArea: {
                position: 'absolute',
                left: null,
                top: 0,
                backgroundColor: 'white',
            },
            unit: {
                position: 'absolute',
                width: null,
                height: null,
                left: null,
                top: 0,
                
            },
        },
        childDOMs: {
            title: document.createElement('div'),
            inputArea: document.createElement('div'),
            unit: document.createElement('div'),
        }
    }

    dom.inputSleepTimeArea.getValues = function() {
        return dom.inputSleepTimeArea.childDOMs.inputArea.ntgg.childDOMs.text.value;
    }

    dom.inputSleepTimeArea.setValues = function(value) {
        dom.inputSleepTimeArea.childDOMs.inputArea.ntgg.setText(value);
    }

    dom.inputSleepTimeArea.redraw = function() {
        dom.inputSleepTimeArea.styleObj.main.width = dom.inputSleepTimeArea.data.width + 'px';
        dom.inputSleepTimeArea.styleObj.main.height = dom.inputSleepTimeArea.data.height + 'px';
        dom.inputSleepTimeArea.styleObj.title.width = dom.inputSleepTimeArea.data.width * dom.inputSleepTimeArea.data.layoutRate.title / dom.inputSleepTimeArea.data.layoutRateTotal + 'px';
        dom.inputSleepTimeArea.styleObj.title.height = dom.inputSleepTimeArea.data.height + 'px';
        dom.inputSleepTimeArea.styleObj.inputArea.left = dom.inputSleepTimeArea.data.width * dom.inputSleepTimeArea.data.layoutRate.title / dom.inputSleepTimeArea.data.layoutRateTotal + 'px';
        dom.inputSleepTimeArea.styleObj.inputArea.top = dom.inputSleepTimeArea.data.height / 3 + 'px';
        dom.inputSleepTimeArea.styleObj.unit.width = dom.inputSleepTimeArea.data.width * dom.inputSleepTimeArea.data.layoutRate.unit / dom.inputSleepTimeArea.data.layoutRateTotal + 'px';
        dom.inputSleepTimeArea.styleObj.unit.height = dom.inputSleepTimeArea.data.height / 2 + 'px';
        dom.inputSleepTimeArea.styleObj.unit.left = dom.inputSleepTimeArea.data.width * (dom.inputSleepTimeArea.data.layoutRate.title + dom.inputSleepTimeArea.data.layoutRate.inputArea) / dom.inputSleepTimeArea.data.layoutRateTotal + 'px';
        dom.inputSleepTimeArea.styleObj.unit.top = dom.inputSleepTimeArea.data.height / 2 + 'px';
        dom.inputSleepTimeArea.childDOMs.inputArea.ntgg.resize(dom.inputSleepTimeArea.data.width * dom.inputSleepTimeArea.data.layoutRate.inputArea / dom.inputSleepTimeArea.data.layoutRateTotal, dom.inputSleepTimeArea.data.height * 2 / 3);
        styleObjApply(dom, dom.inputSleepTimeArea.styleObj.main);
        styleObjApply(dom.inputSleepTimeArea.childDOMs.title, dom.inputSleepTimeArea.styleObj.title);
        styleObjApply(dom.inputSleepTimeArea.childDOMs.inputArea, dom.inputSleepTimeArea.styleObj.inputArea);
        styleObjApply(dom.inputSleepTimeArea.childDOMs.unit, dom.inputSleepTimeArea.styleObj.unit);
        applyString2Area(dom.inputSleepTimeArea.childDOMs.title);
        applyString2Area(dom.inputSleepTimeArea.childDOMs.unit);
    }

    dom.inputSleepTimeArea.getValue = function() {
        return dom.inputSleepTimeArea.childDOMs.inputArea.ntgg.childDOMs.text.value;
    }

    //初期化
    dom.inputSleepTimeArea.data.layoutRateTotal = 0;
    Object.keys(dom.inputSleepTimeArea.data.layoutRate).forEach(function(key) {
        dom.inputSleepTimeArea.data.layoutRateTotal += dom.inputSleepTimeArea.data.layoutRate[key];
    })

    dom.appendChild(dom.inputSleepTimeArea.childDOMs.title);
    dom.appendChild(dom.inputSleepTimeArea.childDOMs.inputArea);
    dom.appendChild(dom.inputSleepTimeArea.childDOMs.unit);

    dom.inputSleepTimeArea.childDOMs.title.textContent = '睡眠時間';

    new NoTextGrayGuide(dom.inputSleepTimeArea.childDOMs.inputArea, '時間を入力', );
    
    dom.inputSleepTimeArea.childDOMs.unit.textContent = '時間';

    dom.inputSleepTimeArea.redraw();

    return dom;
}

