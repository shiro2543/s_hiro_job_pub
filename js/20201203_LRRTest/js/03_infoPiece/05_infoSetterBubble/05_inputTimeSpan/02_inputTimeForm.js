function InputTimeForm(dom,text,init_width,init_height,init_radius, clockIncrementMinute) {
    dom.inputTimeForm = {
        data: {
            left: 0,
            top: 0,
            width: init_width,
            height: init_height,
            clockRadius: init_radius,
            time: {
                ampm: null,
                hour: null,
                minute: null,
            },
            timeSet: false,
            clockDisplayed: false,
            direction: 'bottom',
        },
        styleObj: {
            main: {
                position: 'absolute',
                left: null,
                top: null,
                width: null,
                height: null,
            },
            displayArea: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: null,
                height: null,
                border: '1px solid lightgray',
                color: 'lightgray',
            },
        },
        childDOMs: {
            displayArea: document.createElement('div'),
            clockBubble: document.createElement('div'),
        },
        clockBubbleFunc: {
            clickEventFunc: function() {
                dom.inputTimeForm.data.time = JSON.parse(JSON.stringify(dom.inputTimeForm.childDOMs.clockBubble.clockBubble.getTime()));
                dom.inputTimeForm.childDOMs.displayArea.textContent = dom.inputTimeForm.data.time.ampm + ' ' + zeroPadding(dom.inputTimeForm.data.time.hour,2) + ':' + zeroPadding(dom.inputTimeForm.data.time.minute,2);
                applyString2Area(dom.inputTimeForm.childDOMs.displayArea);
                if(!(dom.inputTimeForm.data.timeSet)) {
                    dom.inputTimeForm.styleObj.displayArea.color = 'black';
                    styleObjApply(dom.inputTimeForm.childDOMs.displayArea, dom.inputTimeForm.styleObj.displayArea);
                    dom.inputTimeForm.data.timeSet = true;
                }
            }
        },
        displayAreaFunc: {
            clickEventFunc: function() {
                if(dom.inputTimeForm.data.clockDisplayed) {
                    dom.inputTimeForm.clockHide();
                } else {
                    dom.inputTimeForm.clockDisplay();
                }
            }
        }
    }

    dom.inputTimeForm.clockHide = function() {
        dom.inputTimeForm.data.clockDisplayed = false;
        dom.inputTimeForm.childDOMs.clockBubble.style.display = 'none';
    }
    var clockDisplayCount = 0;
    dom.inputTimeForm.clockDisplay = function() {
        dom.inputTimeForm.data.clockDisplayed = true;
        dom.inputTimeForm.childDOMs.clockBubble.style.display = '';
        var displayAreaCoordinate = dom.inputTimeForm.childDOMs.displayArea.getBoundingClientRect();
        
        var clockBubbleMoveCoordinateAssumption = {
            left: (displayAreaCoordinate.left - dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.width - dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.triangleWidth < 0),
            top: (displayAreaCoordinate.top - dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.height - dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.triangleWidth < 0),
            right: (displayAreaCoordinate.right + dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.width + dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.triangleWidth > document.body.clientWidth),
            bottom: (displayAreaCoordinate.bottom + dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.height + dom.inputTimeForm.childDOMs.clockBubble.speechBubble.data.triangleWidth > document.body.clientHeight),
        }

        if(clockBubbleMoveCoordinateAssumption.top && clockBubbleMoveCoordinateAssumption.bottom) {
            dom.inputTimeForm.changeDirection('right');
        } else if(clockBubbleMoveCoordinateAssumption.top) {
            dom.inputTimeForm.changeDirection('bottom');
        } else if(clockBubbleMoveCoordinateAssumption.bottom) {
            dom.inputTimeForm.changeDirection('top');
        } else {
            dom.inputTimeForm.changeDirection('bottom');
        }

        clockDisplayCount++;
    }

    dom.inputTimeForm.resize = function(width, height) {
        dom.inputTimeForm.data.width = width;
        dom.inputTimeForm.data.height = height;
        dom.inputTimeForm.redraw();
    }

    dom.inputTimeForm.resizeClock = function(radius) {
        dom.inputTimeForm.data.clockRadius = radius;
        dom.inputTimeForm.childDOMs.clockBubble.clockBubble.resize(radius);
        dom.inputTimeForm.redraw();
    }

    dom.inputTimeForm.redraw = function() {
        dom.inputTimeForm.styleObj.main.left = dom.inputTimeForm.data.left + 'px';
        dom.inputTimeForm.styleObj.main.top = dom.inputTimeForm.data.top + 'px';
        dom.inputTimeForm.styleObj.main.width = dom.inputTimeForm.data.width + 'px';
        dom.inputTimeForm.styleObj.main.height = dom.inputTimeForm.data.height + 'px';
        styleObjApply(dom, dom.inputTimeForm.styleObj.main);

        dom.inputTimeForm.styleObj.displayArea.width = dom.inputTimeForm.data.width + 'px';
        dom.inputTimeForm.styleObj.displayArea.height = dom.inputTimeForm.data.height + 'px'
        if(dom.inputTimeForm.data.timeSet) {
            dom.inputTimeForm.styleObj.displayArea.color = 'black';
        } else {
            dom.inputTimeForm.styleObj.displayArea.color = 'lightgray';
        }
        styleObjApply(dom.inputTimeForm.childDOMs.displayArea, dom.inputTimeForm.styleObj.displayArea);
        dom.inputTimeForm.childDOMs.displayArea.style.fontSize = getFontSizeApply2Area(dom.inputTimeForm.childDOMs.displayArea) + 'px';

        dom.inputTimeForm.childDOMs.clockBubble.clockBubble.redraw();
        
        dom.inputTimeForm.changeDirection(dom.inputTimeForm.data.direction);
    }
    
    dom.inputTimeForm.changeDirection = function(direction) {
        dom.inputTimeForm.data.direction = direction;
        if(direction==='left') {
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.changeDirection('right');
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.moveCoordinate(0,dom.inputTimeForm.data.height / 2);
        } else if(direction==='right') {
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.changeDirection('left');
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.moveCoordinate(dom.inputTimeForm.data.width, dom.inputTimeForm.data.height / 2);
        } else if(direction==='top') {
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.changeDirection('bottom');
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.moveCoordinate(dom.inputTimeForm.data.width / 2, 0);
        } else if(direction==='bottom') {
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.changeDirection('top');
            dom.inputTimeForm.childDOMs.clockBubble.speechBubble.moveCoordinate(dom.inputTimeForm.data.width / 2, dom.inputTimeForm.data.height);
        } else {
            throw '.inputTimeForm.changeDireciton(): argument direction is invalid.'
        }
    }
    
    dom.inputTimeForm.moveCoordinate = function(left, top) {
        dom.inputTimeForm.data.left = left;
        dom.inputTimeForm.data.top = top;
        dom.inputTimeForm.redraw();
    }

    dom.inputTimeForm.setTime = function(time) {
        dom.inputTimeForm.data.time = JSON.parse(JSON.stringify(time));
        dom.inputTimeForm.childDOMs.displayArea.textContent = dom.inputTimeForm.data.time.ampm + ' ' + zeroPadding(dom.inputTimeForm.data.time.hour,2) + ':' + zeroPadding(dom.inputTimeForm.data.time.minute,2);
        dom.inputTimeForm.childDOMs.clockBubble.clockBubble.childDOMs.clock.clock.setTime(time);
        dom.inputTimeForm.data.timeSet = true;
    }

    //初期化
    dom.appendChild(dom.inputTimeForm.childDOMs.displayArea);
    dom.appendChild(dom.inputTimeForm.childDOMs.clockBubble);
    
    initDOMStyle(dom.inputTimeForm.childDOMs.displayArea, ['width', 'height', 'fontSize']);
    dom.inputTimeForm.childDOMs.displayArea.textContent = text;
    dom.inputTimeForm.childDOMs.displayArea.addEventListener('click', dom.inputTimeForm.displayAreaFunc.clickEventFunc);
    dom.inputTimeForm.childDOMs.clockBubble.addEventListener('click', dom.inputTimeForm.clockBubbleFunc.clickEventFunc);
    new ClockBubble(dom.inputTimeForm.childDOMs.clockBubble, dom.inputTimeForm.data.clockRadius, clockIncrementMinute);
    dom.inputTimeForm.redraw();
    dom.inputTimeForm.clockHide();
    return dom;
}
