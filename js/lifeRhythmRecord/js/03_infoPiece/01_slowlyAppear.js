//opacityを操作してカーソル合わせるとゆっくり現れるようにする効果をdomに付与
//mouseoverとmouseoutを使うので注意
function SlowlyAppear(dom) {
    dom.slowlyAppear = {
        data: {
            opacity_control: {
                mouseover_interval_id: null,
                mouseout_interval_id: null,
                max_opacity: 0.8,
                opacity_increase_per_draw: 0.01,
                draw_interval: 1, //ミリ秒
                current_opacity: Number(dom.style.opacity),
                max_count: this.max_opacity / this.opacity_increase_per_draw
            }
        },
        //opacityがmaxであるかどうかを返す関数
        isOpacityMax: function () {
            return (this.data.opacity_control.current_opacity === this.data.opacity_control.max_opacity);
        },
        mouseoverFunc: function () {
            dom.removeEventListener('mouseover', dom.slowlyAppear.mouseoverFunc);
            if (dom.slowlyAppear.data.opacity_control.mouseout_interval_id !== null) {
                clearInterval(dom.slowlyAppear.data.opacity_control.mouseout_interval_id);
                dom.slowlyAppear.data.opacity_control.mouseout_interval_id = null;
            }
            var count = 0;
            dom.slowlyAppear.data.opacity_control.mouseover_interval_id = setInterval(function () {
                count++;
                dom.slowlyAppear.data.opacity_control.current_opacity = count * dom.slowlyAppear.data.opacity_control.opacity_increase_per_draw;
                dom.style.opacity = dom.slowlyAppear.data.opacity_control.current_opacity;
                if (count >= dom.slowlyAppear.data.opacity_control.max_count) {
                    clearInterval(dom.slowlyAppear.data.opacity_control.mouseover_interval_id);
                    dom.slowlyAppear.data.opacity_control.mouseover_interval_id = null;
                }
            }, dom.slowlyAppear.data.opacity_control.draw_interval);
            dom.addEventListener('mouseout', dom.slowlyAppear.mouseoutFunc);
        },
        mouseoutFunc: function () {
            dom.removeEventListener('mouseout', dom.slowlyAppear.mouseoutFunc);
            if (dom.slowlyAppear.data.opacity_control.mouseover_interval_id !== null) {
                clearInterval(dom.slowlyAppear.data.opacity_control.mouseover_interval_id);
                dom.slowlyAppear.data.opacity_control.mouseover_interval_id = null;
            }
            var decrease_max_count = dom.slowlyAppear.data.opacity_control.current_opacity / dom.slowlyAppear.data.opacity_control.opacity_increase_per_draw;
            var count = 0;
            var opacity_at_start_decrease = dom.slowlyAppear.data.opacity_control.current_opacity;
            dom.slowlyAppear.data.opacity_control.mouseout_interval_id = setInterval(function () {
                count++;
                dom.slowlyAppear.data.opacity_control.current_opacity = opacity_at_start_decrease - (count * dom.slowlyAppear.data.opacity_control.opacity_increase_per_draw);
                dom.style.opacity = dom.slowlyAppear.data.opacity_control.current_opacity;
                if (dom.slowlyAppear.data.opacity_control.current_opacity <= 0) {
                    clearInterval(dom.slowlyAppear.data.opacity_control.mouseout_interval_id);
                    dom.slowlyAppear.data.opacity_control.mouseout_interval_id = null;
                }
            }, dom.slowlyAppear.data.opacity_control.draw_interval);
            dom.addEventListener('mouseover', dom.slowlyAppear.mouseoverFunc);
        },
        deactivate_listener: function () {
            dom.removeEventListener('mouseover', dom.mouseoverFunc);
            dom.removeEventListener('mouseout', dom.mouseoutFunc);
        },
        activate_listener: function () {
            dom.addEventListener('mouseover', dom.mouseoverFunc);
        }
    }
    //リスナの初期化
    dom.addEventListener('mouseover', dom.slowlyAppear.mouseoverFunc);
    dacontroller.append(dom.slowlyAppear.deactivate_listener);
    dacontroller.appendInit(dom.slowlyAppear.activate_listener);
    return dom;
}
