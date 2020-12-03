//前提
//contentDOMはinitDOMStyleしてある(width, heightが取得できる)
function SpeechBubble(dom, contentDOM) {
    dom.speechBubble = {
        data: {
            display: true,  //trueなら表示、falseなら非表示にする
            target_coordinate: {
                left: 0,
                top: 0,
            },
            left: null,
            top: null,
            width: null,
            height: null,
            marginWidth: 5,
            triangleWidth: 20,
            trianglePosition: null,
            direction: 'left',  //left or right or top or bottom
            color1: 'black',
            color2: 'green',
            color3: 'white',
            borderRadius: '',
        },
        styleObj: {
            main: {
                position: 'absolute',
                display: null,
                left: null,
                top: null,
                width: null,
                height: null,
                backgroundColor: null,
                color: null,
                borderRadius: '',
            },
            contentDOMOuter: {
                position: 'absolute',
                left: null,
                top: null,
            },
            contentDOM: {
                position: 'absolute',
                left: null,
                top: null,
            }
        },
        childDOMs: {
            triangle: document.createElement('div'),
            contentDOM: contentDOM,
            contentDOMOuter: document.createElement('div'),
        }
    }

    dom.speechBubble.redraw = function () {
        dom.speechBubble.styleObj.contentDOMOuter.left = dom.speechBubble.data.marginWidth + 'px';
        dom.speechBubble.styleObj.contentDOMOuter.top = dom.speechBubble.data.marginWidth + 'px';
    
        dom.speechBubble.data.width = px2num(dom.speechBubble.childDOMs.contentDOM.style.width) + dom.speechBubble.data.marginWidth * 2;
        dom.speechBubble.data.height = px2num(dom.speechBubble.childDOMs.contentDOM.style.height) + dom.speechBubble.data.marginWidth * 2;

        if (dom.speechBubble.data.display) {
            dom.speechBubble.styleObj.main.display = 'block';
        } else {
            dom.speechBubble.styleObj.main.display = 'none';
        }

        //mainのleft / top の計算
        if (dom.speechBubble.data.direction === 'left') {
            if (dom.speechBubble.data.trianglePosition === 'center') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left + dom.speechBubble.data.triangleWidth;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top - dom.speechBubble.data.height / 2;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, 0 - dom.speechBubble.data.triangleWidth, dom.speechBubble.data.height / 2);
            } else if (dom.speechBubble.data.trianglePosition === 'leftSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left + dom.speechBubble.data.triangleWidth;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top + dom.speechBubble.data.triangleWidth / 2 - dom.speechBubble.data.height;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, 0 - dom.speechBubble.data.triangleWidth, dom.speechBubble.data.height - dom.speechBubble.data.triangleWidth / 2);
            } else if (dom.speechBubble.data.trianglePosition === 'rightSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left + dom.speechBubble.data.triangleWidth;
                //dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top + dom.speechBubble.data.triangleWidth / 2;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top - dom.speechBubble.data.triangleWidth / 2;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, 0 - dom.speechBubble.data.triangleWidth, dom.speechBubble.data.triangleWidth / 2);
            } else {
                throw 'error: .speechBubble.data.trianglePosition is invalid.';
            }
        } else if (dom.speechBubble.data.direction === 'right') {
            if (dom.speechBubble.data.trianglePosition === 'center') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left - dom.speechBubble.data.triangleWidth - dom.speechBubble.data.width;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top - dom.speechBubble.data.height / 2;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.width + dom.speechBubble.data.triangleWidth, dom.speechBubble.data.height / 2);
            } else if (dom.speechBubble.data.trianglePosition === 'leftSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left - dom.speechBubble.data.triangleWidth - dom.speechBubble.data.width;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top - dom.speechBubble.data.triangleWidth / 2;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.width + dom.speechBubble.data.triangleWidth, dom.speechBubble.data.triangleWidth / 2);
            } else if (dom.speechBubble.data.trianglePosition === 'rightSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left - dom.speechBubble.data.triangleWidth - dom.speechBubble.data.width;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top + dom.speechBubble.data.triangleWidth / 2 - dom.speechBubble.data.height;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.width + dom.speechBubble.data.triangleWidth, dom.speechBubble.data.height - dom.speechBubble.data.triangleWidth / 2);
            } else {
                throw 'error: .speechBubble.data.trianglePosition is invalid.';
            }
        } else if (dom.speechBubble.data.direction === 'top') {
            if (dom.speechBubble.data.trianglePosition === 'center') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left - dom.speechBubble.data.width / 2;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top + dom.speechBubble.data.triangleWidth;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.width / 2, 0 - dom.speechBubble.data.triangleWidth);
            } else if (dom.speechBubble.data.trianglePosition === 'leftSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left - dom.speechBubble.data.triangleWidth / 2;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top + dom.speechBubble.data.triangleWidth;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.triangleWidth / 2, 0 - dom.speechBubble.data.triangleWidth);
            } else if (dom.speechBubble.data.trianglePosition === 'rightSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left + dom.speechBubble.data.triangleWidth / 2 - dom.speechBubble.data.width;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top + dom.speechBubble.data.triangleWidth;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.width - dom.speechBubble.data.triangleWidth / 2, 0 - dom.speechBubble.data.triangleWidth);
            } else {
                throw 'error: .speechBubble.data.trianglePosition is invalid.';
            }
        } else if (dom.speechBubble.data.direction === 'bottom') {
            if (dom.speechBubble.data.trianglePosition === 'center') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left - dom.speechBubble.data.width / 2;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top - dom.speechBubble.data.triangleWidth - dom.speechBubble.data.height;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.width / 2, dom.speechBubble.data.height + dom.speechBubble.data.triangleWidth);
            } else if (dom.speechBubble.data.trianglePosition === 'leftSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left + dom.speechBubble.data.triangleWidth / 2 - dom.speechBubble.data.width;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top - dom.speechBubble.data.triangleWidth - dom.speechBubble.data.height;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.width - dom.speechBubble.data.triangleWidth / 2, dom.speechBubble.data.height + dom.speechBubble.data.triangleWidth);
            } else if (dom.speechBubble.data.trianglePosition === 'rightSide') {
                dom.speechBubble.data.left = dom.speechBubble.data.target_coordinate.left - dom.speechBubble.data.triangleWidth / 2;
                dom.speechBubble.data.top = dom.speechBubble.data.target_coordinate.top - dom.speechBubble.data.triangleWidth - dom.speechBubble.data.height;
                dom.speechBubble.childDOMs.triangle.triangle.moveCoordinateWithArrowTip(dom.speechBubble.data.direction, dom.speechBubble.data.triangleWidth / 2, dom.speechBubble.data.height + dom.speechBubble.data.triangleWidth);
            } else {
                throw 'error: .speechBubble.data.trianglePosition is invalid.';
            }
        } else {
            throw 'SpeechBubble().redraw(): argument direction is invalid.'
        }
        dom.speechBubble.styleObj.main.left = dom.speechBubble.data.left + 'px';
        dom.speechBubble.styleObj.main.top = dom.speechBubble.data.top + 'px';
        dom.speechBubble.styleObj.main.width = dom.speechBubble.data.width + 'px';
        dom.speechBubble.styleObj.main.height = dom.speechBubble.data.height + 'px'
        dom.speechBubble.styleObj.main.borderRadius = dom.speechBubble.data.borderRadius;
        styleObjApply(dom, dom.speechBubble.styleObj.main);

        styleObjApply(dom.speechBubble.childDOMs.contentDOMOuter, dom.speechBubble.styleObj.contentDOMOuter);

        //dom.speechBubble.styleObj.contentDOM.left = dom.speechBubble.data.marginWidth + 'px';
        //dom.speechBubble.styleObj.contentDOM.top = dom.speechBubble.data.marginWidth + 'px';
        styleObjApply(dom.speechBubble.childDOMs.contentDOM, dom.speechBubble.styleObj.contentDOM);
    }

    dom.speechBubble.moveCoordinate = function (left, top) {
        dom.speechBubble.data.target_coordinate.left = left;
        dom.speechBubble.data.target_coordinate.top = top;
        dom.speechBubble.redraw();
    }

    //direction: left / right / top / bottom
    dom.speechBubble.changeDirection = function (direction) {
        if(direction!=='top'&&direction!=='bottom'&&direction!=='left'&&direction!=='right') {
            throw '.speechBubble.changeDirection(): argument direction is invalid.';
        }
        dom.speechBubble.data.direction = direction;
        dom.speechBubble.redraw();
    }

    dom.speechBubble.changeTrianglePosition = function (position) {
        if(position!=='center'&&position!=='leftSide'&&position!=='rightSide') {
            throw '.speechBubble.changeTrianglePosition(): argument posistion is invalid.';
        }
        dom.speechBubble.data.trianglePosition = position;
        dom.speechBubble.redraw();
    }
    dom.speechBubble.setBorderRadius = function(borderRadius) {
        dom.speechBubble.data.borderRadius = borderRadius;
        dom.speechBubble.redraw();
    }
    //初期化
    dom.appendChild(dom.speechBubble.childDOMs.triangle);
    new TriangleArrow(dom.speechBubble.childDOMs.triangle, dom.speechBubble.data.triangleWidth, dom.speechBubble.data.triangleWidth, dom.speechBubble.data.color2);
    dom.speechBubble.data.trianglePosition = 'center';
    dom.appendChild(dom.speechBubble.childDOMs.contentDOMOuter);
    dom.speechBubble.childDOMs.contentDOMOuter.appendChild(dom.speechBubble.childDOMs.contentDOM);
    dom.speechBubble.styleObj.main.backgroundColor = dom.speechBubble.data.color2;
    dom.speechBubble.styleObj.main.color = dom.speechBubble.data.color1;
    dom.speechBubble.redraw();
    return dom;
}
