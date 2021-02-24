//画面右隅の各情報入力メニュー
function RightMenu(rightMenu, initWidth, initHeight, menuTitleHeight) {
    rightMenu = new ExpandMenu(rightMenu, initWidth, initHeight, menuTitleHeight, 'scroll');
    rightMenu.expandMenu.append('睡眠', document.createElement('div'));
    rightMenu.expandMenu.append('気分(AM)', document.createElement('div'));
    rightMenu.expandMenu.append('気分(PM)', document.createElement('div'));
    rightMenu.expandMenu.append('朝食', document.createElement('div'));
    rightMenu.expandMenu.append('昼食', document.createElement('div'));
    rightMenu.expandMenu.append('夕食', document.createElement('div'));
    rightMenu.expandMenu.append('服薬', document.createElement('div'));
    rightMenu.expandMenu.append('コメント', document.createElement('div'));
    rightMenu.rightMenu = {
        data: {
            heightRatePerWidth: {
                sleepTime: 0.1,
                feelingAM: 0.15,
                feelingPM: 0.15,
                breakfast: 1,
                lunch: 1,
                dinner: 1,
                medicine: 0.08,
                comment: 0.2
            }
        },
        styleObj: {
            tab: {
                position: 'relative',
            }
        }
    }

    rightMenu.rightMenu.getValues = function() {
        return {
            sleepTime: rightMenu.expandMenu.getContent('睡眠').inputSleepTimeArea.getValues(),
            feelingAM: rightMenu.expandMenu.getContent('気分(AM)').selectFeelingArea.getValues(),
            feelingPM: rightMenu.expandMenu.getContent('気分(PM)').selectFeelingArea.getValues(),
            breakfast: rightMenu.expandMenu.getContent('朝食').inputMealArea.getValues(),
            lunch: rightMenu.expandMenu.getContent('昼食').inputMealArea.getValues(),
            dinner: rightMenu.expandMenu.getContent('夕食').inputMealArea.getValues(),
            medicine: rightMenu.expandMenu.getContent('服薬').inputMedicine.getValues(),
            comment: rightMenu.expandMenu.getContent('コメント').inputCommentArea.getValues(),
        }
    }
    rightMenu.rightMenu.setValues = function(values) {
        rightMenu.expandMenu.getContent('睡眠').inputSleepTimeArea.setValues(values.sleepTime);
        rightMenu.expandMenu.getContent('気分(AM)').selectFeelingArea.setValues(values.feelingAM);
        rightMenu.expandMenu.getContent('気分(PM)').selectFeelingArea.setValues(values.feelingPM);
        rightMenu.expandMenu.getContent('朝食').inputMealArea.setValues(values.breakfast);
        rightMenu.expandMenu.getContent('昼食').inputMealArea.setValues(values.lunch);
        rightMenu.expandMenu.getContent('夕食').inputMealArea.setValues(values.dinner);
        rightMenu.expandMenu.getContent('服薬').inputMedicine.setValues(values.medicine);
        rightMenu.expandMenu.getContent('コメント').inputCommentArea.setValues(values.comment);
    }

    rightMenu.rightMenu.resetValues = function() {
        var values = {
            sleepTime: '',
            feelingAM: null,
            feelingPM: null,
            breakfast: {
                point: {
                    mainDish: '',
                    subDish: '',
                    stapleFood: '',
                    milk: '',
                    fruits: ''
                },
                detail: ''
            },
            lunch: {
                point: {
                    mainDish: '',
                    subDish: '',
                    stapleFood: '',
                    milk: '',
                    fruits: ''
                },
                detail: ''
            },
            dinner: {
                point: {
                    mainDish: '',
                    subDish: '',
                    stapleFood: '',
                    milk: '',
                    fruits: ''
                },
                detail: ''
            },
            medicine: {
                value: null,
                comment: '',
            },
            comment: '',
        }
        rightMenu.rightMenu.setValues(values);
    }

    Object.keys(rightMenu.expandMenu.childDOMs.etabs).forEach(function (key) {
        styleObjApply(rightMenu.expandMenu.childDOMs.etabs[key].etab.childDOMs.content, rightMenu.rightMenu.styleObj.tab);
    })

    new InputSleepTimeArea(rightMenu.expandMenu.getContent('睡眠'), rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.sleepTime);
    new SelectFeelingArea(rightMenu.expandMenu.getContent('気分(AM)'), rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.feelingAM, 6, weatherList, '気分(AM)');
    new SelectFeelingArea(rightMenu.expandMenu.childDOMs.etabs['気分(PM)'].etab.childDOMs.content, rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.feelingPM, 6, weatherList, '気分(PM)');
    new InputMealArea(rightMenu.expandMenu.childDOMs.etabs['朝食'].etab.childDOMs.content, rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.breakfast);
    new InputMealArea(rightMenu.expandMenu.childDOMs.etabs['昼食'].etab.childDOMs.content, rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.lunch);
    new InputMealArea(rightMenu.expandMenu.childDOMs.etabs['夕食'].etab.childDOMs.content, rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.dinner);
    new InputMedicine(rightMenu.expandMenu.getContent('服薬'), rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.medicine);
    new InputCommentArea(rightMenu.expandMenu.childDOMs.etabs['コメント'].etab.childDOMs.content, rightMenu.expandMenu.data.innerWidth, rightMenu.expandMenu.data.innerWidth * rightMenu.rightMenu.data.heightRatePerWidth.comment, 'コメント');
    rightMenu.expandMenu.closeAllMenu();
}
