var data = require('./data.json');

var newDataArray = JSON.parse(JSON.stringify(data));
var maxLevel = 0;



console.log(JSON.stringify(createNonFlatArray()));
// console.log(JSON.stringify(createFlatArray()));


/**
 * 
 * If you want a non flat array with group and index as an additional field as displayed in the screenshot then just call this function
 */
function createNonFlatArray() {
    return processItems(newDataArray, 0)
}

/**
 * 
 * If you want a flat array with group and index as an additional field as displayed in the screenshot then just call this function
 */
function createFlatArray() {

    var flatArrayItems = [];

    processItems(newDataArray, 0, (pItem) => {
        var pMItem = {...pItem};
        delete pMItem.items;
        flatArrayItems.push(pMItem);
    });

    return flatArrayItems;
}

function processItems(proItems, proLevel, additionalWorkOnItem){
    proItems.forEach((pData, pIndex) => {

        pData.group = proLevel
        pData.index = pIndex;

        additionalWorkOnItem && additionalWorkOnItem(pData);

        if(pData.items) {
            processItems(pData.items, proLevel+1, additionalWorkOnItem);
        }
    });

    return proItems;
}