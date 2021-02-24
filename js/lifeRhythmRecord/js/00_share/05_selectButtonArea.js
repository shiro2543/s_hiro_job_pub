//複数のボタンを持ち、クリックで選択して値を保持できる
function SelectButtonArea(dom, init_width, init_height, init_button_quantity_per_line, buttonTextList) {
    dom.selectButtonArea = {
        data: {
            selectedButton: null,
            width: init_width,
            height: init_height,
            buttonQuantity: 0,
            buttonValueList: buttonTextList,
            
            buttonQuantityPerLine: init_button_quantity_per_line,
            lineQuantity: null,
            button_width: null,
            button_height: null,

        },
        styleObj: {
            main: {
                overflow: 'hidden',
            },
            scrollFrame: {
                position: 'relative',
                width: null,
                height: null,
            },
            button: {
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid lightgray',
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
                color: 'white',
                backgroundColor: 'pink',
                border: '1px solid lightgray',
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
                color: 'white',
                backgroundColor: 'lightblue',
                border: '1px solid lightgray',
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
        },
        childDOMs: {
            scrollFrame: document.createElement('div'),
            selectButton: {}
        },
    }

    dom.selectButtonArea.redraw = function() {
        dom.selectButtonArea.styleObj.main.width = dom.selectButtonArea.data.width + 'px';
        dom.selectButtonArea.styleObj.main.height = dom.selectButtonArea.data.height + 'px';
        styleObjApply(dom, dom.selectButtonArea.styleObj.main);

        dom.selectButtonArea.styleObj.scrollFrame.width = dom.selectButtonArea.data.button_width * Math.floor(dom.selectButtonArea.data.width / dom.selectButtonArea.data.button_width) + 'px';
        dom.selectButtonArea.styleObj.scrollFrame.height = dom.selectButtonArea.data.button_height * (dom.selectButtonArea.data.button_width * buttonTextList.length) / dom.selectButtonArea.data.width + 'px';
        styleObjApply(dom.selectButtonArea.childDOMs.scrollFrame, dom.selectButtonArea.styleObj.scrollFrame);
        
        //buttonwidthとheightの調整
        dom.selectButtonArea.data.button_width = dom.selectButtonArea.data.width / dom.selectButtonArea.data.buttonQuantityPerLine;
        dom.selectButtonArea.data.lineQuantity = Math.ceil(buttonTextList.length / dom.selectButtonArea.data.buttonQuantityPerLine);
        dom.selectButtonArea.data.button_height = dom.selectButtonArea.data.height / dom.selectButtonArea.data.lineQuantity;

        dom.selectButtonArea.styleObj.button.width = dom.selectButtonArea.data.button_width + 'px';
        dom.selectButtonArea.styleObj.button.height = dom.selectButtonArea.data.button_height + 'px';
        dom.selectButtonArea.styleObj.buttonSelected.width = dom.selectButtonArea.data.button_width + 'px';
        dom.selectButtonArea.styleObj.buttonSelected.height = dom.selectButtonArea.data.button_height + 'px';
        dom.selectButtonArea.styleObj.buttonFocused.width = dom.selectButtonArea.data.button_width + 'px';
        dom.selectButtonArea.styleObj.buttonFocused.height = dom.selectButtonArea.data.button_height + 'px';

        var cursol = {
            x: 0,
            y: 0,
        }
        Object.keys(dom.selectButtonArea.childDOMs.selectButton).forEach(function(key) {
            var tmpButton = dom.selectButtonArea.childDOMs.selectButton[key];
            if(tmpButton.selectButton.data.selected) {
                dom.selectButtonArea.styleObj.buttonCoordinate[key].left = cursol.x + 'px';
                dom.selectButtonArea.styleObj.buttonCoordinate[key].top = cursol.y + 'px';
                styleObjApply(tmpButton, dom.selectButtonArea.styleObj.buttonSelected);
                styleObjApply(tmpButton, dom.selectButtonArea.styleObj.buttonCoordinate[key]);
            } else {
                dom.selectButtonArea.styleObj.buttonCoordinate[key].left = cursol.x + 'px';
                dom.selectButtonArea.styleObj.buttonCoordinate[key].top = cursol.y + 'px';
                styleObjApply(tmpButton, dom.selectButtonArea.styleObj.button);
                styleObjApply(tmpButton, dom.selectButtonArea.styleObj.buttonCoordinate[key]);
            }
            //tmpButton.style.fontSize = getFontSizeApply2Area(tmpButton) + 'px';
            tmpButton.style.fontSize = getFontSizeApply2AreaWithBorder(tmpButton) + 'px';
            cursol.x += dom.selectButtonArea.data.button_width;
            if(cursol.x + dom.selectButtonArea.data.button_width > dom.selectButtonArea.data.width) {
                cursol.x = 0;
                cursol.y += dom.selectButtonArea.data.button_height;
            }

        })
    }

    dom.selectButtonArea.changeButtonQuantityPerLine = function(buttonQuantity) {
        dom.selectButtonArea.data.buttonQuantityPerLine = buttonQuantity;
        dom.selectButtonArea.redraw();
    }

    dom.selectButtonArea.resizeWithButtonHeight = function(button_height) {
        dom.selectButtonArea.data.button_height = button_height;
        dom.selectButtonArea.data.height = dom.selectButtonArea.data.button_height * dom.selectButtonArea.data.lineQuantity;
        dom.selectButtonArea.redraw();
    }

    dom.selectButtonArea.resize = function(width, height) {
        dom.selectButtonArea.data.width = width;
        dom.selectButtonArea.data.height = height;
        dom.selectButtonArea.redraw();
    }

    dom.selectButtonArea.getSelectedButton = function() {
        var target_button = dom.selectButtonArea.data.selectedButton;
        if(target_button!==null) {
            return target_button.textContent;
        } else {
            return null;
        }
    }

    var appendSelectButton = function(button_dom, text) {
        var tmpButton = button_dom;
        dom.selectButtonArea.childDOMs.scrollFrame.appendChild(tmpButton);
        initDOMStyle(tmpButton, ['width', 'height','fontSize']);
        tmpButton.type = 'button';
        styleObjApply(tmpButton, dom.selectButtonArea.styleObj.button);
        tmpButton.textContent = text;
        tmpButton.value = text;
        tmpButton.selectButton = {
            data: {
                text: text,
                selected: false,
                index: dom.selectButtonArea.data.buttonQuantity,
            },
            clear: function() {
                tmpButton.selectButton.data.selected = false;
                dom.selectButtonArea.data.selectedButton = null;
                styleObjApply(tmpButton, dom.selectButtonArea.styleObj.button);
                saveBar.saveBar.changeDetected();
            },
            select: function() {
                Object.keys(dom.selectButtonArea.childDOMs.selectButton).forEach(function(key) {
                    dom.selectButtonArea.childDOMs.selectButton[key].selectButton.clear();
                })
                tmpButton.selectButton.data.selected = true;
                dom.selectButtonArea.data.selectedButton = tmpButton;
                styleObjApply(tmpButton, dom.selectButtonArea.styleObj.buttonSelected);
                saveBar.saveBar.changeDetected();
            },
            mouseoverEventFunc: function() {
                styleObjApply(tmpButton, dom.selectButtonArea.styleObj.buttonFocused);
            },
            mouseoutEventFunc: function() {
                if(tmpButton.selectButton.data.selected) {
                    styleObjApply(tmpButton, dom.selectButtonArea.styleObj.buttonSelected);
                } else {
                    styleObjApply(tmpButton, dom.selectButtonArea.styleObj.button);
                }
            },
            clickEventFunc: function() {
                if(tmpButton.selectButton.data.selected) {
                    tmpButton.selectButton.clear();
                } else {
                    tmpButton.selectButton.select();
                }
            }
        }
        tmpButton.addEventListener('mouseover', tmpButton.selectButton.mouseoverEventFunc);
        tmpButton.addEventListener('mouseout', tmpButton.selectButton.mouseoutEventFunc);
        tmpButton.addEventListener('click', tmpButton.selectButton.clickEventFunc);

        dom.selectButtonArea.styleObj.buttonCoordinate[text] = {
            x: null,
            y: null,
        };
        dom.selectButtonArea.data.buttonQuantity++;
    }

    dom.selectButtonArea.setButton = function(tag) {
        if(tag!==null && tag!=="") {
            dom.selectButtonArea.childDOMs.selectButton[tag].selectButton.select();
        } else {
            dom.selectButtonArea.allClear();
        }
    }

    dom.selectButtonArea.allClear = function() {
        Object.keys(dom.selectButtonArea.childDOMs.selectButton).forEach(function(key) {
            dom.selectButtonArea.childDOMs.selectButton[key].selectButton.clear();
        })
        dom.selectButtonArea.data.selectedButton = null;
    }

    dom.appendChild(dom.selectButtonArea.childDOMs.scrollFrame);

    for(var i=0;i<buttonTextList.length;i++) {
        dom.selectButtonArea.childDOMs.selectButton[buttonTextList[i]] = document.createElement('button');
        appendSelectButton(dom.selectButtonArea.childDOMs.selectButton[buttonTextList[i]], buttonTextList[i]);
    }

    //初期化
    dom.selectButtonArea.redraw();
    return dom;
}