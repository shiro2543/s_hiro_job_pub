function InfoSetterBubble(dom, initWidth, initHeight, initClockRadius, tagList, tagColorList, clockIncrementMinute) {
    dom.infoSetterBubble = {
        data: {
            display: 'none',
            operatingTarget: {
                left: null,
                top: null,
            }
        },
        childDOMs: {
            infoSetter: document.createElement('div'),
        },
        styleObj: {
            main: {
                display: null,
            }
        }
    }
    dom.infoSetterBubble.redraw = function() {
        dom.speechBubble.childDOMs.contentDOM.infoSetter.redraw();
        //console.log(dom.infoSetterBubble.childDOMs.infoSetter.infoSetter.data.paddingWidth)
        dom.speechBubble.setBorderRadius(dom.infoSetterBubble.childDOMs.infoSetter.infoSetter.data.paddingWidth + 'px');
        dom.speechBubble.redraw();
        dom.infoSetterBubble.styleObj.main.display = dom.infoSetterBubble.data.display;
        //console.log(dom.infoSetterBubble.styleObj.main.display);
        styleObjApply(dom, dom.infoSetterBubble.styleObj.main);
        //console.log(dom.style.display);
    }

    dom.infoSetterBubble.resize = function(width, height) {
        dom.infoSetterBubble.childDOMs.infoSetter.infoSetter.resize(width, height);
        dom.infoSetterBubble.redraw();
    }

    dom.infoSetterBubble.moveCoordinate = function(left, top) {
        dom.speechBubble.moveCoordinate(left, top);
        
        //基本的なtriangleの位置
        dom.speechBubble.changeDirection('left');
        dom.speechBubble.changeTrianglePosition('center');

        /*
        if(dom.speechBubble.data.left < 0) {
            dom.speechBubble.changeDirection('right');
        } else if(dom.speechBubble.data.left + dom.speechBubble.data.width > document.body.clientWidth) {
            dom.speechBubble.changeDirection('left');
        }
        */
        if(dom.speechBubble.data.top < 0) {
            dom.speechBubble.changeTrianglePosition('rightSide');
        } else if(dom.speechBubble.data.top + dom.speechBubble.data.height > document.body.clientHeight) {
            dom.speechBubble.changeTrianglePosition('leftSide');
        }
        dom.infoSetterBubble.redraw();
    }

    dom.infoSetterBubble.changeDirection = function(direction) {
        dom.speechBubble.changeDirection(direction);
    }

    dom.infoSetterBubble.appear = function() {
        dom.infoSetterBubble.data.display = 'block';
        dom.infoSetterBubble.redraw();
    }
    dom.infoSetterBubble.hide = function() {
        dom.infoSetterBubble.data.display = 'none';
        dom.infoSetterBubble.redraw();
    }

    dom.infoSetterBubble.appearAndStartOperateFP = function(framePiece) {
        dacontroller.deactivateAllListener();
        dom.infoSetterBubble.activateListener();
        
        var fPBCR = framePiece.getBoundingClientRect();
        dom.infoSetterBubble.data.operatingTarget.left = fPBCR.left;
        dom.infoSetterBubble.data.operatingTarget.top = fPBCR.top;
        var moveTarget = {
            left: dom.infoSetterBubble.data.operatingTarget.left + framePiece.framePiece.data.width,
            top: dom.infoSetterBubble.data.operatingTarget.top + framePiece.framePiece.data.height / 2,
        }
        dom.infoSetterBubble.moveCoordinate(moveTarget.left, moveTarget.top);
        dom.infoSetterBubble.childDOMs.infoSetter.infoSetter.startOperateFP(framePiece);
    }
    
    dom.infoSetterBubble.resetInfo = function() {
        dom.infoSetterBubble.childDOMs.infoSetter.infoSetter.resetInfo();
        dom.infoSetterBubble.hide();
    }

    dom.infoSetterBubble.deactiveListener = function() {
        dom.infoSetterBubble.hide();
    }
    dom.infoSetterBubble.activateListener = function() {
        dom.infoSetterBubble.appear();
    }

    dacontroller.append(dom.infoSetterBubble.deactiveListener);

    dom = new SpeechBubble(dom, dom.infoSetterBubble.childDOMs.infoSetter);
    new InfoSetter(dom.infoSetterBubble.childDOMs.infoSetter, initWidth, initHeight, initClockRadius, tagList, tagColorList, clockIncrementMinute);
    dom.infoSetterBubble.redraw();
    return dom;
}
