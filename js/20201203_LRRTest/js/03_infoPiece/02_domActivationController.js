//domのlistenerのactive/deactiveを一括コントロールする
function DOMActivationController() {
    var controller = {
        deactivateListenerFuncList: [],
        initListenerFuncList: [],
        deactivateAllListener: function () {
            //console.log('dacontroller.deactivateAllListener(): called');
            for (var i = 0; i < this.deactivateListenerFuncList.length; i++) {
                this.deactivateListenerFuncList[i]();
            }
        },
        append: function (func) {
            //console.log('DOMACtivationController.append(): called.')
            this.deactivateListenerFuncList.push(func);
            //console.log('dacontroller.append(): func: ' + func);
        },
        appendInit: function (func) {
            this.initListenerFuncList.push(func);
        },
        initAllListener: function () {
            //console.log('dacontroller.initAllListener(): called.');
            this.deactivateAllListener();
            for (var i = 0; i < this.initListenerFuncList.length; i++) {
                //console.log('dacontroller.initAllListener(): ' + this.initListenerFuncList[i]);
                this.initListenerFuncList[i]();
            }
        }
    };
    return controller;
}
