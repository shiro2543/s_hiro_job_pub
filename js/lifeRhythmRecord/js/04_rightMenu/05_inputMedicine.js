//服薬の入力フォーム
function InputMedicine(dom, initWidth, initHeight) {
    dom.inputMedicine = {
        data: {
            width: initWidth,
            height: initHeight,
            layoutRate: {
                width: {
                    buttonArea: 3,
                    comment: 4,
                }
            },
            layoutRateTotal: {
                width: null,
            }
        },
        styleObj: {
            main: {
                width: null,
                height: null,
                backgroundColor: 'white',
            },
            buttonArea: {
                left: 0,
                top: 0,
            },
            comment: {
                position: 'absolute',
                left: null,
                top: 0,
            }
        },
        childDOMs: {
            buttonArea: document.createElement('div'),
            comment: document.createElement('div'),
        }
    }
    dom.inputMedicine.data.layoutRateTotal.width = 0;
    Object.keys(dom.inputMedicine.data.layoutRate.width).forEach(function(key) {
        dom.inputMedicine.data.layoutRateTotal.width += dom.inputMedicine.data.layoutRate.width[key];
    })

    dom.inputMedicine.getValues = function() {
        return {
            value: dom.inputMedicine.childDOMs.buttonArea.selectButtonArea.getSelectedButton(),
            comment: dom.inputMedicine.childDOMs.comment.ntgg.getValues(),
        }
    }
    dom.inputMedicine.setValues = function(values) {
        dom.inputMedicine.childDOMs.buttonArea.selectButtonArea.setButton(values.value);
        dom.inputMedicine.childDOMs.comment.ntgg.setText(values.comment);
    }
 
    dom.inputMedicine.redraw = function() {
        var buttonAreaWidth = dom.inputMedicine.data.width * dom.inputMedicine.data.layoutRate.width.buttonArea / dom.inputMedicine.data.layoutRateTotal.width;
        var commentWidth = dom.inputMedicine.data.width * dom.inputMedicine.data.layoutRate.width.comment / dom.inputMedicine.data.layoutRateTotal.width;
        dom.inputMedicine.styleObj.comment.left = buttonAreaInitWidth + 'px';
        styleObjApply(dom, dom.inputMedicine.styleObj.main);
        styleObjApply(dom.inputMedicine.childDOMs.buttonArea, dom.inputMedicine.styleObj.buttonArea);
        styleObjApply(dom.inputMedicine.childDOMs.comment, dom.inputMedicine.styleObj.comment);
        dom.inputMedicine.childDOMs.buttonArea.resize(buttonAreaWidth); //selectButtonArea resize
        dom.inputMedicine.childDOMs.comment.resize(commentWidth);   //ntgg resize
    }

    dom.appendChild(dom.inputMedicine.childDOMs.buttonArea);
    dom.appendChild(dom.inputMedicine.childDOMs.comment);

    var buttonAreaInitWidth = initWidth * dom.inputMedicine.data.layoutRate.width.buttonArea / dom.inputMedicine.data.layoutRateTotal.width;
    var buttonAreaTextList = ['OK', '忘れ'];
    new SelectButtonArea(dom.inputMedicine.childDOMs.buttonArea, buttonAreaInitWidth, initHeight, 2, buttonAreaTextList);
    var commentInitWidth = initWidth * dom.inputMedicine.data.layoutRate.width.comment / dom.inputMedicine.data.layoutRateTotal.width;
    new NoTextGrayGuide(dom.inputMedicine.childDOMs.comment, 'コメントを入力', commentInitWidth, initHeight);
    dom.inputMedicine.styleObj.comment.left = buttonAreaInitWidth + 'px';
    styleObjApply(dom, dom.inputMedicine.styleObj.main);
    styleObjApply(dom.inputMedicine.childDOMs.buttonArea, dom.inputMedicine.styleObj.buttonArea);
    styleObjApply(dom.inputMedicine.childDOMs.comment, dom.inputMedicine.styleObj.comment);
    return dom;
}