function InfoPieceTitle(infoPieceTitle, initWidth, initHeight) {
    infoPieceTitle.infoPieceTitle = {
        data: {
            width: initWidth,
            height: initHeight,
            year: null,
            month: null,
            date: null,
        },
        styleObj: {
            main: {
                position: 'absolute',
                width: timeRulerWidth + rhythmGraphWidth + 'px',
                height: infoPieceTitleHeight + 'px',
                left: leftMenuWidth + 'px',
                top: titleHeight + 'px',
                backgroundColor: 'lightgreen',
                color: 'white',
                textAlign: 'center',
            }
        },
    }
    infoPieceTitle.infoPieceTitle.setValues = function (calender) {
        infoPieceTitle.infoPieceTitle.data.year = calender.year;
        infoPieceTitle.infoPieceTitle.data.month = calender.month;
        infoPieceTitle.infoPieceTitle.data.date = calender.date;
        infoPieceTitle.infoPieceTitle.redraw();
    }
    infoPieceTitle.infoPieceTitle.redraw = function () {
        infoPieceTitle.textContent = infoPieceTitle.infoPieceTitle.data.year + '/' + infoPieceTitle.infoPieceTitle.data.month + '/' + infoPieceTitle.infoPieceTitle.data.date;
        styleObjApply(infoPieceTitle, infoPieceTitle.infoPieceTitle.styleObj.main);
        applyString2Area(infoPieceTitle);
    }
    infoPieceTitle.infoPieceTitle.redraw();
    return infoPieceTitle;
}
