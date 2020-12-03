//ドラッグで移動するフレーム
//moveAreaDOM: MoveAreaDOM()
function MovableFP(framePiece, moveAreaDOM) {
    framePiece.movableFP = {
        data: {
            draginfo: {
                start_style_coordinate: {
                    left: framePiece.framePiece.data.left,
                    top: framePiece.framePiece.data.top
                },
                start_page_coordinate: {
                    left: null,
                    top: null
                },
                current_page_coordinate: {
                    left: null,
                    top: null
                },
                drag_monitor_id: null,
                interval_span: 20,
            },
        },
        //移動中にリセットするときに使う関数
        resetMove: function() {
            framePiece.framePiece.moveCoordinate(framePiece.movableFP.data.draginfo.start_style_coordinate.left, framePiece.movableFP.data.draginfo.start_style_coordinate.top);
        },
        //マウスダウン発生時、ドラッグ準備
        mousedownEventFunc: function (e) {
            //※チェック: 2020/11/02: dacontrollerについて検討中
            dacontroller.deactivateAllListener();

            //ドラッグ対応
            //ドラッグ開始位置を取得
            framePiece.movableFP.data.draginfo.start_style_coordinate.left = framePiece.framePiece.data.left;
            framePiece.movableFP.data.draginfo.start_style_coordinate.top = framePiece.framePiece.data.top;
            framePiece.movableFP.data.draginfo.start_page_coordinate.left = e.pageX;
            framePiece.movableFP.data.draginfo.start_page_coordinate.top = e.pageY;
            framePiece.movableFP.data.draginfo.current_page_coordinate.left = e.pageX;
            framePiece.movableFP.data.draginfo.current_page_coordinate.top = e.pageY;
            moveAreaDOM.addEventListener('mousemove', framePiece.movableFP.mousemoveEventFunc);
            moveAreaDOM.addEventListener('mouseup', framePiece.movableFP.clickEventFunc);
            e.stopPropagation();
        },
        //mousemoveイベントの実行内容
        mousemoveEventFunc: function (e) {
            //ドラッグモニタを起動
            if (framePiece.movableFP.data.draginfo.drag_monitor_id !== null) {
                throw 'Error: drag_monitor is now starting. but drag_monitor_id is not null.';
            } else {
                framePiece.movableFP.drag_monitor();
            }
            moveAreaDOM.removeEventListener('mousemove', framePiece.movableFP.mousemoveEventFunc);
            moveAreaDOM.removeEventListener('mouseup', framePiece.movableFP.clickEventFunc);
            moveAreaDOM.addEventListener('mousemove', framePiece.movableFP.mousemoveEventFunc2);
            moveAreaDOM.addEventListener('mouseup', framePiece.movableFP.mouseupEventFunc);
            moveAreaDOM.addEventListener('mouseleave', framePiece.movableFP.mouseleaveEventFunc);
            e.stopPropagation();
        },
        mousemoveEventFunc2: function (e) {
            framePiece.movableFP.data.draginfo.current_page_coordinate.left = e.pageX;
            framePiece.movableFP.data.draginfo.current_page_coordinate.top = e.pageY;
            e.stopPropagation();
        },
        //ドラッグモニタ
        drag_monitor: function () {
            framePiece.movableFP.data.draginfo.drag_monitor_id = setInterval(function () {
                var currentPageDiff = {
                    left: framePiece.movableFP.data.draginfo.current_page_coordinate.left - framePiece.movableFP.data.draginfo.start_page_coordinate.left,
                    top: framePiece.movableFP.data.draginfo.current_page_coordinate.top - framePiece.movableFP.data.draginfo.start_page_coordinate.top
                }
                var assumption_coordinate = {
                    left: framePiece.movableFP.data.draginfo.start_style_coordinate.left + currentPageDiff.left,
                    top: framePiece.movableFP.data.draginfo.start_style_coordinate.top + currentPageDiff.top
                }
                var leftOver = assumption_coordinate.left < 0;
                var rightOver = (assumption_coordinate.left + framePiece.framePiece.data.width) > moveAreaDOM.moveAreaDOM.data.width;
                var topOver = assumption_coordinate.top < 0;
                var bottomOver = (assumption_coordinate.top + framePiece.framePiece.data.height) > moveAreaDOM.moveAreaDOM.data.height;
                if (leftOver) {
                    assumption_coordinate.left = 0;
                } else if (rightOver) {
                    assumption_coordinate.left = moveAreaDOM.moveAreaDOM.data.width - framePiece.framePiece.data.width;
                }
                if (topOver) {
                    assumption_coordinate.top = 0;
                } else if (bottomOver) {
                    assumption_coordinate.top = moveAreaDOM.moveAreaDOM.data.height - framePiece.framePiece.data.height;
                }
                framePiece.framePiece.moveCoordinate(assumption_coordinate.left, assumption_coordinate.top);
            }, framePiece.movableFP.data.draginfo.interval_span);
        },

        mouseleaveEventFunc: function(e) {
            //console.log('.movableFP.mouseleaveEventFunc(): called.')
            framePiece.movableFP.mouseupEventFunc(e);
        },

        //mouseupイベントの実行内容
        mouseupEventFunc: function (e) {
            moveAreaDOM.removeEventListener('mousemove', framePiece.movableFP.mousemoveEventFunc2);
            moveAreaDOM.removeEventListener('mouseup', framePiece.movableFP.mouseupEventFunc);
            moveAreaDOM.removeEventListener('mouseleave', framePiece.movableFP.mouseupEventFunc);
            clearInterval(framePiece.movableFP.data.draginfo.drag_monitor_id);
            framePiece.movableFP.data.draginfo.drag_monitor_id = null;
            //※検討中: 2020/11/02: dacontroller
            dacontroller.initAllListener();

            //※検討中: 2020/11/02: aframeをどう呼び出すか
            //aframe.aframe.slideFrame(dom);
            moveAreaDOM.areaAdjustScale.slideFP2Scale(framePiece);
            saveBar.saveBar.changeDetected();
            e.stopPropagation();
        },
        clickEventFunc: function(e) {
            //console.log('.movableFP.clickEventFunc(): called.')
            moveAreaDOM.removeEventListener('mousemove', framePiece.movableFP.mousemoveEventFunc);
            moveAreaDOM.removeEventListener('mouseup', framePiece.movableFP.clickEventFunc);
            //clearInterval(framePiece.movableFP.data.draginfo.drag_monitor_id);
            //framePiece.movableFP.data.draginfo.drag_monitor_id = null;
            dacontroller.deactivateAllListener();
            infoSetterBubble.infoSetterBubble.appearAndStartOperateFP(framePiece);
            e.stopPropagation();
        },
        deactivate_listener: function () {
            framePiece.removeEventListener('mousedown', framePiece.movableFP.mousedownEventFunc);
            moveAreaDOM.removeEventListener('mousemove', framePiece.movableFP.mousemoveEventFunc);
            moveAreaDOM.removeEventListener('mouseup', framePiece.movableFP.mouseupEventFunc);
            moveAreaDOM.removeEventListener('mouseleave', framePiece.movableFP.mouseleaveEventFunc);
            if (clearInterval(framePiece.movableFP.data.draginfo.drag_monitor_id) !== null) {
                clearInterval(framePiece.movableFP.data.draginfo.drag_monitor_id);
                framePiece.movableFP.data.draginfo.drag_monitor_id = null;
            }
        },
        //activate
        activate_listener: function () {
            framePiece.addEventListener('mousedown', framePiece.movableFP.mousedownEventFunc);
        }
    }
    //イベントリスナを初期化する
    framePiece.addEventListener('mousedown', framePiece.movableFP.mousedownEventFunc);

    //※検討中: 20201102: dacontroller
    dacontroller.append(framePiece.movableFP.deactivate_listener);
    dacontroller.appendInit(framePiece.movableFP.activate_listener);

    //作成したdomをreturnする
    return framePiece;
}
