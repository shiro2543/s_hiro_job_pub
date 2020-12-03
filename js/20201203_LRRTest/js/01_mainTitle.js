function MainTitle(dom, title_name, height) {
    dom.mainTitle = {
        data: {
            width: document.body.clientWidth,
            height: height,
            titleName: title_name,
        },
        childDOMs: {
            title: document.createElement('h1'),
        },
        styleObj: {
            main: {
                position: 'absolute',
                left: 0,
                top: 0,
                backgroundColor: 'green',
                color: 'white',
                textAlign: 'center',
                width: document.body.clientWidth + 'px',
                height: height + 'px',
                margin: 0,
                padding: 0,
            },
            title: {
                width: document.body.clientWidth + 'px',
                height: height + 'px',
                textAlign: 'center',
                margin: 0,
                padding: 0,
                display: 'block',
            }
        }
    }
    styleObjApply(dom, dom.mainTitle.styleObj.main);

    dom.appendChild(dom.mainTitle.childDOMs.title);
    dom.mainTitle.childDOMs.title.textContent = dom.mainTitle.data.titleName;
    styleObjApply(dom.mainTitle.childDOMs.title, dom.mainTitle.styleObj.title);
    //console.log('.mainTitle: width: ' + dom.style.width);
    //console.log('.mainTitle: height: ' + dom.style.height);
    //console.log('.mainTitle: fontSize: ' + dom.style.fontSize);
    var fs = getFontSizeApply2Area(dom.mainTitle.childDOMs.title, true);
    //console.log('.mainTitle: fontSize: ' + fs);
    dom.mainTitle.childDOMs.title.style.fontSize = fs + 'px';
    return dom;
}
