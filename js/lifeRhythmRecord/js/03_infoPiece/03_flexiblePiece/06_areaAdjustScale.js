//AreaAdjustScale
//areacreatefpで作成したframepieceを時間ごとの枠にフィットさせる
function AreaAdjustScale(moveAreaDOM, minutePerScale) {
    moveAreaDOM.areaAdjustScale = {
        data: {
            scale_quantity: null,
            scale_height: null,
            scale_width: moveAreaDOM.moveAreaDOM.data.width,
            scale_count: 0,
        },
        duplicationManager: null,
        childDOMs: {
            scales: [],
        },
    }
    moveAreaDOM.areaAdjustScale.data.scale_quantity = 24 * 60 / minutePerScale;
    moveAreaDOM.areaAdjustScale.duplicationManager = new DuplicationManager(moveAreaDOM.areaAdjustScale.data.scale_quantity);
    moveAreaDOM.areaAdjustScale.data.scale_height = Math.floor(moveAreaDOM.moveAreaDOM.data.height / moveAreaDOM.areaAdjustScale.data.scale_quantity);
    moveAreaDOM.moveAreaDOM.resize(moveAreaDOM.moveAreaDOM.data.width, moveAreaDOM.areaAdjustScale.data.scale_height * moveAreaDOM.areaAdjustScale.data.scale_quantity);
    moveAreaDOM.areaAdjustScale.createScale = function (index) {
        var tmp_dom = document.createElement('div');
        moveAreaDOM.appendChild(tmp_dom);
        moveAreaDOM.areaAdjustScale.data.scale_count++;
        tmp_dom.scale = {
            data: {
                width: moveAreaDOM.areaAdjustScale.data.scale_width,
                height: moveAreaDOM.areaAdjustScale.data.scale_height,
                left: 0,
                top: moveAreaDOM.areaAdjustScale.data.scale_height * index,
            },
            styleObj: {
                position: 'absolute',
                left: 0,
                top: null,
                width: moveAreaDOM.areaAdjustScale.data.scale_width + 'px',
                height: moveAreaDOM.areaAdjustScale.data.scale_height + 'px',
                border: '1px solid orange'
            }
        }
        tmp_dom.scale.styleObj.top = tmp_dom.scale.data.top + 'px';
        styleObjApply(tmp_dom, tmp_dom.scale.styleObj);
        tmp_dom.getCoordinateCorner = function () {
            return {
                left: tmp_dom.scale.data.left,
                top: tmp_dom.scale.data.top,
                right: tmp_dom.scale.data.left + tmp_dom.scale.data.width,
                bottom: tmp_dom.scale.data.top + tmp_dom.scale.data.height,
            };
        }
        tmp_dom.scale.redraw = function () {
            tmp_dom.scale.styleObj.left = tmp_dom.scale.data.left + 'px';
            tmp_dom.scale.styleObj.top = tmp_dom.scale.data.top + 'px';
            tmp_dom.scale.styleObj.width = tmp_dom.scale.data.width + 'px';
            tmp_dom.scale.styleObj.height = tmp_dom.scale.data.height + 'px';
            styleObjApply(tmp_dom, tmp_dom.scale.styleObj);
            applyString2Area(tmp_dom);
        }
        tmp_dom.scale.resize = function (width, height) {
            tmp_dom.scale.data.width = width;
            tmp_dom.scale.data.height = height;
            tmp_dom.scale.redraw();
        }
        tmp_dom.scale.moveCoordinate = function (left, top) {
            tmp_dom.scale.data.left = left;
            tmp_dom.scale.data.top = top;
            tmp_dom.scale.redraw();
        }
        tmp_dom.scale.redraw();

        return tmp_dom;
    }
    for (var i = 0; i < moveAreaDOM.areaAdjustScale.data.scale_quantity; i++) {
        moveAreaDOM.areaAdjustScale.childDOMs.scales[i] = moveAreaDOM.areaAdjustScale.createScale(i);
    }

    moveAreaDOM.areaAdjustScale.adjustTopCoordinate2BlockIndex = function (coordinate_top) {
        return Math.floor(coordinate_top / moveAreaDOM.areaAdjustScale.data.scale_height);
    }
    moveAreaDOM.areaAdjustScale.adjustBottomCoordinate2BlockIndex = function (coordinate_bottom) {
        return Math.ceil(coordinate_bottom / moveAreaDOM.areaAdjustScale.data.scale_height) - 1;
    }
    moveAreaDOM.areaAdjustScale.adjustTopCoordinate2Block = function (coordinate_top) {
        return moveAreaDOM.areaAdjustScale.childDOMs.scales[moveAreaDOM.areaAdjustScale.adjustTopCoordinate2BlockIndex(coordinate_top)];
    }
    moveAreaDOM.areaAdjustScale.adjustBottomCoordinate2Block = function (coordinate_bottom) {
        return moveAreaDOM.areaAdjustScale.childDOMs.scales[moveAreaDOM.areaAdjustScale.adjustBottomCoordinate2BlockIndex(coordinate_bottom)];
    }

    //framepieceの範囲に入るscaleのindex配列を返す
    moveAreaDOM.areaAdjustScale.convertFP2BlockSpanIndexes = function (framePiece) {
        var framePiece_crdnt = framePiece.framePiece.getCoordinate();
        var top_index = moveAreaDOM.areaAdjustScale.adjustTopCoordinate2Block(framePiece_crdnt.top);
        var bottom_index = moveAreaDOM.areaAdjustScale.adjustBottomCoordinate2Block(framePiece_crdnt.bottom);
        var indexes = [];
        for (var i = top_index; i <= bottom_index; i++) {
            indexes.push(i);
        }
        return indexes;
    }

    //framepieceの範囲に入るscaleの配列を返す
    moveAreaDOM.areaAdjustScale.convertFP2BlockSpan = function (framePiece) {
        var indexes = moveAreaDOM.areaAdjustScale.convertFP2BlockSpanIndexes(framePiece);
        var scales = [];
        for (var i = 0; i < indexes.length; i++) {
            scales.push(moveAreaDOM.areaAdjustScale.childDOMs.scales[indexes[i]])
        }
        return scales;
    }

    //framePieceの拡大予定のscale範囲のcoordinates(left,right,top,bottom)を返す
    moveAreaDOM.areaAdjustScale.convertFP2AdjustArea = function (framePiece) {
        var framePiece_crdnt = framePiece.framePiece.getCoordinate();
        var top_index = moveAreaDOM.areaAdjustScale.adjustTopCoordinate2BlockIndex(framePiece_crdnt.top);
        var bottom_index = moveAreaDOM.areaAdjustScale.adjustBottomCoordinate2BlockIndex(framePiece_crdnt.bottom);

        if (top_index !== bottom_index) {
            var top_scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[top_index];
            var top_scale_crdnt = top_scale.getCoordinateCorner();
            var top_scale_top_diff = framePiece_crdnt.top - top_scale_crdnt.top;
            var top_scale_bottom_diff = framePiece_crdnt.top - top_scale_crdnt.bottom;
            if (Math.abs(top_scale_top_diff) > Math.abs(top_scale_bottom_diff)) {
                //top_indexを1上げる
                top_index += 1;
            }
            var bottom_scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[bottom_index];
            var bottom_scale_crdnt = bottom_scale.getCoordinateCorner();
            var bottom_scale_top_diff = framePiece_crdnt.bottom - bottom_scale_crdnt.top;
            var bottom_scale_bottom_diff = framePiece_crdnt.bottom - bottom_scale_crdnt.bottom;
            if (Math.abs(bottom_scale_top_diff < Math.abs(bottom_scale_bottom_diff))) {
                //bottom_indexを1下げる
                bottom_index -= 1;
            }
        }
        top_scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[top_index];
        top_scale_crdnt = top_scale.getCoordinateCorner();
        bottom_scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[bottom_index];
        bottom_scale_crdnt = bottom_scale.getCoordinateCorner();
        return {
            left: top_scale_crdnt.left,
            top: top_scale_crdnt.top,
            right: bottom_scale_crdnt.right,
            bottom: bottom_scale_crdnt.bottom,
            index: {
                top: top_index,
                bottom: bottom_index,
            }
        }
    }

    moveAreaDOM.areaAdjustScale.convertIndex2Time = function (index, startOrEnd) {
        var minute_per_scale = 24 * 60 / moveAreaDOM.areaAdjustScale.data.scale_quantity;
        if (minute_per_scale !== Math.floor(minute_per_scale)) {
            throw '.areaAdjustScale.convertIndex2Time(): argument .areaAdjustScale.data.scale_quantity is invalid';
        }

        var tmp_minute = null;
        if (startOrEnd === 'end') {
            tmp_minute = (index + 1) * minute_per_scale;
        } else if (startOrEnd === 'start') {
            tmp_minute = index * minute_per_scale;
        } else {
            throw '.areaAdjustScale.convertIndex2Time(): argument startOrEnd is invalid.';
        }
        var tmp_hour = Math.floor(tmp_minute / 60);
        tmp_minute -= tmp_hour * 60;
        var tmp_ampm = null;
        if (tmp_hour >= 12) {
            tmp_hour -= 12;
            tmp_ampm = 'pm';
        } else {
            tmp_ampm = 'am';
        }
        return {
            ampm: tmp_ampm,
            hour: tmp_hour,
            minute: tmp_minute,
        }
    }
    moveAreaDOM.areaAdjustScale.convertTime2Index = function (time, startOrEnd) {
        var minute_per_scale = 24 * 60 / moveAreaDOM.areaAdjustScale.data.scale_quantity;
        if (minute_per_scale !== Math.floor(minute_per_scale)) {
            throw '.areaAdjustScale.convertIndex2Time(): argument .areaAdjustScale.data.scale_quantity is invalid'
        }
        var totalMinute = 0;
        if (time.ampm === 'pm') {
            totalMinute += 12 * 60;
        } else if (time.ampm === 'am') {
            totalMinute += 0;
        } else {
            throw '.areaAdjustScale.convertTime2Index(): argument time.ampm is invalid.';
        }
        totalMinute += time.hour * 60;
        totalMinute += time.minute;
        if (startOrEnd === 'end') {
            totalMinute -= minute_per_scale;
        }
        return totalMinute / minute_per_scale;
    }

    moveAreaDOM.areaAdjustScale.adjustFP2Scale = function (framePiece) {
        var area = moveAreaDOM.areaAdjustScale.convertFP2AdjustArea(framePiece);
        var width = area.right - area.left;
        var height = area.bottom - area.top;
        if (area.index.top > area.index.bottom) {
            moveAreaDOM.areaAdjustScale.removeFP(framePiece);
            return false;
        }
        if (!framePiece.framePiece.data.inited.time) {
            framePiece.framePiece.data.inited.time = true;
            if (moveAreaDOM.areaAdjustScale.duplicationManager.useBlock(area.index.top, area.index.bottom)) {
                framePiece.framePiece.moveCoordinate(area.left, area.top);
                framePiece.framePiece.resizeRight(width);
                framePiece.framePiece.resizeBottom(height);
                framePiece.dragResizableFP.resizeFrame();
                framePiece.framePiece.setStartTime(moveAreaDOM.areaAdjustScale.convertIndex2Time(area.index.top, 'start'));
                framePiece.framePiece.setEndTime(moveAreaDOM.areaAdjustScale.convertIndex2Time(area.index.bottom, 'end'));
                dacontroller.deactivateAllListener();
                infoSetterBubble.infoSetterBubble.appearAndStartOperateFP(framePiece);
            } else {
                moveAreaDOM.areaAdjustScale.removeFP(framePiece);
            }
        } else {
            var fPStartTimeIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(framePiece.framePiece.data.info.time.start, 'start');
            var fPEndTimeIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(framePiece.framePiece.data.info.time.end, 'end');
            if (moveAreaDOM.areaAdjustScale.duplicationManager.moveBlock(fPStartTimeIndex, fPEndTimeIndex, area.index.top, area.index.bottom)) {
                framePiece.framePiece.moveCoordinate(area.left, area.top);
                framePiece.framePiece.resizeRight(width);
                framePiece.framePiece.resizeBottom(height);
                framePiece.dragResizableFP.resizeFrame();
                framePiece.framePiece.setStartTime(moveAreaDOM.areaAdjustScale.convertIndex2Time(area.index.top, 'start'));
                framePiece.framePiece.setEndTime(moveAreaDOM.areaAdjustScale.convertIndex2Time(area.index.bottom, 'end'));
            } else {
                framePiece.dragResizableFP.resetMove();
            }
        }
    }
    moveAreaDOM.areaAdjustScale.convertFP2SlideArea = function (framePiece) {
        var framePiece_crdnt = framePiece.framePiece.getCoordinate();

        var top_index = moveAreaDOM.areaAdjustScale.adjustTopCoordinate2BlockIndex(framePiece_crdnt.top);
        var top_scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[top_index];
        var top_scale_crdnt = top_scale.getCoordinateCorner();

        var bottom_index = null;
        if (Math.abs(framePiece_crdnt.top - top_scale_crdnt.top) <= Math.abs(framePiece_crdnt.top - top_scale_crdnt.bottom)) {
            bottom_index = top_index + framePiece.framePiece.data.height / moveAreaDOM.areaAdjustScale.data.scale_height - 1;
        } else {
            bottom_index = moveAreaDOM.areaAdjustScale.adjustBottomCoordinate2BlockIndex(framePiece_crdnt.bottom);
            top_index = bottom_index - (framePiece.framePiece.data.height / moveAreaDOM.areaAdjustScale.data.scale_height - 1);
            top_scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[top_index];
            top_scale_crdnt = top_scale.getCoordinateCorner();
        }
        return {
            left: top_scale_crdnt.left,
            top: top_scale_crdnt.top,
            right: top_scale_crdnt.left + framePiece.framePiece.data.width,
            bottom: top_scale_crdnt.top + framePiece.framePiece.data.height,
            index: {
                top: top_index,
                bottom: bottom_index
            }
        }
    }
    moveAreaDOM.areaAdjustScale.slideFP2Scale = function (framePiece) {
        var area = moveAreaDOM.areaAdjustScale.convertFP2SlideArea(framePiece);
        var fpWidth = area.right - area.left;
        var fpHeight = area.bottom - area.top;
        var fPStartTimeIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(framePiece.framePiece.data.info.time.start, 'start');
        var fPEndTimeIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(framePiece.framePiece.data.info.time.end, 'end');

        if (moveAreaDOM.areaAdjustScale.duplicationManager.moveBlock(fPStartTimeIndex, fPEndTimeIndex, area.index.top, area.index.bottom)) {
            framePiece.framePiece.moveCoordinate(area.left, area.top);
            framePiece.framePiece.resizeRight(fpWidth);
            framePiece.framePiece.resizeBottom(fpHeight);
            framePiece.dragResizableFP.resizeFrame();
            framePiece.framePiece.setStartTime(moveAreaDOM.areaAdjustScale.convertIndex2Time(area.index.top, 'start'));
            framePiece.framePiece.setEndTime(moveAreaDOM.areaAdjustScale.convertIndex2Time(area.index.bottom, 'end'));
        } else {
            framePiece.movableFP.resetMove();
        }
    }

    moveAreaDOM.areaAdjustScale.resize = function (newWidth, newHeight) {
        //左上を起点にサイズ調整する
        //倍率で指定し、すべての子要素のleft,top,width,heightをその倍率で拡大縮小
        //子要素: framePiece(areaCreateFPで対応済み), scales
        var orgWidth = moveAreaDOM.moveAreaDOM.data.width;
        var orgHeight = moveAreaDOM.moveAreaDOM.data.height;
        var resizeRate = {
            width: newWidth / orgWidth,
            height: newHeight / orgHeight,
        };
        moveAreaDOM.areaAdjustScale.data.scale_width = newWidth;
        moveAreaDOM.areaAdjustScale.data.scale_height = Math.floor(newHeight / moveAreaDOM.areaAdjustScale.data.scale_quantity);

        for (var i = 0; i < moveAreaDOM.areaAdjustScale.childDOMs.scales.length; i++) {
            var scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[i];
            scale.scale.resize(moveAreaDOM.areaAdjustScale.data.scale_width, moveAreaDOM.areaAdjustScale.data.scale_height);
            scale.scale.moveCoordinate(scale.scale.data.left * resizeRate.width, moveAreaDOM.areaAdjustScale.data.scale_height * i);
        }
        moveAreaDOM.areaCreateFP.resize(newWidth, newHeight);   //ここでmoveAreaDOMもresizeされる
        moveAreaDOM.moveAreaDOM.resize(moveAreaDOM.moveAreaDOM.data.width, moveAreaDOM.areaAdjustScale.data.scale_height * moveAreaDOM.areaAdjustScale.data.scale_quantity);
    }

    moveAreaDOM.areaAdjustScale.moveFramePiece = function (framePiece, newStartTime, newEndTime) {
        var orgStartIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(framePiece.framePiece.data.info.time.start, 'start');
        var orgEndIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(framePiece.framePiece.data.info.time.end, 'end');
        var newStartIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(newStartTime, 'start');
        var newEndIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(newEndTime, 'end');
        if (moveAreaDOM.areaAdjustScale.duplicationManager.moveBlock(orgStartIndex, orgEndIndex, newStartIndex, newEndIndex)) {
            var top_scale = moveAreaDOM.areaAdjustScale.childDOMs.scales[newStartIndex];
            var top_scale_crdnt = top_scale.getCoordinateCorner();

            var newStartTimeScale = moveAreaDOM.areaAdjustScale.childDOMs.scales[newStartIndex];
            var newEndTimeScale = moveAreaDOM.areaAdjustScale.childDOMs.scales[newEndIndex];
            var newStartTimeScaleTop = newStartTimeScale.scale.data.top;
            var newEndTimeScaleBottom = newEndTimeScale.scale.data.top + newEndTimeScale.scale.data.height;
            var newFPHeight = newEndTimeScaleBottom - newStartTimeScaleTop;

            framePiece.framePiece.moveCoordinate(top_scale_crdnt.left, top_scale_crdnt.top);
            framePiece.framePiece.resizeBottom(newFPHeight);
            framePiece.dragResizableFP.resizeFrame();
            return true;
        } else {
            return false;
        }
    }

    moveAreaDOM.areaAdjustScale.convertTime2Height = function (startTime, endTime) {
        var startTimeIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(startTime, 'start');
        var endtTimeIndex = moveAreaDOM.areaAdjustScale.convertTime2Index(endTime, 'end');
        return (endtTimeIndex - startTimeIndex + 1) * moveAreaDOM.areaAdjustScale.data.scale_height;
    }

    moveAreaDOM.areaAdjustScale.removeFP = function (fP) {
        var scale_index = moveAreaDOM.areaAdjustScale.convertFP2AdjustArea(fP).index;
        moveAreaDOM.areaAdjustScale.duplicationManager.releaseBlock(scale_index.top, scale_index.bottom);
        moveAreaDOM.areaCreateFP.removeFP(fP);
    }

    moveAreaDOM.areaAdjustScale.removeAllFP = function () {
        while (moveAreaDOM.areaCreateFP.childDOMs.fPList.length > 0) {
            var targetFP = moveAreaDOM.areaCreateFP.childDOMs.fPList.shift();
            var scale_index = moveAreaDOM.areaAdjustScale.convertFP2AdjustArea(targetFP).index;
            moveAreaDOM.areaAdjustScale.duplicationManager.releaseBlock(scale_index.top, scale_index.bottom);
            targetFP.framePiece.remove();
        }
    }

    return moveAreaDOM;
}
