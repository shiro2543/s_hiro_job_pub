//FramePieceの移動エリア
function MoveAreaDOM(dom, init_width, init_height) {
    dom.moveAreaDOM = {
        data: {
            width: init_width,
            height: init_height,
            left: 0,
            top: 0,
        },
        styleObj: {
            position: 'absolute',
            width: null,
            height: null,
            left: null,
            top: null,
        },
        getCoordinateCorner: function () {
            return {
                left: dom.moveAreaDOM.data.left,
                top: dom.moveAreaDOM.data.top,
                right: dom.moveAreaDOM.data.left + dom.moveAreaDOM.data.width,
                bottom: dom.moveAreaDOM.data.top + dom.moveAreaDOM.data.height,
            }
        },
        getPageX: function (event) {
            return event.pageX - this.data.left;
        },
        getPageY: function (event) {
            return event.pageY - this.data.top;
        },
        getPage: function (event) {
            return { x: this.getPageX(event), y: this.getPageY(event) };
        },
        fixPageX: function (pageX) {
            return pageX - this.data.coordinate.left;
        },
        fixPageY: function (pageY) {
            return pageY - this.data.coordinate.top;
        },
    }

    dom.moveAreaDOM.redraw = function() {
        dom.moveAreaDOM.styleObj.width = dom.moveAreaDOM.data.width + 'px';
        dom.moveAreaDOM.styleObj.height = dom.moveAreaDOM.data.height + 'px';
        dom.moveAreaDOM.styleObj.left = dom.moveAreaDOM.data.left + 'px';
        dom.moveAreaDOM.styleObj.top = dom.moveAreaDOM.data.top + 'px';
        styleObjApply(dom, dom.moveAreaDOM.styleObj);
    }

    dom.moveAreaDOM.resize = function(width, height) {
        dom.moveAreaDOM.data.width = width;
        dom.moveAreaDOM.data.height = height;
        dom.moveAreaDOM.redraw();
    }

    dom.moveAreaDOM.moveCoordinate = function(left, top) {
        dom.moveAreaDOM.data.left = left;
        dom.moveAreaDOM.data.top = top;
        dom.moveAreaDOM.redraw();
    }

    dom.moveAreaDOM.redraw();
    return dom;
}
