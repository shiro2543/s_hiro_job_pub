//クリックで下に開くメニューの1項目
function ExpandTab(dom, titleName, expandContentDOM, width, titleHeight ,color) {
    dom.etab = {
        data: {
            title: titleName,
            contentDisplayMode: expandContentDOM.style.display,
            status: null, //active: click enable, deactive: click unenable
            triangle_size: null,
            triangle_margin: null,
            width: width,
            titleHeight: titleHeight,
        },
        childDOMs: {
            title: null,
            content: null,
            triangle: null,
        },
        styleObj: {
            whole: {
                position: 'relative',
                //left: left,
                //top: top,
                width: width + 'px',
                //height: height + 'px',
                color: color,
                //boxShadow: '0 0 1px 1px gray',
                backgroundColor: 'lightgreen',
            },
            title: {
                position: 'relative',
                backgroundColor: 'lightgreen',
                width: null,
                height: titleHeight + 'px'
            },
        },
        display: function () {
            dom.etab.childDOMs.content.style.display = dom.etab.data.contentDisplayMode;
        },
        hide: function () {
            dom.etab.childDOMs.content.style.display = 'none';
        }
    }
    //初期化
    dom.etab.childDOMs.title = document.createElement('div');
    dom.appendChild(dom.etab.childDOMs.title);
    dom.etab.childDOMs.title.textContent = dom.etab.data.title;
    dom.etab.childDOMs.content = expandContentDOM;
    dom.appendChild(dom.etab.childDOMs.content);
    
    //draw
    dom.etab.data.triangle_size = titleHeight * 0.8;
    dom.etab.data.triangle_margin = titleHeight * 0.1;
    
    dom.etab.childDOMs.triangle = new TriangleArrow(document.createElement('div'), dom.etab.data.triangle_size, dom.etab.data.triangle_size, dom.etab.styleObj.whole.color);
    dom.etab.childDOMs.triangle.triangle.redraw('right');
    dom.etab.childDOMs.title.appendChild(dom.etab.childDOMs.triangle);
    dom.etab.childDOMs.triangle.triangle.moveCoordinate(px2num(dom.etab.styleObj.whole.width) - dom.etab.data.triangle_size, dom.etab.data.triangle_margin);

    dom.etab.styleObj.title.width = (dom.etab.data.width - dom.etab.data.triangle_size) + 'px';

    styleObjApply(dom, dom.etab.styleObj.whole);
    styleObjApply(dom.etab.childDOMs.title, dom.etab.styleObj.title);
    applyString2Area(dom.etab.childDOMs.title);

    dom.etab.clickEventCloseFunc = function() {
        dom.etab.childDOMs.title.removeEventListener('click', dom.etab.clickEventCloseFunc);
        dom.etab.data.status = 'close';
        dom.etab.hide();
        dom.etab.childDOMs.triangle.triangle.redraw('right');
        dom.etab.childDOMs.title.addEventListener('click', dom.etab.clickEventOpenFunc);
    }
    dom.etab.clickEventOpenFunc = function() {
        dom.etab.childDOMs.title.removeEventListener('click', dom.etab.clickEventOpenFunc);
        dom.etab.data.status = 'open';
        dom.etab.display();
        dom.etab.childDOMs.triangle.triangle.redraw('bottom');
        dom.etab.childDOMs.title.addEventListener('click', dom.etab.clickEventCloseFunc);
    }

    //リスナ初期化
    dom.etab.clickEventOpenFunc();
    return dom;
}

//expandtabを複数持つメニュー
function ExpandMenu(dom, width, height, titleHeight, overflowStyle) {
    dom.expandMenu = {
        data: {
            appendNumber: 0,
            width: width,
            height: height,
            scrollBarWidth: null,
            innerWidth: null,
        },
        childDOMs: {
            etabs: {}
        },
        styleObj: {
            width: width + 'px',
            height: height + 'px',
            //border: '1px solid black',
            overflowX: 'hidden',
            overflowY: overflowStyle,
            //borderRight: '1px solid lightgray',
            margin: 0,
            padding: 0,
        },
        getContent: function(menuTitle) {
            return dom.expandMenu.childDOMs.etabs[menuTitle].etab.childDOMs.content;
        }
    }
    dom.expandMenu.append = function(menu_title, menu_element_dom) {
        var tmp_etab = document.createElement('div');
        dom.appendChild(tmp_etab);
        tmp_etab.appendChild(menu_element_dom);
        new ExpandTab(tmp_etab, menu_title, menu_element_dom, dom.expandMenu.data.innerWidth, titleHeight, 'green')
        dom.expandMenu.childDOMs.etabs[menu_title] = tmp_etab;
    }
    dom.expandMenu.closeMenu = function(menuTitle) {
        dom.expandMenu.childDOMs.etabs[menuTitle].etab.clickEventCloseFunc();
    }
    dom.expandMenu.openMenu = function(menuTitle) {
        dom.expandMenu.childDOMs.etabs[menuTitle].etab.clickEventOpenFunc();
    }
    dom.expandMenu.closeAllMenu = function() {
        Object.keys(dom.expandMenu.childDOMs.etabs).forEach(function(key) {
            dom.expandMenu.childDOMs.etabs[key].etab.clickEventCloseFunc();
        })
    }

    styleObjApply(dom, dom.expandMenu.styleObj);

    dom.expandMenu.data.scrollBarWidth = dom.offsetWidth - dom.clientWidth;
    dom.expandMenu.data.innerWidth = dom.expandMenu.data.width - dom.expandMenu.data.scrollBarWidth;

    return dom;
}
