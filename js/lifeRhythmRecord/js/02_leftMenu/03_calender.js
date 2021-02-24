//クリックで日付遷移できるカレンダーを表示
function Calender(dom, left, top, initWidth, initHeight) {
    dom.calender = {
        styleObj: {
            main: {
                position: 'relative',
                left: left + 'px',
                top: top + 'px',
                width: initWidth + 'px',
                height: initHeight + 'px',
                margin: 0,
                padding: 0,
                position: 'relative',
                backgroundColor: 'lightgreen',
            },
            calenderAllow: {
                color: 'white',
                backgroundColor: 'lightgreen',
                position: 'absolute',
                textAlign: 'center',
                border: 'none',
                margin: 0,
                padding: 0,
            },
            calenderTitle: {
                color: 'white',
                backgroundColor: 'lightgreen',
                position: 'absolute',
                textAlign: 'center',
                maring: 0,
                padding: 0,
            },
            calenderDate: {
                color: 'white',
                backgroundColor: 'lightgreen',
                position: 'absolute',
                textAlign: 'center',
                border: 'none',
                margin: 0,
                padding: 0,
            },
            calenderDateToday: {
                color: 'white',
                backgroundColor: 'pink',
                position: 'absolute',
                textAlign: 'center',
                border: 'none',
                margin: 0,
                padding: 0,
            },
            calenderDateSelected: {
                color: 'white',
                backgroundColor: 'lightgreen',
                position: 'absolute',
                textAlign: 'center',
                border: '1px solid green',
                margin: 0,
                padding: 0,
            },
            calenderDateBlackOut: {
                color: 'white',
                backgroundColor: 'gray',
                position: 'absolute',
                textAlign: 'center',
                opacity: 0.5,
                margin: 0,
                padding: 0,
            }
        },
        data: {
            status: {
                loading: false,
            },
            width: initWidth,
            height: initHeight,
            trout_size: {
                width: initWidth / 7,
                height: initHeight / 8
            },
            arrayBasicDaysOfMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],    //各月の日数
            daysFebruaryLeapYear: 29,   //うるう年の2月の日数
            //曜日を表す文字
            listDayOfWeekStr: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            listDayOfWeekStrAbbreviated: {
                Sunday: 'Sun',
                Monday: 'Mon',
                Tuesday: 'Tue',
                Wednesday: 'Wed',
                Thursday: 'Thu',
                Friday: 'Fri',
                Saturday: 'Sat'
            },
            listDayOfWeekStrJPN: {
                Sunday: '日',
                Monday: '月',
                Tuesday: '火',
                Wednesday: '水',
                Thursday: '木',
                Friday: '金',
                Saturday: '土'
            },
            today: {
                year: null,
                monht: null,
                date: null,
            },
            //現在の描画位置を保存する
            draw_point: {
                x: 0,
                y: 0,
                day: null
            },
            //現在表示中の年月
            selectedDate: {
                year: null,
                month: null,
                date: null,
            },
        },
        //うるう年かどうか確認する
        checkLeapYear: function (year) {
            if (year % 400 === 0) {
                return true;
            } else if (year % 100 === 0) {
                return false;
            } else if (year % 4 === 0) {
                return true;
            } else {
                return false;
            }
        },
        childDOMs: {
            titleArrow: {
                left: null,
                right: null,
            },
            titleMonth: null,
            titleDaysOfWeek: {},
            //カレンダーの各日のdomを保管しておく
            dayDOMList: {},
        },
        backMonth: function () {
            dom.calender.data.selectedDate.date = null;
            if (dom.calender.data.selectedDate.month - 1 === 0) {
                dom.calender.data.selectedDate.year -= 1;
                dom.calender.data.selectedDate.month = 12;
                dom.calender.review();
            } else {
                dom.calender.data.selectedDate.month -= 1;
                dom.calender.review(dom.calender.data.selectedDate.year, dom.calender.data.selectedDate.month - 1);
            }
        },
        forwardMonth: function () {
            dom.calender.data.selectedDate.date = null;
            if (dom.calender.data.selectedDate.month + 1 === 13) {
                dom.calender.data.selectedDate.year += 1;
                dom.calender.data.selectedDate.month = 1;
                dom.calender.review();
            } else {
                dom.calender.data.selectedDate.month += 1;
                dom.calender.review();
            }
        },
    }

    //与えられた月の日数を返す
    dom.calender.daysOfMonth = function (target_year, target_month) {
        if (target_month === 2 && dom.calender.checkLeapYear(target_year)) {
            return dom.calender.data.daysFebruaryLeapYear;
        } else {
            return dom.calender.data.arrayBasicDaysOfMonth[target_month - 1];
        }
    }

    dom.calender.getDate = function () {
        return dom.calender.data.selectedDate;
    }

    dom.calender.setDate = function(calender) {
        dom.calender.data.selectedDate.year = calender.year;
        dom.calender.data.selectedDate.month = calender.month;
        dom.calender.data.selectedDate.date = calender.date;
        dom.calender.review();
    }

    dom.calender.resetDate = function(date) {
        dom.calender.setDate(date);
    }

    dom.calender.resize = function (width, height) {
        dom.calender.data.width = width;
        dom.calender.data.height = height;
        dom.calender.removeTitle();
        dom.calender.viewTitle();
        dom.calender.review();
    }

    dom.calender.viewTitle = function () {
        //タイトル(<)を描画
        dom.calender.childDOMs.titleArrow.left = document.createElement('button');
        dom.appendChild(dom.calender.childDOMs.titleArrow.left);
        dom.calender.childDOMs.titleArrow.left.textContent = '<';
        styleObjApply(dom.calender.childDOMs.titleArrow.left, dom.calender.styleObj.calenderAllow);
        dom.calender.childDOMs.titleArrow.left.style.width = dom.calender.data.trout_size.width + 'px';
        dom.calender.childDOMs.titleArrow.left.style.height = dom.calender.data.trout_size.height + 'px';
        dom.calender.childDOMs.titleArrow.left.style.left = dom.calender.data.draw_point.x + 'px';
        dom.calender.childDOMs.titleArrow.left.style.top = dom.calender.data.draw_point.y + 'px';
        applyString2Area(dom.calender.childDOMs.titleArrow.left);
        dom.calender.data.draw_point.x += dom.calender.data.trout_size.width;

        //タイトル(月数)を描画(月数は後述のreview()で初期化)
        dom.calender.childDOMs.titleMonth = document.createElement('span');
        dom.appendChild(dom.calender.childDOMs.titleMonth);
        dom.calender.childDOMs.titleMonth.textContent = 'yyyy/mm';  //仮の値
        styleObjApply(dom.calender.childDOMs.titleMonth, dom.calender.styleObj.calenderTitle);
        dom.calender.childDOMs.titleMonth.style.width = dom.calender.data.trout_size.width * 5 + 'px';
        dom.calender.childDOMs.titleMonth.style.height = dom.calender.data.trout_size.height + 'px';
        dom.calender.childDOMs.titleMonth.style.left = dom.calender.data.draw_point.x + 'px';
        dom.calender.childDOMs.titleMonth.style.top = dom.calender.data.draw_point.y + 'px';
        applyString2Area(dom.calender.childDOMs.titleMonth);
        dom.calender.data.draw_point.x += dom.calender.data.trout_size.width * 5;

        //タイトル(>)を描画
        dom.calender.childDOMs.titleArrow.right = document.createElement('button');
        dom.appendChild(dom.calender.childDOMs.titleArrow.right);
        dom.calender.childDOMs.titleArrow.right.textContent = '>';
        styleObjApply(dom.calender.childDOMs.titleArrow.right, dom.calender.styleObj.calenderAllow);
        dom.calender.childDOMs.titleArrow.right.style.width = dom.calender.data.trout_size.width + 'px';
        dom.calender.childDOMs.titleArrow.right.style.height = dom.calender.data.trout_size.height + 'px';
        dom.calender.childDOMs.titleArrow.right.style.left = dom.calender.data.draw_point.x + 'px';
        dom.calender.childDOMs.titleArrow.right.style.top = dom.calender.data.draw_point.y + 'px';
        applyString2Area(dom.calender.childDOMs.titleArrow.right);
        dom.calender.data.draw_point.x = 0;
        dom.calender.data.draw_point.y += dom.calender.data.trout_size.height;

        //曜日名を描画
        for (let i = 0; i < 7; i++) {
            let cursol_days_of_week = document.createElement('span');
            dom.appendChild(cursol_days_of_week);
            cursol_days_of_week.textContent = dom.calender.data.listDayOfWeekStrJPN[dom.calender.data.listDayOfWeekStr[i]];
            styleObjApply(cursol_days_of_week, dom.calender.styleObj.calenderDate);
            cursol_days_of_week.style.width = dom.calender.data.trout_size.width + 'px';
            cursol_days_of_week.style.height = dom.calender.data.trout_size.height + 'px';
            cursol_days_of_week.style.left = dom.calender.data.draw_point.x + 'px';
            cursol_days_of_week.style.top = dom.calender.data.draw_point.y + 'px';
            applyString2Area(cursol_days_of_week);
            dom.calender.data.draw_point.x += dom.calender.data.trout_size.width;
            dom.calender.childDOMs.titleDaysOfWeek[dom.calender.data.listDayOfWeekStr[i]] = cursol_days_of_week;
        }
        dom.calender.data.draw_point.x = 0;
        dom.calender.data.draw_point.y += dom.calender.data.trout_size.height;
    }

    dom.calender.removeTitle = function () {
        dom.removeChild(dom.calender.childDOMs.titleArrow.left);
        dom.removeChild(dom.calender.childDOMs.titleArrow.right);
        dom.removeChild(dom.calender.childDOMs.titleMonth);
        delete (dom.calender.childDOMs.titleArrow.left);
        delete (dom.calender.childDOMs.titleArrow.right);
        delete (dom.calender.childDOMs.titleMonth);
        dom.calender.childDOMs.titleArrow.left = null;
        dom.calender.childDOMs.titleArrow.right = null;
        dom.calender.childDOMs.titleMonth = null;
        Object.keys(dom.calender.childDOMs.titleDaysOfWeek).forEach(function (key) {
            dom.removeChild(dom.calender.childDOMs.titleDaysOfWeek[key]);
            delete (dom.calender.childDOMs.titleDaysOfWeek[key]);
            dom.calender.childDOMs.titleDaysOfWeek[key] = null;
        })
    }

    //カレンダーを再描画する
    dom.calender.review = function () {
        dom.calender.styleObj.main.width = dom.calender.data.width + 'px';
        dom.calender.styleObj.main.height = dom.calender.data.height + 'px';
        styleObjApply(dom, dom.calender.styleObj.main);

        dom.calender.data.trout_size.width = dom.calender.data.width / 7;
        dom.calender.data.trout_size.height = dom.calender.data.height / 8;

        //描画されている古い各日のdomを削除
        Object.keys(dom.calender.childDOMs.dayDOMList).forEach(function (key) {
            dom.removeChild(dom.calender.childDOMs.dayDOMList[key]);
            delete (dom.calender.childDOMs.dayDOMList[key]);
        })
        dom.calender.childDOMs.dayDOMList = {};  //domリスト初期化

        //月数をタイトルに指定
        dom.calender.childDOMs.titleMonth.textContent = dom.calender.data.selectedDate.year + '年' + dom.calender.data.selectedDate.month + '月';
        applyString2Area(dom.calender.childDOMs.titleMonth);

        //月頭の曜日
        let first_date = new Date(dom.calender.data.selectedDate.year, dom.calender.data.selectedDate.month - 1);
        let first_day_of_week = first_date.getDay();

        //描画位置の初期化
        dom.calender.data.draw_point.x = 0;
        dom.calender.data.draw_point.y = dom.calender.data.trout_size.height * 2;
        dom.calender.data.draw_point.day = 0;

        //先月分をブラックアウトして表示
        for (let i = 0; i < first_day_of_week; i++) {
            let cursol = document.createElement('span');
            dom.appendChild(cursol);
            cursol.textContent = '-';
            styleObjApply(cursol, dom.calender.styleObj.calenderDateBlackOut);
            cursol.style.width = dom.calender.data.trout_size.width + 'px';
            cursol.style.height = dom.calender.data.trout_size.height + 'px';
            cursol.style.left = dom.calender.data.draw_point.x + 'px';
            cursol.style.top = dom.calender.data.draw_point.y + 'px';
            applyString2Area(cursol);
            if (dom.calender.data.draw_point.day === 6) {
                dom.calender.data.draw_point.x = 0;
                dom.calender.data.draw_point.y += dom.calender.data.trout_size.height;
            } else {
                dom.calender.data.draw_point.x += dom.calender.data.trout_size.width;
            }
            dom.calender.childDOMs.dayDOMList[i - first_day_of_week] = cursol;
            dom.calender.data.draw_point.day++;
            dom.calender.data.draw_point.day %= 7;
        }

        //各日描写
        let day_cursol = 1;
        while (day_cursol <= dom.calender.daysOfMonth(dom.calender.data.selectedDate.year, dom.calender.data.selectedDate.month)) {
            let cursol = document.createElement('button');
            dom.appendChild(cursol);   //appendchild
            cursol.textContent = day_cursol;
            styleObjApply(cursol, dom.calender.styleObj.calenderDate);
            cursol.style.width = dom.calender.data.trout_size.width + 'px';
            cursol.style.height = dom.calender.data.trout_size.height + 'px';
            cursol.style.left = dom.calender.data.draw_point.x + 'px';
            cursol.style.top = dom.calender.data.draw_point.y + 'px';
            applyString2Area(cursol);
            if (dom.calender.data.selectedDate.year === dom.calender.data.today.year && dom.calender.data.selectedDate.month === (dom.calender.data.today.month) && day_cursol === dom.calender.data.today.date) {
                styleObjApply(cursol, dom.calender.styleObj.calenderDateToday);
            } else if (day_cursol === dom.calender.data.selectedDate.date) {
                styleObjApply(cursol, dom.calender.styleObj.calenderDateSelected);
            }
            if (dom.calender.data.draw_point.day === 6) {
                dom.calender.data.draw_point.x = 0;
                dom.calender.data.draw_point.y += dom.calender.data.trout_size.height;
            } else {
                dom.calender.data.draw_point.x += dom.calender.data.trout_size.width;
            }

            //クリックしたらclickEventFuncを実行
            cursol.addEventListener('click', function () {
                //変更前の日付のinfoをupload
                uploadInfo();   //index.html
                if (dom.calender.data.selectedDate.date !== null) {
                    if (dom.calender.data.selectedDate.year === dom.calender.data.today.year && dom.calender.data.selectedDate.month === (dom.calender.data.today.month) && dom.calender.data.selectedDate.date === dom.calender.data.today.date) {
                        styleObjApply(dom.calender.childDOMs.dayDOMList[dom.calender.data.selectedDate.date], dom.calender.styleObj.calenderDateToday);
                    } else {
                        styleObjApply(dom.calender.childDOMs.dayDOMList[dom.calender.data.selectedDate.date], dom.calender.styleObj.calenderDate);
                    }
                }
                dom.calender.data.selectedDate.date = Number(cursol.textContent);
                if (dom.calender.data.selectedDate.year === dom.calender.data.today.year && dom.calender.data.selectedDate.month === (dom.calender.data.today.month) && dom.calender.data.selectedDate.date === dom.calender.data.today.date) {
                    styleObjApply(cursol, dom.calender.styleObj.calenderDateToday);
                } else if (dom.calender.data.selectedDate.date === dom.calender.data.selectedDate.date) {
                    styleObjApply(cursol, dom.calender.styleObj.calenderDateSelected);
                }
                downloadInfo(dom.calender.data.selectedDate);
            });
            dom.calender.childDOMs.dayDOMList[day_cursol] = cursol;  //cursolをdomに保存
            day_cursol++;
            dom.calender.data.draw_point.day++;
            if (dom.calender.data.draw_point.day === 7) {
                dom.calender.data.draw_point.day = 0;
            }
        }
        //翌月分をブラックアウトして表示
        var day_of_next_month = 7 - dom.calender.data.draw_point.day;
        for (let i = 0; i < day_of_next_month; i++) {
            let cursol = document.createElement('span');
            dom.appendChild(cursol);
            cursol.textContent = '-';
            styleObjApply(cursol, dom.calender.styleObj.calenderDateBlackOut);
            cursol.style.width = dom.calender.data.trout_size.width + 'px';
            cursol.style.height = dom.calender.data.trout_size.height + 'px';
            cursol.style.left = dom.calender.data.draw_point.x + 'px';
            cursol.style.top = dom.calender.data.draw_point.y + 'px';
            applyString2Area(cursol);
            if (dom.calender.data.draw_point.day === 6) {
                dom.calender.data.draw_point.x = 0;
                dom.calender.data.draw_point.y += dom.calender.data.trout_size.height;
            } else {
                dom.calender.data.draw_point.x += dom.calender.data.trout_size.width;
            }
            dom.calender.childDOMs.dayDOMList['next' + i] = cursol;
            dom.calender.data.draw_point.day++;
            dom.calender.data.draw_point.day %= 7;
        }
        dom.calender.data.draw_point.x = 0;
        dom.calender.data.draw_point.y = 0;
        dom.calender.data.draw_point.day = 0;
    }

    //一気に日付を移動する
    dom.calender.moveDate = function(date) {
        //古い日付の情報をリセット・アップロード
        uploadInfo();
        if (dom.calender.data.selectedDate.date !== null) {
            if (dom.calender.data.selectedDate.year === dom.calender.data.today.year && dom.calender.data.selectedDate.month === (dom.calender.data.today.month) && dom.calender.data.selectedDate.date === dom.calender.data.today.date) {
                styleObjApply(dom.calender.childDOMs.dayDOMList[dom.calender.data.selectedDate.date], dom.calender.styleObj.calenderDateToday);
            } else {
                styleObjApply(dom.calender.childDOMs.dayDOMList[dom.calender.data.selectedDate.date], dom.calender.styleObj.calenderDate);
            }
        }

        //日付指定
        dom.calender.data.selectedDate.year = date.year;
        dom.calender.data.selectedDate.month = date.month;
        dom.calender.data.selectedDate.date = date.date;
        dom.calender.review();

        //日付移動
        var temp_cursol = dom.calender.childDOMs.dayDOMList[date.date];
        if (dom.calender.data.selectedDate.year === dom.calender.data.today.year && dom.calender.data.selectedDate.month === (dom.calender.data.today.month) && dom.calender.data.selectedDate.date === dom.calender.data.today.date) {
            styleObjApply(temp_cursol, dom.calender.styleObj.calenderDateToday);
        } else if (dom.calender.data.selectedDate.date === dom.calender.data.selectedDate.date) {
            styleObjApply(temp_cursol, dom.calender.styleObj.calenderDateSelected);
        }

        //新日付で情報をダウンロード
        downloadInfo(dom.calender.data.selectedDate);
    }

    //初期化
    var today = new Date();
    dom.calender.data.today = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
    }
    dom.calender.data.selectedDate = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
    }
    dom.calender.viewTitle();
    //先月へ移動するリスナをセット
    dom.calender.childDOMs.titleArrow.left.addEventListener('click', dom.calender.backMonth);
    //来月に移動するリスナをセット
    dom.calender.childDOMs.titleArrow.right.addEventListener('click', dom.calender.forwardMonth);
    dom.calender.review(dom.calender.data.today.year, dom.calender.data.today.month);
    dom.calender.data.selectedDate.date = dom.calender.data.today.date;
    return dom;
}

