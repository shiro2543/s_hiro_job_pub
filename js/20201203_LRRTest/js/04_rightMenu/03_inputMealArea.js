function InputMealPoint(dom, width, height, key, imgFilePath) {
    dom.inputMealPoint = {
        data: {
            width: width,
            height: height,
            value: 0,
            key: key,
            imgFilePath: imgFilePath,
            layoutRate: {
                width: {
                    title: 1,
                    img: 5,
                    inputArea: 1
                },
            },
            layoutRateTotal: {
                width: null,
            }
        },
        childDOMs: {
            title: document.createElement('div'),
            img: document.createElement('img'),
            inputArea: document.createElement('div'),
        },
        styleObj: {
            main: {
                position: 'relative',
                backgroundColor: 'lightgreen',
                color: 'white',
                width: null,
                height: null,
                margin: 0,
                padding: 0,
            },
            title: {
                position: 'absolute',
                width: null,
                height: height + 'px',
                left: 0,
                top: 0,
                backgroundColor: 'lightgreen',
                color: 'white',
                margin: 0,
                padding: 0,
            },
            img: {
                position: 'absolute',
                width: null,
                height: height + 'px',
                left: null,
                top: 0,
                margin: 0,
                padding: 0,
            },
            inputArea: {
                position: 'absolute',
                left: null,
                top: null,
                backgroundColor: 'white',
                margin: 0,
                padding: 0,
            }
        }
    }

    dom.inputMealPoint.getValues = function() {
        return dom.inputMealPoint.childDOMs.inputArea.ntgg.childDOMs.text.value;
    }
    dom.inputMealPoint.setValues = function(value) {
        dom.inputMealPoint.childDOMs.inputArea.ntgg.setText(value);
    }

    dom.inputMealPoint.redraw = function () {
        dom.inputMealPoint.styleObj.main.width = dom.inputMealPoint.data.width + 'px';
        dom.inputMealPoint.styleObj.main.height = dom.inputMealPoint.data.height + 'px';
        styleObjApply(dom, dom.inputMealPoint.styleObj.main);
        var titleWidth = dom.inputMealPoint.data.width * dom.inputMealPoint.data.layoutRate.width.title / dom.inputMealPoint.data.layoutRateTotal.width;
        var imgWidth = dom.inputMealPoint.data.width * dom.inputMealPoint.data.layoutRate.width.img / dom.inputMealPoint.data.layoutRateTotal.width;
        var inputAreaWidth = dom.inputMealPoint.data.width * dom.inputMealPoint.data.layoutRate.width.inputArea / dom.inputMealPoint.data.layoutRateTotal.width;
        dom.inputMealPoint.styleObj.title.width = titleWidth + 'px';
        dom.inputMealPoint.styleObj.img.width = imgWidth + 'px';
        dom.inputMealPoint.styleObj.img.left = titleWidth + 'px';
        dom.inputMealPoint.styleObj.inputArea.left = (titleWidth + imgWidth) + 'px';
        dom.inputMealPoint.styleObj.inputArea.top = dom.inputMealPoint.data.height / 4 + 'px';
        styleObjApply(dom.inputMealPoint.childDOMs.title, dom.inputMealPoint.styleObj.title);
        applyString2Area(dom.inputMealPoint.childDOMs.title);
        styleObjApply(dom.inputMealPoint.childDOMs.img, dom.inputMealPoint.styleObj.img);
        dom.inputMealPoint.childDOMs.inputArea.ntgg.resize(inputAreaWidth, dom.inputMealPoint.data.height / 2);
        styleObjApply(dom.inputMealPoint.childDOMs.inputArea, dom.inputMealPoint.styleObj.inputArea);
    }

    //初期化
    dom.appendChild(dom.inputMealPoint.childDOMs.title);
    dom.appendChild(dom.inputMealPoint.childDOMs.img);
    dom.appendChild(dom.inputMealPoint.childDOMs.inputArea);

    dom.inputMealPoint.data.layoutRateTotal.width = 0;
    Object.keys(dom.inputMealPoint.data.layoutRate.width).forEach(function (key) {
        dom.inputMealPoint.data.layoutRateTotal.width += dom.inputMealPoint.data.layoutRate.width[key];
    })

    dom.inputMealPoint.childDOMs.title.textContent = dom.inputMealPoint.data.key;
    dom.inputMealPoint.childDOMs.img.setAttribute('src', dom.inputMealPoint.data.imgFilePath);
    var initInputAreaWidth = dom.inputMealPoint.data.width * dom.inputMealPoint.data.layoutRate.width.inputArea / dom.inputMealPoint.data.layoutRateTotal.width;
    new NoTextGrayGuide(dom.inputMealPoint.childDOMs.inputArea, 'ポイントを入力', initInputAreaWidth, dom.inputMealPoint.data.height, true);
    dom.inputMealPoint.redraw();
    return dom;
}

function InputMealDetail(dom, width, height, title) {
    dom.inputMealDetail = {
        data: {
            width: width,
            height: height,
            title: title,
            layoutRate: {
                title: 1,
                inputArea: 6,
            },
            layoutRateTotal: null,
        },
        styleObj: {
            main: {
                position: 'relative',
                width: width,
                height: height,
                backgroundColor: 'lightgreen',
                color: 'white',
                margin: 0,
                padding: 0,
            },
            title: {
                position: 'absolute',
                width: null,
                height: height + 'px',
                left: 0 + 'px',
                top: 0 + 'px',
                margin: 0,
                padding: 0,
            },
            inputArea: {
                position: 'absolute',
                left: null,
                top: 0 + 'px',
                backgroundColor: 'white',
                border: 'none',
                margin: 0,
                padding: 0,
            }
        },
        childDOMs: {
            title: document.createElement('div'),
            inputArea: document.createElement('div'),
        }
    }


    dom.inputMealDetail.data.layoutRateTotal = 0;
    Object.keys(dom.inputMealDetail.data.layoutRate).forEach(function (key) {
        dom.inputMealDetail.data.layoutRateTotal += dom.inputMealDetail.data.layoutRate[key];
    })

    dom.inputMealDetail.getValues = function() {
        return dom.inputMealDetail.childDOMs.inputArea.ntagg.childDOMs.text.value;
    }
    dom.inputMealDetail.setValues = function(value) {
        //console.log('.inputMealDetail.setValues(): ' + value);
        dom.inputMealDetail.childDOMs.inputArea.ntagg.setText(value);
    }

    dom.inputMealDetail.redraw = function () {
        dom.inputMealDetail.styleObj.main.width = dom.inputMealDetail.data.width + 'px';
        dom.inputMealDetail.styleObj.main.height = dom.inputMealDetail.data.height + 'px';
        styleObjApply(dom, dom.inputMealDetail.styleObj.main);
        dom.inputMealDetail.styleObj.title.width = dom.inputMealDetail.data.width * dom.inputMealDetail.data.layoutRate.title / dom.inputMealDetail.data.layoutRateTotal + 'px';
        dom.inputMealDetail.styleObj.title.height = dom.inputMealDetail.data.height + 'px';
        styleObjApply(dom.inputMealDetail.childDOMs.title, dom.inputMealDetail.styleObj.title);
        applyString2Area(dom.inputMealDetail.childDOMs.title);
        dom.inputMealDetail.styleObj.inputArea.left = dom.inputMealDetail.data.width * dom.inputMealDetail.data.layoutRate.title / dom.inputMealDetail.data.layoutRateTotal + 'px';
        styleObjApply(dom.inputMealDetail.childDOMs.inputArea, dom.inputMealDetail.styleObj.inputArea);
        var inputAreaWidth = dom.inputMealDetail.data.width * dom.inputMealDetail.data.layoutRate.inputArea / dom.inputMealDetail.data.layoutRateTotal;
        dom.inputMealDetail.childDOMs.inputArea.ntagg.resize(inputAreaWidth, dom.inputMealDetail.data.height);
    }

    dom.appendChild(dom.inputMealDetail.childDOMs.title);
    dom.appendChild(dom.inputMealDetail.childDOMs.inputArea);

    dom.inputMealDetail.childDOMs.title.textContent = dom.inputMealDetail.data.title;

    var ntaggWidth = dom.inputMealDetail.data.width * dom.inputMealDetail.data.layoutRate.inputArea / dom.inputMealDetail.data.layoutRateTotal;
    new NoTextAreaGrayGuide(dom.inputMealDetail.childDOMs.inputArea, title + 'を入力', ntaggWidth, dom.inputMealDetail.data.height);
    dom.inputMealDetail.redraw();
    return dom;
}

function InputMealArea(dom, width, height) {
    dom.inputMealArea = {
        data: {
            mealCategoryAndFilePathList: {
                mainDish: {
                    title: '主菜',
                    filePath: './img/main_dish.png',
                },
                subDish: {
                    title: '副菜',
                    filePath: './img/sub_dish.png',
                },
                stapleFood: {
                    title: '主食',
                    filePath: './img/staple_food.png'
                },
                milk: {
                    title: '乳製品',
                    filePath: './img/milk.png',
                },
                fruits: {
                    title: '果物',
                    filePath: './img/fruits.png',
                }
            },
            width: width,
            height: height,
            layoutRate: {
                height: {
                    mainDish: 2,
                    subDish: 2,
                    stapleFood: 2,
                    milk: 1,
                    fruits: 1,
                    detail: 3,
                }
            },
            layoutRateTotal: {
                height: null,
            }
        },
        childDOMs: {
            inputMealPoint: {
                mainDish: document.createElement('div'),
                subDish: document.createElement('div'),
                stapleFood: document.createElement('div'),
                milk: document.createElement('div'),
                fruits: document.createElement('div'),
            },
            inputMealDetail: document.createElement('div'),
        },
        styleObj: {
            main: {
                width: width + 'px',
                height: height + 'px',
            }
        }
    }

    dom.inputMealArea.getValues = function() {
        return {
            point: {
                mainDish: dom.inputMealArea.childDOMs.inputMealPoint.mainDish.inputMealPoint.getValues(),
                subDish: dom.inputMealArea.childDOMs.inputMealPoint.subDish.inputMealPoint.getValues(),
                stapleFood: dom.inputMealArea.childDOMs.inputMealPoint.stapleFood.inputMealPoint.getValues(),
                milk: dom.inputMealArea.childDOMs.inputMealPoint.milk.inputMealPoint.getValues(),
                fruits: dom.inputMealArea.childDOMs.inputMealPoint.fruits.inputMealPoint.getValues(),
            },
            detail: dom.inputMealArea.childDOMs.inputMealDetail.inputMealDetail.getValues(),
        }
    }
    dom.inputMealArea.setValues = function(values) {
        dom.inputMealArea.childDOMs.inputMealPoint.mainDish.inputMealPoint.setValues(values.point.mainDish);
        dom.inputMealArea.childDOMs.inputMealPoint.subDish.inputMealPoint.setValues(values.point.subDish);
        dom.inputMealArea.childDOMs.inputMealPoint.stapleFood.inputMealPoint.setValues(values.point.stapleFood);
        dom.inputMealArea.childDOMs.inputMealPoint.milk.inputMealPoint.setValues(values.point.milk);
        dom.inputMealArea.childDOMs.inputMealPoint.fruits.inputMealPoint.setValues(values.point.fruits);
        dom.inputMealArea.childDOMs.inputMealDetail.inputMealDetail.setValues(values.detail);
    }

    //初期化
    dom.inputMealArea.data.layoutRateTotal.height = 0;
    Object.keys(dom.inputMealArea.data.layoutRate.height).forEach(function(key) {
        dom.inputMealArea.data.layoutRateTotal.height += dom.inputMealArea.data.layoutRate.height[key];
    })

    Object.keys(dom.inputMealArea.data.mealCategoryAndFilePathList).forEach(function (category) {
        var impTitle = dom.inputMealArea.data.mealCategoryAndFilePathList[category].title;
        var impFilePath = dom.inputMealArea.data.mealCategoryAndFilePathList[category].filePath;
        var impHeight = dom.inputMealArea.data.height * dom.inputMealArea.data.layoutRate.height[category] / dom.inputMealArea.data.layoutRateTotal.height;
        dom.appendChild(dom.inputMealArea.childDOMs.inputMealPoint[category]);
        new InputMealPoint(dom.inputMealArea.childDOMs.inputMealPoint[category], dom.inputMealArea.data.width, impHeight, impTitle, impFilePath);
    })
    dom.appendChild(dom.inputMealArea.childDOMs.inputMealDetail);
    new InputMealDetail(dom.inputMealArea.childDOMs.inputMealDetail, dom.inputMealArea.data.width, dom.inputMealArea.data.height * dom.inputMealArea.data.layoutRate.height['detail'] / dom.inputMealArea.data.layoutRateTotal.height, '詳細');

    dom.inputMealArea.redraw = function() {
        dom.inputMealArea.styleObj.main.width = dom.inputMealArea.data.width + 'px';
        dom.inputMealArea.styleObj.main.height = dom.inputMealArea.data.height + 'px';
        styleObjApply(dom, dom.inputMealArea.styleObj.main);
    }
    dom.inputMealArea.redraw();

    return dom;
}
