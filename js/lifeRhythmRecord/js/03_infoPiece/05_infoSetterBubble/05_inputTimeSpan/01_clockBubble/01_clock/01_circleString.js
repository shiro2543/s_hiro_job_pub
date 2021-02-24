//時計の各時間を丸囲いしたものを表示
function CircleString(dom, text, width, height) {
    dom.cs = {
        data: {
            lengthOfEdge: Math.min(width, height),
            radius: Math.min(width, height) / 2,
            left: 0,
            top: 0,
            width: width,
            height: height,
            text: text,
            backgroundColor: 'white',
            lightupColor: 'pink',
            lightup: false,
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
            text: {
                position: 'absolute',
                left: null,
                top: null,
                width: null,
                height: null,
                textAlign: 'center',
            }
        },
        childDOMs: {
            circle: document.createElement('div'),
            text: document.createElement('div')
        }
    }
    dom.cs.data2StyleObj = function () {
        dom.cs.styleObj.main.left = dom.cs.data.left + 'px';
        dom.cs.styleObj.main.top = dom.cs.data.top + 'px';
        dom.cs.styleObj.main.width = dom.cs.data.width + 'px';
        dom.cs.styleObj.main.height = dom.cs.data.height + 'px';
        dom.cs.styleObj.circle.width = dom.cs.data.width + 'px';
        dom.cs.styleObj.circle.height = dom.cs.data.height + 'px';
        dom.cs.styleObj.text.left = (dom.cs.data.radius - dom.cs.data.radius / Math.sqrt(2)) + 'px';
        dom.cs.styleObj.text.top = (dom.cs.data.radius - dom.cs.data.radius / Math.sqrt(2)) + 'px';
        dom.cs.styleObj.text.width = (dom.cs.data.radius / Math.sqrt(2) * 2) + 'px';
        dom.cs.styleObj.text.height = (dom.cs.data.radius / Math.sqrt(2) * 2) + 'px';
        if(dom.cs.data.lightup) {
            dom.cs.styleObj.circle.backgroundColor = 'pink';
        } else {
            dom.cs.styleObj.circle.backgroundColor = 'white';
        }
    }
    dom.cs.styleObjApply = function () {
        styleObjApply(dom, dom.cs.styleObj.main);
        styleObjApply(dom.cs.childDOMs.circle, dom.cs.styleObj.circle);
        styleObjApply(dom.cs.childDOMs.text, dom.cs.styleObj.text);
    }
    dom.cs.redraw = function () {
        dom.cs.data2StyleObj();
        dom.cs.styleObjApply();
        dom.cs.childDOMs.text.textContent = dom.cs.data.text;
        applyString2Area(dom.cs.childDOMs.text);

        //.childDOMs.text の位置修正
        var org_text_height = px2num(dom.cs.childDOMs.text.style.height);
        dom.cs.childDOMs.text.style.height = '';
        var new_text_height = dom.cs.childDOMs.text.clientHeight;
        dom.cs.childDOMs.text.style.height = new_text_height + 'px';
        dom.cs.childDOMs.text.style.top = (px2num(dom.cs.childDOMs.text.style.top) + (org_text_height - new_text_height) / 2) + 'px';
    }

    dom.cs.lightUp = function() {
        dom.cs.data.lightup = true;
        dom.cs.redraw();
    }
    dom.cs.lightDown = function() {
        dom.cs.data.lightup = false;
        dom.cs.redraw();
    }

    dom.cs.setText = function(text) {
        dom.cs.data.text = text;
        dom.cs.redraw();
    }
    dom.cs.resize = function(width, height) {
        dom.cs.data.lengthOfEdge = Math.min(width, height);
        dom.cs.data.radius = Math.min(width, height) / 2;
        dom.cs.data.width = width;
        dom.cs.data.height = height;
        dom.cs.redraw();
    }
    dom.cs.moveCoordinateCenter = function(left, top) {
        dom.cs.data.left = left - dom.cs.data.radius;
        dom.cs.data.top = top - dom.cs.data.radius;
        dom.cs.redraw();
    }
    dom.appendChild(dom.cs.childDOMs.circle);
    dom.appendChild(dom.cs.childDOMs.text);
    initDOMStyle(dom.cs.childDOMs.text, ['fontSize']);
    dom.cs.redraw();
    return dom;
}
