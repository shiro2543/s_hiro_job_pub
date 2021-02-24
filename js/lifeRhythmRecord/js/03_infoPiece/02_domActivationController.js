//domのlistenerのactive/deactiveを一括コントロールする
function DOMActivationController() {
    var controller = {
        deactivateListenerFuncList: [],
        initListenerFuncList: [],
        deactivateAllListener: function () {
            for (var i = 0; i < this.deactivateListenerFuncList.length; i++) {
                this.deactivateListenerFuncList[i]();
            }
        },
        append: function (func) {
            this.deactivateListenerFuncList.push(func);
        },
        appendInit: function (func) {
            this.initListenerFuncList.push(func);
        },
        initAllListener: function () {
            this.deactivateAllListener();
            for (var i = 0; i < this.initListenerFuncList.length; i++) {
                this.initListenerFuncList[i]();
            }
        }
    };
    return controller;
}
