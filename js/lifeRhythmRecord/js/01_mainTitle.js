//ページ上のタイトルを描画
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

    dom.mainTitle.redraw = function() {
        dom.mainTitle.styleObj.main.width = dom.mainTitle.data.width + 'px';
        dom.mainTitle.styleObj.main.height = dom.mainTitle.data.height + 'px';
        styleObjApply(dom, dom.mainTitle.styleObj.main);
        dom.mainTitle.styleObj.title.width = dom.mainTitle.data.width + 'px';
        dom.mainTitle.styleObj.title.height = dom.mainTitle.data.height + 'px';
        styleObjApply(dom.mainTitle.childDOMs.title, dom.mainTitle.styleObj.title);
        var fs = getFontSizeApply2Area(dom.mainTitle.childDOMs.title, true);
        dom.mainTitle.childDOMs.title.style.fontSize = fs + 'px';
    }

    dom.mainTitle.resize = function(width, height) {
        dom.mainTitle.data.width = width;
        dom.mainTitle.data.height = height;
        dom.mainTitle.redraw();
    }

    dom.appendChild(dom.mainTitle.childDOMs.title);
    dom.mainTitle.childDOMs.title.textContent = dom.mainTitle.data.titleName;
    dom.mainTitle.redraw();
    return dom;
}