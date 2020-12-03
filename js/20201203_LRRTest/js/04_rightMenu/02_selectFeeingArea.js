function SelectFeelingArea(dom, init_width, init_height, init_button_quantity_per_line, weatherList, title) {
    dom.selectFeelingArea = {
        data: {
            selectedButton: null,
            width: init_width,
            height: init_height,
            buttonQuantity: 0,
            weatherList: weatherList,
            selectedValue: null,

            buttonQuantityPerLine: init_button_quantity_per_line,
            lineQuantity: null,
            button_width: null,
            button_height: null,
            borderWidth: null,

            title: title,
        },
        styleObj: {
            main: {
                overflow: 'hidden',
                backgroundColor: 'lightgreen',
                color: 'white',
                padding: 0,
                margin: 0,
            },
            scrollFrame: {
                position: 'relative',
                width: null,
                height: null,
            },
            button: {
                border: 0 + 'px solid transparent',
                overflow: 'hidden',
                whitespace: 'nowrap',
                width: null,
                height: null,
                position: 'absolute',
                textAlign: 'center',
                padding: '0',
                margin: '0',
            },
            buttonSelected: {
                border: 0 + 'px solid pink',
                overflow: 'hidden',
                whitespace: 'nowrap',
                width: null,
                height: null,
                position: 'absolute',
                textAlign: 'center',
                padding: '0',
                margin: '0',
            },
            buttonFocused: {
                border: 0 + 'px solid lightblue',
                overflow: 'hidden',
                whitespace: 'nowrap',
                width: null,
                height: null,
                position: 'absolute',
                textAlign: 'center',
                padding: '0',
                margin: '0',
            },
            buttonCoordinate: {},
            title: {
                width: null,
                height: null,
                display: 'block',
                position: 'absolute',
            }
        },
        childDOMs: {
            scrollFrame: document.createElement('div'),
            selectButton: {},
            title: document.createElement('div'),
        },
    }

    dom.selectFeelingArea.getValues = function() {
        return dom.selectFeelingArea.data.selectedValue;
    }

    dom.selectFeelingArea.setValues = function(value) {
        dom.selectFeelingArea.setButton(value);
    }

    dom.selectFeelingArea.redraw = function () {
        dom.selectFeelingArea.styleObj.main.width = dom.selectFeelingArea.data.width + 'px';
        dom.selectFeelingArea.styleObj.main.height = dom.selectFeelingArea.data.height + 'px';
        styleObjApply(dom, dom.selectFeelingArea.styleObj.main);

        dom.selectFeelingArea.styleObj.scrollFrame.width = dom.selectFeelingArea.data.button_width * Math.floor(dom.selectFeelingArea.data.width / dom.selectFeelingArea.data.button_width) + 'px';
        dom.selectFeelingArea.styleObj.scrollFrame.height = dom.selectFeelingArea.data.button_height * (dom.selectFeelingArea.data.button_width * Object.keys(weatherList).length) / dom.selectFeelingArea.data.width + 'px';
        styleObjApply(dom.selectFeelingArea.childDOMs.scrollFrame, dom.selectFeelingArea.styleObj.scrollFrame);

        //buttonwidthとheightの調整)
        dom.selectFeelingArea.data.button_width = dom.selectFeelingArea.data.width / (dom.selectFeelingArea.data.buttonQuantityPerLine + 1);
        dom.selectFeelingArea.data.lineQuantity = Math.ceil(Object.keys(weatherList).length / dom.selectFeelingArea.data.buttonQuantityPerLine);
        dom.selectFeelingArea.data.button_height = dom.selectFeelingArea.data.height / dom.selectFeelingArea.data.lineQuantity;
        dom.selectFeelingArea.data.borderWidth = Math.min(dom.selectFeelingArea.data.button_width, dom.selectFeelingArea.data.button_height) * 0.1;

        //console.log('.SelectFeelingArea.data.button_width: ' + dom.selectFeelingArea.data.button_width);
        dom.selectFeelingArea.styleObj.button.width = dom.selectFeelingArea.data.button_width + 'px';
        dom.selectFeelingArea.styleObj.button.height = dom.selectFeelingArea.data.button_height + 'px';
        dom.selectFeelingArea.styleObj.button.border = dom.selectFeelingArea.data.borderWidth + 'px solid transparent';
        dom.selectFeelingArea.styleObj.buttonSelected.width = dom.selectFeelingArea.data.button_width + 'px';
        dom.selectFeelingArea.styleObj.buttonSelected.height = dom.selectFeelingArea.data.button_height + 'px';
        dom.selectFeelingArea.styleObj.buttonSelected.border = dom.selectFeelingArea.data.borderWidth + 'px solid pink';
        dom.selectFeelingArea.styleObj.buttonFocused.width = dom.selectFeelingArea.data.button_width + 'px';
        dom.selectFeelingArea.styleObj.buttonFocused.height = dom.selectFeelingArea.data.button_height + 'px';
        dom.selectFeelingArea.styleObj.buttonFocused.border = dom.selectFeelingArea.data.borderWidth + 'px solid lightblue';
        //console.log('.SelectFeelingArea.styleObj.button.width: ' + dom.selectFeelingArea.styleObj.button.width);

        dom.selectFeelingArea.styleObj.title.width = dom.selectFeelingArea.data.button_width + 'px';
        dom.selectFeelingArea.styleObj.title.height = dom.selectFeelingArea.data.height + 'px';
        styleObjApply(dom.selectFeelingArea.childDOMs.title, dom.selectFeelingArea.styleObj.title);
        applyString2Area(dom.selectFeelingArea.childDOMs.title);

        var cursol = {
            x: dom.selectFeelingArea.data.button_width,
            y: 0,
        }
        Object.keys(dom.selectFeelingArea.childDOMs.selectButton).forEach(function (key) {
            var tmpButton = dom.selectFeelingArea.childDOMs.selectButton[key];
            if (tmpButton.selectButton.data.selected) {
                dom.selectFeelingArea.styleObj.buttonCoordinate[key].left = cursol.x + 'px';
                dom.selectFeelingArea.styleObj.buttonCoordinate[key].top = cursol.y + 'px';
                styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.buttonSelected);
                styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.buttonCoordinate[key]);
            } else {
                dom.selectFeelingArea.styleObj.buttonCoordinate[key].left = cursol.x + 'px';
                dom.selectFeelingArea.styleObj.buttonCoordinate[key].top = cursol.y + 'px';
                styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.button);
                styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.buttonCoordinate[key]);
            }
            tmpButton.style.fontSize = getFontSizeApply2Area(tmpButton) + 'px';
            cursol.x += dom.selectFeelingArea.data.button_width;
            if (cursol.x + dom.selectFeelingArea.data.button_width > dom.selectFeelingArea.data.width) {
                cursol.x = dom.selectFeelingArea.data.button_width;
                cursol.y += dom.selectFeelingArea.data.button_height;
            }

        })
    }

    dom.selectFeelingArea.changeButtonQuantityPerLine = function (buttonQuantity) {
        dom.selectFeelingArea.data.buttonQuantityPerLine = buttonQuantity;
        dom.selectFeelingArea.redraw();
    }

    dom.selectFeelingArea.resizeWithButtonHeight = function (button_height) {
        dom.selectFeelingArea.data.button_height = button_height;
        dom.selectFeelingArea.data.height = dom.selectFeelingArea.data.button_height * dom.selectFeelingArea.data.lineQuantity;
        dom.selectFeelingArea.redraw();
    }

    dom.selectFeelingArea.resize = function (width, height) {
        dom.selectFeelingArea.data.width = width;
        dom.selectFeelingArea.data.height = height;
        dom.selectFeelingArea.redraw();
    }

    dom.selectFeelingArea.getSelectedButton = function () {
        var target_button = dom.selectFeelingArea.data.selectedButton;
        if (target_button !== null) {
            return target_button.textContent;
        } else {
            return null;
        }
    }

    var appendSelectButton = function (button_dom, key, weatherObj) {
        var tmpButton = button_dom;
        dom.selectFeelingArea.childDOMs.scrollFrame.appendChild(tmpButton);
        tmpButton.setAttribute('src', weatherObj.filePath);
        initDOMStyle(tmpButton, ['width', 'height', 'fontSize']);
        styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.button);
        tmpButton.selectButton = {
            data: {
                key: key,
                value: weatherObj.value,
                selected: false,
                index: dom.selectFeelingArea.data.buttonQuantity,
            },
            clear: function () {
                tmpButton.selectButton.data.selected = false;
                dom.selectFeelingArea.data.selectedButton = null;
                dom.selectFeelingArea.data.selectedValue = null;
                styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.button);
                saveBar.saveBar.changeDetected();
            },
            select: function () {
                Object.keys(dom.selectFeelingArea.childDOMs.selectButton).forEach(function (key) {
                    dom.selectFeelingArea.childDOMs.selectButton[key].selectButton.clear();
                })
                tmpButton.selectButton.data.selected = true;
                dom.selectFeelingArea.data.selectedButton = tmpButton;
                dom.selectFeelingArea.data.selectedValue = tmpButton.selectButton.data.key;
                styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.buttonSelected);
                saveBar.saveBar.changeDetected();
            },
            mouseoverEventFunc: function () {
                styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.buttonFocused);
            },
            mouseoutEventFunc: function () {
                if (tmpButton.selectButton.data.selected) {
                    styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.buttonSelected);
                } else {
                    styleObjApply(tmpButton, dom.selectFeelingArea.styleObj.button);
                }
            },
            clickEventFunc: function () {
                if (tmpButton.selectButton.data.selected) {
                    tmpButton.selectButton.clear();
                } else {
                    tmpButton.selectButton.select();
                }
            }
        }
        tmpButton.addEventListener('mouseover', tmpButton.selectButton.mouseoverEventFunc);
        tmpButton.addEventListener('mouseout', tmpButton.selectButton.mouseoutEventFunc);
        tmpButton.addEventListener('click', tmpButton.selectButton.clickEventFunc);

        dom.selectFeelingArea.styleObj.buttonCoordinate[key] = {
            x: null,
            y: null,
        };
        dom.selectFeelingArea.data.buttonQuantity++;
    }

    dom.selectFeelingArea.setButton = function (tag) {
        if (tag !== null) {
            dom.selectFeelingArea.childDOMs.selectButton[tag].selectButton.select();
        } else {
            dom.selectFeelingArea.allClear();
        }
    }

    dom.selectFeelingArea.allClear = function () {
        Object.keys(dom.selectFeelingArea.childDOMs.selectButton).forEach(function (key) {
            dom.selectFeelingArea.childDOMs.selectButton[key].selectButton.clear();
        })
        dom.selectFeelingArea.data.selectedButton = null;
    }

    dom.appendChild(dom.selectFeelingArea.childDOMs.title);
    dom.selectFeelingArea.childDOMs.title.textContent = title;
    dom.appendChild(dom.selectFeelingArea.childDOMs.scrollFrame);

    Object.keys(weatherList).forEach(function(key) {
        dom.selectFeelingArea.childDOMs.selectButton[key] = document.createElement('img');
        appendSelectButton(dom.selectFeelingArea.childDOMs.selectButton[key], key, weatherList[key]);
    });

    //初期化
    dom.selectFeelingArea.redraw();
    return dom;
}
