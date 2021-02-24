//コメントの入力フォーム
function InputCommentArea(dom, initWidth, initHeight, title) {
    dom.inputCommentArea = {
        data: {
            layputRate: {
                width: {
                    title: 1,
                    comment: 6,
                }
            },
            layputRateTotal: {
                width: null,
            },
            width: initWidth,
            height: initHeight,
            title: title,
        },
        styleObj: {
            main: {
                position: 'relative',
                width: null,
                height: null,
                left: 0,
                top: 0,
                backgroundColor: 'lightgreen',
                color: 'white',
            },
            title: {
                position: 'absolute',
                width: null,
                height: null,
                left: 0,
                top: 0,
            },
            comment: {
                position: 'absolute',
                left: null,
                top: 0,
                backgroundColor: 'white',
            }
        },
        childDOMs: {
            title: document.createElement('div'),
            comment: document.createElement('div'),
        }

    }
    dom.inputCommentArea.redraw = function () {
        dom.inputCommentArea.childDOMs.title.textContent = dom.inputCommentArea.data.title;
        dom.inputCommentArea.data.layputRateTotal.width = 0;
        Object.keys(dom.inputCommentArea.data.layputRate.width).forEach(function(key) {
            dom.inputCommentArea.data.layputRateTotal.width += dom.inputCommentArea.data.layputRate.width[key];
        })
        dom.inputCommentArea.styleObj.main.width = dom.inputCommentArea.data.width + 'px';
        dom.inputCommentArea.styleObj.main.height = dom.inputCommentArea.data.height + 'px';
        var titleWidth = dom.inputCommentArea.data.width * dom.inputCommentArea.data.layputRate.width.title / dom.inputCommentArea.data.layputRateTotal.width;
        dom.inputCommentArea.styleObj.title.width =  titleWidth + 'px';
        dom.inputCommentArea.styleObj.title.height = dom.inputCommentArea.data.height + 'px';
        var commentWidth = dom.inputCommentArea.data.width * dom.inputCommentArea.data.layputRate.width.comment / dom.inputCommentArea.data.layputRateTotal.width;
        dom.inputCommentArea.styleObj.comment.left = titleWidth + 'px';
        styleObjApply(dom, dom.inputCommentArea.styleObj.main);
        styleObjApply(dom.inputCommentArea.childDOMs.title, dom.inputCommentArea.styleObj.title);
        applyString2Area(dom.inputCommentArea.childDOMs.title);
        styleObjApply(dom.inputCommentArea.childDOMs.comment, dom.inputCommentArea.styleObj.comment);
        dom.inputCommentArea.childDOMs.comment.ntagg.resize(commentWidth, dom.inputCommentArea.data.height);
        dom.inputCommentArea.childDOMs.comment.ntagg.changeFontSize(px2num(dom.inputCommentArea.childDOMs.title.style.fontSize));
    }

    dom.inputCommentArea.getValues = function() {
        return dom.inputCommentArea.childDOMs.comment.ntagg.childDOMs.text.value;
    }

    dom.appendChild(dom.inputCommentArea.childDOMs.title);
    dom.appendChild(dom.inputCommentArea.childDOMs.comment);
    new NoTextAreaGrayGuide(dom.inputCommentArea.childDOMs.comment, 'コメントを入力', dom.inputCommentArea.data.width * dom.inputCommentArea.data.layputRate.width.comment / dom.inputCommentArea.data.layputRateTotal.width, dom.inputCommentArea.data.height);

    dom.inputCommentArea.setValues = function(value) {
        dom.inputCommentArea.childDOMs.comment.ntagg.setText(value);
    }

    dom.inputCommentArea.redraw();
    return dom;
}
