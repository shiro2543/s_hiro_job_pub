function ClickMenu(dom, left, top, width, height) {
    dom.menu = {
        data: {
            menuList: [],
            initStyleObj: {
                position: 'relative',
                left: left + 'px',
                top: top + 'px',
                width: width + 'px',
                height: height + 'px',
                border: '3px solid green',
                color: 'green',
            },
            menu_index: 0
        },
        addMenu: function(menuName, menuFunc) {
            var tmp_dom = document.createElement('div');
            dom.appendChild(tmp_dom);
            tmp_dom.menu = {
                data: {
                    index: dom.menu.data.menu_index,
                    fontSize: dom.menu.data.initStyleObj.width / menuName.length
                },
                execFunc: menuFunc
            }
            dom.menu.data.menu_index++;
            tmp_dom.style.color = 'green';
            tmp_dom.style.fontSize = tmp_dom.menu.data.fontSize;
            tmp_dom.innerHTML = menuName;
            tmp_dom.addEventListener('click', tmp_dom.menu.execFunc);

            dom.menu.data.menuList.push(tmp_dom);
        },
    }
    styleObjApply(dom, dom.menu.data.initStyleObj);
    return dom;
}
