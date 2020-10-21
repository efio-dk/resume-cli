module.exports = {
    getIndex: getIndex,
    isLastIndex: isLastIndex,
    isFirstIndex: isFirstIndex,
    seperateArrayByComma: seperateArrayByComma,
    returnYearOrYears: returnYearOrYears,
    returnFirstName: returnFirstName,
    abbreviateMiddleNames: abbreviateMiddleNames
}


function getIndex(tag, scope, context) {
    const indexes = context.scopePathItem;
    return indexes[indexes.length - 1];
}

function isLastIndex(tag, scope, context) {
    const totalLength = context.scopePathLength[context.scopePathLength.length - 1];
    const index = context.scopePathItem[context.scopePathItem.length - 1];
    return index === totalLength - 1;
}

function isFirstIndex(tag, scope, context) {
    const index = context.scopePathItem[context.scopePathItem.length - 1];
    return index === 0;
}

function seperateArrayByComma(tag, scope, context) {
    const totalLength = context.scopePathLength[context.scopePathLength.length - 1];
    const index = context.scopePathItem[context.scopePathItem.length - 1];
    if(index !== totalLength - 1) {
        return ",";
    }
    else {
        return "";
    }
}

function returnYearOrYears(tag, scope, context) {
    if(typeof scope === "number" || typeof scope === "string"){
        if(scope === 1 || scope === "1"){
            return "year"
        }
        else {
            return "years";
        }
    }
    else if(typeof scope === "object"){
        var value = scope[Object.keys(scope)[context.num]]
        if(value === 1 || value === "1") {
            return "year"
        }
        else {
            return "years"
        }
    }
}

function returnFirstName(tag, scope, context) {
    tag = tag.replace("$firstName ", "");
    var name = scope[tag].trim();
    return name.split(" ")[0];
}

function abbreviateMiddleNames(tag, scope, context) {
    tag = tag.replace("$abbreviateMiddleNames ", "");
    var name = scope[tag].trim();
    var splits = name.split(" ");
    if(splits.length < 3) { return "Name is not long enough to abbreviate" }

    var newName = "";
    for(var i = 0; i < splits.length; i++) {
        var value = splits[i];
        if(i === 0 || i === splits.length - 1){
            newName = newName + value + " ";
        }
        else {
            newName = newName + value[0].toUpperCase() + ". ";
        }
    }

    return newName;
}
