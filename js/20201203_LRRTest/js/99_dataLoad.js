var getValues = function () {
    return {
        calender: cal.calender.getDate(),
        infoPiece: moveAreaDOM.areaCreateFP.getInfoList(),
        rightMenu: rightMenu.rightMenu.getValues(),
    }
}
var getValuesJSON = function () {
    return JSON.stringify(getValues());
}
var restoreValues = function (values) {
    cal.calender.setDate(values.calender);
    infoPieceTitle.infoPieceTitle.setValues(values.calender);
    rightMenu.rightMenu.setValues(values.rightMenu);
    moveAreaDOM.areaCreateFP.restoreInfoList(values.infoPiece);
}
var restoreValuesJSON = function (jsonString) {
    restoreValues(JSON.parse(jsonString))
}

var resetValues = function(date) {
    //infoPieceTitle
    infoPieceTitle.infoPieceTitle.setValues(date);
    //leftMenu
    cal.calender.resetDate(date);
    //infoPiece
    //  flexiblePiece
    moveAreaDOM.areaAdjustScale.removeAllFP();
    //  infoSetterBubble
    infoSetterBubble.infoSetterBubble.resetInfo();
    //rightMenu
    rightMenu.rightMenu.resetValues();
}

var downloadURL = 'http://127.0.0.1:18080/LRRDownLoad.php';
//date = {year, month, date};
var downloadInfo = function (date) {
    //console.log('downloadInfo(): date: ');
    //console.log(date);
    var requestURL = downloadURL;
    resetValues(date);
    var request = new XMLHttpRequest();
    request.responseType = 'text';
    request.open('POST', requestURL, true);
    request.onload = function () {
        console.log('downloadInfo(): request.readyState: ' + request.readyState);
        console.log('downloadInfo(): request.status: ' + request.status);
        if (request.readyState === 4 && request.status === 200) {
            //console.log('downloadInfo(): info: ');
            //console.log(request.response);
            if(request.response!=='') {
                restoreValuesJSON(request.response);
            }
        } else {
            throw 'downLoadInfo(): http response invalid.';
        }
    }
    var sendJSON = JSON.stringify(date);
    request.send(sendJSON);
}

var uploadURL = 'http://127.0.0.1:18080/LRRUpLoad.php';
var uploadInfo = function () {
    var requestURL = uploadURL;
    var request = new XMLHttpRequest();
    request.onload = function () {
        console.log('uploadInfo(): request.readyState: ' + request.readyState);
        console.log('uploadInfo(): request.status: ' + request.status);
        if(request.readyState === 4 && request.status === 200) {
            console.log('uploadInfo(): request succeeded.');
        } else {
            throw 'uploadInfo(): http response invalid.';
        }
    }
    request.open('POST', requestURL, true);
    request.setRequestHeader('content-type', 'application/x-www-form-urlenconded;charset=UTF-8');
    //console.log('uploadInfo(): date: ');
    //console.log(getValues().calender);
    var sendJSON = getValuesJSON();
    request.send(sendJSON);
}
