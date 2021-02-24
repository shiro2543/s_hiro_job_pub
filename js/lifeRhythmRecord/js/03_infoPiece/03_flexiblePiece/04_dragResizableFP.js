//端をドラッグしてリサイズできるframe
function DragResizableFP(framePiece, moveAreaDOM, lineColor, frameLineWidth) {
    framePiece.dragResizableFP = {
        data: {
            draginfo: {
                start_coordinate: {
                    style: {
                        width: null,
                        height: null
                    },
                    page: {
                        left: null,
                        top: null
                    },
                },
                //page
                current_coordinate: {
                    left: null,
                    top: null
                },
                current_direction: null,
                interval_id: null,
                interval_span: 80,
                min_size: {
                    width: -1,
                    height: -1
                }
            },
            frameLineWidth: frameLineWidth,
            lineColor: lineColor,
        },
        childDOMs: {
            line: {
                top: new SlowlyAppear(new FramePiece(document.createElement('div'))),
                bottom: new SlowlyAppear(new FramePiece(document.createElement('div')))
            },
        },
        styleObj: {
            dragFrame: {
                line: {
                    horizontal: {},
                    vertical: {},
                },
                corner: {}
            }
        }
    }
    
    framePiece.dragResizableFP.styleObj.dragFrame.line.horizontal = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 0,
        height: framePiece.dragResizableFP.data.frameLineWidth + 'px',
        backgroundColor: framePiece.dragResizableFP.data.lineColor,
        opacity: 0,
        padding: 0,
        margin: 0,
    }
    framePiece.dragResizableFP.styleObj.dragFrame.line.vertical = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: framePiece.dragResizableFP.data.frameLineWidth + 'px',
        height: 0,
        backgroundColor: framePiece.dragResizableFP.data.lineColor,
        opacity: 0,
        padding: 0,
        margin: 0,
    }
    //childDOMsのcss適用およびappendchild
    Object.keys(framePiece.dragResizableFP.childDOMs.line).forEach(function (key) {
        framePiece.appendChild(framePiece.dragResizableFP.childDOMs.line[key]);
    });


    styleObjApply(framePiece.dragResizableFP.childDOMs.line.top, framePiece.dragResizableFP.styleObj.dragFrame.line.horizontal);
    styleObjApply(framePiece.dragResizableFP.childDOMs.line.bottom, framePiece.dragResizableFP.styleObj.dragFrame.line.horizontal);

    framePiece.dragResizableFP.childDOMs.line.top.framePiece.resizeBottom(px2num(framePiece.dragResizableFP.styleObj.dragFrame.line.horizontal.height));
    framePiece.dragResizableFP.childDOMs.line.bottom.framePiece.resizeBottom(px2num(framePiece.dragResizableFP.styleObj.dragFrame.line.horizontal.height));

    //マウスオンしたときのカーソルの形状変化を有効にする
    framePiece.dragResizableFP.activate_cursor_change = function () {
        framePiece.dragResizableFP.childDOMs.line.top.style.cursor = 'n-resize';
        framePiece.dragResizableFP.childDOMs.line.bottom.style.cursor = 's-resize';
    }
    framePiece.dragResizableFP.activate_cursor_change(); //初期化
    //同、無効にする
    framePiece.dragResizableFP.deactivate_cursor_change = function () {
        framePiece.dragResizableFP.childDOMs.line.top.style.cursor = '';
        framePiece.dragResizableFP.childDOMs.line.bottom.style.cursor = '';
    }

    //domのサイズにframe_lineとframe_cornerを合わせる
    framePiece.dragResizableFP.resizeFrame = function () {
        //domのサイズにframe_lineのサイズを合わせる
        framePiece.dragResizableFP.childDOMs.line.top.framePiece.resizeRight(moveAreaDOM.moveAreaDOM.data.width);
        framePiece.dragResizableFP.childDOMs.line.bottom.framePiece.resizeRight(moveAreaDOM.moveAreaDOM.data.width);
        
        framePiece.dragResizableFP.childDOMs.line.top.framePiece.resizeBottom(framePiece.dragResizableFP.data.frameLineWidth);
        framePiece.dragResizableFP.childDOMs.line.bottom.framePiece.resizeTop(framePiece.dragResizableFP.data.frameLineWidth);

        //domのサイズにframe_lineの位置を合わせる
        framePiece.dragResizableFP.childDOMs.line.top.framePiece.moveCoordinate(0 - framePiece.framePiece.data.borderWidth, 0 - framePiece.dragResizableFP.data.frameLineWidth / 2 - framePiece.framePiece.data.borderWidth);
        framePiece.dragResizableFP.childDOMs.line.bottom.framePiece.moveCoordinate(0 - framePiece.framePiece.data.borderWidth, framePiece.framePiece.data.height - framePiece.dragResizableFP.data.frameLineWidth / 2 - framePiece.framePiece.data.borderWidth);

    }
    framePiece.dragResizableFP.resizeFrame();

    //ドラッグ用外フレームのコンストラクタ
    //type: line / corner
    //direction: left, right, ...
    framePiece.dragResizableFP.outerFrameCreationFunc = function (type, direction) {
        var isDirectionLeft = null;
        var isDirectionTop = null;
        if (direction.match(/left.*/) !== null) {
            isDirectionLeft = -1;
        } else if (direction.match(/right.*/) !== null) {
            isDirectionLeft = 1;
        } else {
            isDirectionLeft = 0;
        }
        if (direction.match(/.*[tT]op/) !== null) {
            isDirectionTop = -1;
        } else if (direction.match(/.*[bB]ottom/) !== null) {
            isDirectionTop = 1;
        } else {
            isDirectionTop = 0;
        }
        //mousedown
        framePiece.dragResizableFP.childDOMs[type][direction].mousedownEventFunc = function (e) {
            dacontroller.deactivateAllListener();

            //ドラッグ情報の初期化
            framePiece.dragResizableFP.data.draginfo.current_direction = direction;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.style.width = framePiece.framePiece.data.width;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.style.height = framePiece.framePiece.data.height;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.page.left = e.pageX;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.page.top = e.pageY;
            framePiece.dragResizableFP.data.draginfo.current_coordinate.left = e.pageX;
            framePiece.dragResizableFP.data.draginfo.current_coordinate.top = e.pageY;
            //ドラッグモニタの起動
            framePiece.dragResizableFP.childDOMs[type][direction].drag_monitor();
            //リスナの初期化
            framePiece.dragResizableFP.childDOMs[type][direction].slowlyAppear.activate_listener();
            moveAreaDOM.addEventListener('mousemove', framePiece.dragResizableFP.childDOMs[type][direction].mousemoveEventFunc);
            moveAreaDOM.addEventListener('mouseup', framePiece.dragResizableFP.childDOMs[type][direction].mouseupEventFunc);
            moveAreaDOM.addEventListener('mouseleave', framePiece.dragResizableFP.childDOMs[type][direction].mouseleaveEventFunc);

            e.stopPropagation();
        }
        //mousemove
        framePiece.dragResizableFP.childDOMs[type][direction].mousemoveEventFunc = function (e) {
            framePiece.dragResizableFP.data.draginfo.current_coordinate.left = e.pageX;
            framePiece.dragResizableFP.data.draginfo.current_coordinate.top = e.pageY;
            e.stopPropagation();
        }
        //drag_monitor
        framePiece.dragResizableFP.childDOMs[type][direction].drag_monitor = function () {
            framePiece.dragResizableFP.data.draginfo.interval_id = setInterval(() => {
                var dragDiffLeft = framePiece.dragResizableFP.data.draginfo.current_coordinate.left - framePiece.dragResizableFP.data.draginfo.start_coordinate.page.left;
                var dragDiffTop = framePiece.dragResizableFP.data.draginfo.current_coordinate.top - framePiece.dragResizableFP.data.draginfo.start_coordinate.page.top;

                var tmp_resize_width = null;
                var max_width = null;
                if (isDirectionLeft === -1) {
                    tmp_resize_width = framePiece.dragResizableFP.data.draginfo.start_coordinate.style.width - dragDiffLeft;
                    max_width = framePiece.framePiece.getCoordinate().right;
                    if (tmp_resize_width >= max_width) {
                        tmp_resize_width = max_width;
                    }
                    if (tmp_resize_width >= framePiece.dragResizableFP.data.draginfo.min_size.width) {
                        framePiece.framePiece.resizeLeft(tmp_resize_width);
                    } else {
                        framePiece.framePiece.resizeLeft(framePiece.dragResizableFP.data.draginfo.min_size.width);
                    }
                } else if (isDirectionLeft === 1) {
                    tmp_resize_width = framePiece.dragResizableFP.data.draginfo.start_coordinate.style.width + dragDiffLeft;
                    max_width = moveAreaDOM.moveAreaDOM.data.width - framePiece.framePiece.data.left;
                    if (tmp_resize_width >= max_width) {
                        tmp_resize_width = max_width;
                    }
                    if (tmp_resize_width > framePiece.dragResizableFP.data.draginfo.min_size.width) {
                        framePiece.framePiece.resizeRight(tmp_resize_width);
                    }
                }

                var tmp_resize_height = null;
                var max_height = null;
                if (isDirectionTop === -1) {
                    tmp_resize_height = framePiece.dragResizableFP.data.draginfo.start_coordinate.style.height - dragDiffTop;
                    max_height = framePiece.framePiece.getCoordinate().bottom;
                    if (tmp_resize_height >= max_height) {
                        tmp_resize_height = max_height;
                    }
                    if (tmp_resize_height > framePiece.dragResizableFP.data.draginfo.min_size.height) {
                        framePiece.framePiece.resizeTop(tmp_resize_height);
                    }
                } else if (isDirectionTop === 1) {
                    tmp_resize_height = framePiece.dragResizableFP.data.draginfo.start_coordinate.style.height + dragDiffTop;
                    max_height = moveAreaDOM.moveAreaDOM.data.height - framePiece.framePiece.data.top;
                    if (tmp_resize_height >= max_height) {
                        tmp_resize_height = max_height;
                    }
                    if (tmp_resize_height > framePiece.dragResizableFP.data.draginfo.min_size.height) {
                        framePiece.framePiece.resizeBottom(tmp_resize_height);
                    }
                }
                framePiece.dragResizableFP.resizeFrame();
            }, framePiece.dragResizableFP.data.draginfo.interval_span);
        }

        //mouseleave
        framePiece.dragResizableFP.childDOMs[type][direction].mouseleaveEventFunc = function(e) {
            dacontroller.initAllListener();

            //drag_monitorを停止
            clearInterval(framePiece.dragResizableFP.data.draginfo.interval_id);

            var preResizeFPCoordinate = {
                left: framePiece.framePiece.data.left,
                top: framePiece.framePiece.data.top,
                right: framePiece.framePiece.data.left + framePiece.framePiece.data.width,
                bottom: framePiece.framePiece.data.top + framePiece.framePiece.data.height,
            }

            if(isDirectionLeft === -1) {
                framePiece.framePiece.resizeLeft(preResizeFPCoordinate.right);
            } else if(isDirectionLeft === 1) {
                framePiece.framePiece.resizeRight(moveAreaDOM.moveAreaDOM.data.width - preResizeFPCoordinate.left);
            }

            if(isDirectionTop === -1) {
                framePiece.framePiece.resizeTop(preResizeFPCoordinate.bottom);
            } else if(isDirectionTop === 1) {
                framePiece.framePiece.resizeBottom(moveAreaDOM.moveAreaDOM.data.height - preResizeFPCoordinate.top);
            }

            moveAreaDOM.areaAdjustScale.adjustFP2Scale(framePiece);

            //ドラッグ情報の初期化
            framePiece.dragResizableFP.data.draginfo.current_direction = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.style.width = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.style.height = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.page.left = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.page.top = null;
            framePiece.dragResizableFP.data.draginfo.current_coordinate.left = null;
            framePiece.dragResizableFP.data.draginfo.current_coordinate.top = null;

            e.stopPropagation();
        }

        //mouseup
        framePiece.dragResizableFP.childDOMs[type][direction].mouseupEventFunc = function (e) {
            dacontroller.initAllListener();

            //drag_monitorを停止
            clearInterval(framePiece.dragResizableFP.data.draginfo.interval_id);
            
            moveAreaDOM.areaAdjustScale.adjustFP2Scale(framePiece);

            //ドラッグ情報の初期化
            framePiece.dragResizableFP.data.draginfo.current_direction = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.style.width = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.style.height = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.page.left = null;
            framePiece.dragResizableFP.data.draginfo.start_coordinate.page.top = null;
            framePiece.dragResizableFP.data.draginfo.current_coordinate.left = null;
            framePiece.dragResizableFP.data.draginfo.current_coordinate.top = null;
            
            e.stopPropagation();
        }
        //リスナ初期化
        framePiece.dragResizableFP.childDOMs[type][direction].addEventListener('mousedown', framePiece.dragResizableFP.childDOMs[type][direction].mousedownEventFunc);
    }
    Object.keys(framePiece.dragResizableFP.childDOMs.line).forEach(function (key) {
        framePiece.dragResizableFP.outerFrameCreationFunc('line', key);
    })

    //リスナをdeacitivate
    framePiece.dragResizableFP.deactivate_listener = function () {
        Object.keys(framePiece.dragResizableFP.childDOMs.line).forEach(function (key) {
            framePiece.dragResizableFP.childDOMs.line[key].removeEventListener('mousedown', framePiece.dragResizableFP.childDOMs.line[key].mousedownEventFunc);
            moveAreaDOM.removeEventListener('mousemove', framePiece.dragResizableFP.childDOMs.line[key].mousemoveEventFunc);
            moveAreaDOM.removeEventListener('mouseup', framePiece.dragResizableFP.childDOMs.line[key].mouseupEventFunc);
            moveAreaDOM.removeEventListener('mouseleave', framePiece.dragResizableFP.childDOMs.line[key].mouseleaveEventFunc);
        })
        framePiece.dragResizableFP.deactivate_cursor_change();
    }
    //activate
    framePiece.dragResizableFP.activate_listener = function () {
        Object.keys(framePiece.dragResizableFP.childDOMs.line).forEach(function (key) {
            framePiece.dragResizableFP.childDOMs.line[key].addEventListener('mousedown', framePiece.dragResizableFP.childDOMs.line[key].mousedownEventFunc);
        })
        framePiece.dragResizableFP.activate_cursor_change();
    }

    framePiece.dragResizableFP.resetMove = function() {
        if(framePiece.dragResizableFP.data.draginfo.current_direction==='top') {
            framePiece.framePiece.resizeTop(framePiece.dragResizableFP.data.draginfo.start_coordinate.style.height);
        } else if(framePiece.dragResizableFP.data.draginfo.current_direction==='bottom') {
            framePiece.framePiece.resizeBottom(framePiece.dragResizableFP.data.draginfo.start_coordinate.style.height);
        } else {
            throw '.dragResizableFP.resetMove(): argument .framePiece.data.draginfo.current_direction is invalid.';
        }
    }

    dacontroller.append(framePiece.dragResizableFP.deactivate_listener);
    dacontroller.appendInit(framePiece.dragResizableFP.activate_listener);

    return framePiece;
}
