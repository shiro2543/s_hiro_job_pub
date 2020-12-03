//direction: top / bottom / left / right
function TriangleArrow(dom, width, height, color) {
    dom.triangle = {
        data: {
            width: width,
            height: height,
            direction: 'top',   //初期値
            borderWidth: {
                top: null,
                bottom: null,
                left: null,
                right: null,
            },
            activeColor: color,
            color: {
                top: null,
                bottom: null,
                left: null,
                right: null
            },
            dir_opposition: null,
            dir_side: []
        },
        styleObj: {
            position: 'absolute',
            width: 0,
            height: 0,
            borderTop: null,
            borderBottom: null,
            borderLeft: null,
            borderRight: null,
        },
        moveCoordinate: function (left, top) {
            dom.style.left = left + 'px';
            dom.style.top = top + 'px';
        }
    }
    dom.triangle.redraw = function (direction) {
        dom.triangle.data.direction = direction;
        if (direction === 'top') {
            dom.triangle.data.dir_opposition = 'bottom';
            dom.triangle.data.dir_side[0] = 'left';
            dom.triangle.data.dir_side[1] = 'right';
        } else if (direction === 'bottom') {
            dom.triangle.data.dir_opposition = 'top';
            dom.triangle.data.dir_side[0] = 'right';
            dom.triangle.data.dir_side[1] = 'left';
        } else if (direction === 'left') {
            dom.triangle.data.dir_opposition = 'right';
            dom.triangle.data.dir_side[0] = 'top';
            dom.triangle.data.dir_side[1] = 'bottom';
        } else if (direction === 'right') {
            dom.triangle.data.dir_opposition = 'left';
            dom.triangle.data.dir_side[0] = 'bottom';
            dom.triangle.data.dir_side[1] = 'top';
        } else {
            throw 'Error';
        }
        dom.triangle.data.borderWidth[direction] = 0;
        if(direction==='top'||direction==='bottom') {
            dom.triangle.data.borderWidth[dom.triangle.data.dir_opposition] = height;
            dom.triangle.data.borderWidth[dom.triangle.data.dir_side[0]] = width / 2;
            dom.triangle.data.borderWidth[dom.triangle.data.dir_side[1]] = width / 2;
        } else {
            dom.triangle.data.borderWidth[dom.triangle.data.dir_opposition] = width;
            dom.triangle.data.borderWidth[dom.triangle.data.dir_side[0]] = height / 2;
            dom.triangle.data.borderWidth[dom.triangle.data.dir_side[1]] = height / 2;
        }
        dom.triangle.data.color[direction] = 'transparent';
        dom.triangle.data.color[dom.triangle.data.dir_opposition] = dom.triangle.data.activeColor;
        dom.triangle.data.color[dom.triangle.data.dir_side[0]] = 'transparent';
        dom.triangle.data.color[dom.triangle.data.dir_side[1]] = 'transparent';
        dom.triangle.styleObj.borderTop = dom.triangle.data.borderWidth.top + 'px solid ' + dom.triangle.data.color.top;
        dom.triangle.styleObj.borderBottom = dom.triangle.data.borderWidth.bottom + 'px solid ' + dom.triangle.data.color.bottom;
        dom.triangle.styleObj.borderLeft = dom.triangle.data.borderWidth.left + 'px solid ' + dom.triangle.data.color.left;
        dom.triangle.styleObj.borderRight = dom.triangle.data.borderWidth.right + 'px solid ' + dom.triangle.data.color.right;
        styleObjApply(dom, dom.triangle.styleObj);
    }
    
    dom.triangle.moveCoordinateWithArrowTip = function(direction, left, top) {
        dom.triangle.data.direction = direction;
        dom.triangle.redraw(direction);
        if(dom.triangle.data.direction==='top') {
            dom.style.left = (left - dom.triangle.data.borderWidth.left) + 'px';
            dom.style.top = top + 'px';
        } else if(dom.triangle.data.direction==='bottom') {
            dom.style.left = (left - dom.triangle.data.borderWidth.left) + 'px';
            dom.style.top = (top - (dom.triangle.data.borderWidth.top + dom.triangle.data.borderWidth.bottom)) + 'px';
        } else if(dom.triangle.data.direction==='left') {
            dom.style.left = left + 'px';
            dom.style.top = (top - dom.triangle.data.borderWidth.top) + 'px';
        } else if(dom.triangle.data.direction==='right') {
            dom.style.left = (left - (dom.triangle.data.borderWidth.left + dom.triangle.data.borderWidth.right)) + 'px';
            dom.style.top = (top - dom.triangle.data.borderWidth.top) + 'px';
        }
    }
    dom.triangle.moveCoordinate(0,0);
    dom.triangle.redraw(dom.triangle.data.direction);
    return dom;
}
