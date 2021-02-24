//このdom上でクリックするとframeppieceを作成できる
function AreaCreateFP(moveAreaDOM, fPResizeFrameLineWidth) {
    moveAreaDOM.areaCreateFP = {
        data: {
            zIndexFix: 100,
            fPColor: 'yellow',
            fPLineColor: 'blue',
            fPMinHeight: 0,
            fPResizeFrameLineWidth: fPResizeFrameLineWidth,
            currentFPIndex: 0,
        },
        childDOMs: {
            fPList: [],
        },
        activateFP: function (e) {
            var targetFP = this.targetFP;
            targetFP.removeEventListener('mousedown', {handleEvent: moveAreaDOM.areaCreateFP.activateFP, targetFP: this.targetFP});
            moveAreaDOM.areaCreateFP.deactivateFP(moveAreaDOM.areaCreateFP.childDOMs.fPList[0]);
            var targetFPIndexOnFPList = null;
            for(var i=0;i<moveAreaDOM.areaCreateFP.childDOMs.fPList.length;i++) {
                moveAreaDOM.areaCreateFP.childDOMs.fPList[i].style.zIndex = moveAreaDOM.areaCreateFP.data.zIndexFix - (i + 1);
                if(moveAreaDOM.areaCreateFP.childDOMs.fPList[i].areaCreateFP.fPIndex === targetFP.areaCreateFP.fPIndex) {
                    targetFPIndexOnFPList = i;
                    break;
                }
            }
            moveAreaDOM.areaCreateFP.childDOMs.fPList.splice(targetFPIndexOnFPList, 1);
            targetFP.style.zIndex = moveAreaDOM.areaCreateFP.data.zIndexFix;
            moveAreaDOM.areaCreateFP.childDOMs.fPList.unshift(targetFP);
            targetFP.dragResizableFP.activate_listener();
        },
        deactivateFP: function (fP) {
            fP.dragResizableFP.deactivate_listener();
            fP.addEventListener('mousedown', {handleEvent: moveAreaDOM.areaCreateFP.activateFP, targetFP: fP});
        },
    };

    moveAreaDOM.areaCreateFP.fPAdd = function (fP) {
        if(moveAreaDOM.areaCreateFP.childDOMs.fPList.length !== 0) {
            moveAreaDOM.areaCreateFP.deactivateFP(moveAreaDOM.areaCreateFP.childDOMs.fPList[0]);
        }
        for (var i = 0; i < moveAreaDOM.areaCreateFP.childDOMs.fPList.length; i++) {
            moveAreaDOM.areaCreateFP.childDOMs.fPList[i].style.zIndex = moveAreaDOM.areaCreateFP.data.zIndexFix - (i+1);
        }
        moveAreaDOM.areaCreateFP.childDOMs.fPList.unshift(fP);
        fP.areaCreateFP = {
            fPIndex: moveAreaDOM.areaCreateFP.data.currentFPIndex,
        }
        moveAreaDOM.areaCreateFP.data.currentFPIndex++;
        fP.style.zIndex = moveAreaDOM.areaCreateFP.data.zIndexFix;
    }


    moveAreaDOM.areaCreateFP.mousedownEventFunc = function (e) {
        if (moveAreaDOM.areaCreateFP.childDOMs.fPList.length >= moveAreaDOM.areaCreateFP.data.zIndexFix) {
            console.error('fP quantity over limit(100)');
            return false;
        }
        dacontroller.deactivateAllListener();
        var styleObjFramePiece = {
            position: 'absolute',
            opacity: 0.5,
        }
        var fP = document.createElement('div');
        moveAreaDOM.appendChild(fP);
        fP = new FramePiece(fP, moveAreaDOM.moveAreaDOM.data.width, moveAreaDOM.areaCreateFP.data.fPMinHeight, moveAreaDOM.areaCreateFP.data.fPColor);
        fP = new MovableFP(fP, moveAreaDOM);
        fP = new DragResizableFP(fP, moveAreaDOM, moveAreaDOM.areaCreateFP.data.fPLineColor, moveAreaDOM.areaCreateFP.data.fPResizeFrameLineWidth);
        styleObjApply(fP, styleObjFramePiece);
        moveAreaDOM.areaCreateFP.fPAdd(fP);
        fP.framePiece.moveCoordinate(0, moveAreaDOM.moveAreaDOM.getPageY(e));
        fP.framePiece.resizeRight(moveAreaDOM.moveAreaDOM.data.width);
        fP.framePiece.resizeBottom(0);
        fP.dragResizableFP.childDOMs.line.bottom.mousedownEventFunc(e);
    }
    moveAreaDOM.addEventListener('mousedown', moveAreaDOM.areaCreateFP.mousedownEventFunc);
    
    moveAreaDOM.areaCreateFP.deactivate_listener = function () {
        moveAreaDOM.removeEventListener('mousedown', moveAreaDOM.areaCreateFP.mousedownEventFunc);
    }
    moveAreaDOM.areaCreateFP.activate_listener = function () {
        moveAreaDOM.addEventListener('mousedown', moveAreaDOM.areaCreateFP.mousedownEventFunc);
    }
    dacontroller.append(moveAreaDOM.areaCreateFP.deactivate_listener);
    dacontroller.appendInit(moveAreaDOM.areaCreateFP.activate_listener);

    moveAreaDOM.areaCreateFP.resize = function(newWidth, newHeight) {
        var orgWidth = moveAreaDOM.moveAreaDOM.data.width;
        var orgHeight = moveAreaDOM.moveAreaDOM.data.height;
        moveAreaDOM.moveAreaDOM.resize(newWidth, newHeight);
        var resizeRate = {
            width: newWidth / orgWidth,
            height: newHeight / orgHeight,
        }
        for(var i=0;i<moveAreaDOM.areaCreateFP.childDOMs.fPList.length;i++) {
            var fP = moveAreaDOM.areaCreateFP.childDOMs.fPList[i];
            fP.framePiece.resizeRight(fP.framePiece.data.width * resizeRate.width);
            fP.framePiece.resizeBottom(fP.framePiece.data.height * resizeRate.height);
            fP.framePiece.moveCoordinate(fP.framePiece.data.left * resizeRate.width, fP.framePiece.data.top * resizeRate.height);
        }
    }

    moveAreaDOM.areaCreateFP.getInfoList = function() {
        var list = [];
        for(var i=0;i<moveAreaDOM.areaCreateFP.childDOMs.fPList.length;i++) {
            list.push(JSON.parse(JSON.stringify(moveAreaDOM.areaCreateFP.childDOMs.fPList[i].framePiece.data.info)));
        }
        return list;
    }
    moveAreaDOM.areaCreateFP.getInfoJSON = function() {
        return JSON.stringify(moveAreaDOM.areaCreateFP.getInfoList());
    }

    moveAreaDOM.areaCreateFP.restoreInfoList = function(list) {
        var styleObjFramePiece = {
            position: 'absolute',
            opacity: 0.5,
        }
        for(var i=0;i<list.length;i++) {
            var fP = document.createElement('div');
            moveAreaDOM.appendChild(fP);
            var fPHeight = moveAreaDOM.areaAdjustScale.convertTime2Height(list[i].time.start, list[i].time.end);
            fP = new FramePiece(fP, moveAreaDOM.moveAreaDOM.data.width, fPHeight, moveAreaDOM.areaCreateFP.data.fPColor);
            fP = new MovableFP(fP, moveAreaDOM);
            fP = new DragResizableFP(fP, moveAreaDOM, moveAreaDOM.areaCreateFP.data.fPLineColor, moveAreaDOM.areaCreateFP.data.fPResizeFrameLineWidth);
            styleObjApply(fP, styleObjFramePiece);
            moveAreaDOM.areaCreateFP.fPAdd(fP);
            fP.framePiece.setInfo(list[i]);
            fP.framePiece.setColor(tagColorList[list[i].tag]);  //グローバル変数tagColorList
            moveAreaDOM.areaAdjustScale.moveFramePiece(fP, list[i].time.start, list[i].time.end);
            fP.areaCreateFP.fPIndex = moveAreaDOM.areaCreateFP.data.currentFPIndex;
            moveAreaDOM.areaCreateFP.data.currentFPIndex++;
        }
    }
    moveAreaDOM.areaCreateFP.restoreInfoListFromJSON = function(json) {
        moveAreaDOM.areaCreateFP.restoreInfoList(JSON.parse(json));
    }

    moveAreaDOM.areaCreateFP.removeFP = function(framePiece) {
        for(var i=0;i<moveAreaDOM.areaCreateFP.childDOMs.fPList.length;i++) {
            if(moveAreaDOM.areaCreateFP.childDOMs.fPList[i].areaCreateFP.fPIndex===framePiece.areaCreateFP.fPIndex) {
                moveAreaDOM.areaCreateFP.childDOMs.fPList.splice(i,1);
            }
        }
        framePiece.framePiece.remove();
    }

    return moveAreaDOM;
}
