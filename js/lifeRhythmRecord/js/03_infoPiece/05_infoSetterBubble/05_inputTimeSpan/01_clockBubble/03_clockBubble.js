//時計を吹き出しで囲ったもの
function ClockBubble(dom, clock_radius, clockIncrementMinute) {
    dom.clockBubble = {
        childDOMs: {
            clock: document.createElement('div'),
        }
    }
    dom = new SpeechBubble(dom, dom.clockBubble.childDOMs.clock);
    new Clock(dom.clockBubble.childDOMs.clock, clock_radius, clockIncrementMinute);
    dom.speechBubble.setBorderRadius('50%');
    dom.speechBubble.redraw();

    //clockのwrapper
    dom.clockBubble.getTime = function() {
        return JSON.parse(JSON.stringify(dom.clockBubble.childDOMs.clock.clock.getTime()));
    }

    //sppechBubbleのwrapper
    dom.clockBubble.redraw = function() {
        dom.speechBubble.redraw();
    }
    dom.clockBubble.resize = function(radius) {
        dom.speechBubble.childDOMs.contentDOM.clock.resize(radius);
        dom.speechBubble.redraw();
    }
    dom.clockBubble.moveCoordinate = function(left,top) {
        dom.speechBubble.moveCoordinate(left, top)
    }
    //left / right / top / bottom
    dom.clockBubble.changeDirection = function(direction) {
        dom.speechBubble.changeDirection(direction);
    }

    dom.clockBubble.changeTrianglePosition = function(position) {
        dom.speechBubble.changeTrianglePosition(position);
    }

    return dom;
}
