var simulatorSavePanel     = $("#simulatorSavePanel");
var simulatorSavePanelBody = $("#simulatorSavePanelBody");
var buttonSave             = $("#save");
var areaPanel              = $("#areaPanel");

function filterItemsCanvas (canva,idToFilter){
  return _.filter(canva.getObjects('image'),function(obj){
    return obj.itemType === idToFilter;
  });
}

function appendTitle (title, num){
  var string = "<b>".concat(title);
  var end = ":</b><br>";
  if(num!=undefined){
    string = string.concat(" (").concat(num).concat(")").concat(end);
  }else{
    string= string.concat(end);
  }
  simulatorSavePanelBody.append(string);  
}

function appendInfoItem (obj, paramsToAppend){
  _.each(paramsToAppend, function (param) {
    var string;
    var moreParams = param.split(',');
    if(moreParams.length>1){
      string = param.concat(": ").concat(JSON.stringify(obj[moreParams[0]][moreParams[1]])).concat("<br>");
    }else{
      string = param.concat(": ").concat(JSON.stringify(obj[param])).concat("<br>");
    }
    simulatorSavePanelBody.append(string);
  });
  simulatorSavePanelBody.append("<br>");
}

function appendItems(item, arrayData, params){
  appendTitle(getTextLang(item.id).text, arrayData.length);
  _.each(arrayData, function (obj) {
    appendInfoItem(obj, params);
  });
}

buttonSave.click(function() {
  if(areaPanel.is(":hidden")){
    return;
  }
  simulatorSavePanel.show();
  simulatorSavePanelBody.empty();
  var infoKennel = ['type','left','top','width','height','scaleX','scaleY','itemType','id'];
  var infoObject = ['type','left','top','width','height','scaleX','scaleY','itemType'];
  var infoCircle = ['left','top',"line1,x1","line1,y1","line1,x2","line1,y2","line2,x1","line2,y1","line2,x2","line2,y2"];
  var infoLine   = ['x1','y1','x2','y2','scaleX','scaleY'];
  _.each(canvas, function (canva,i) { 
    var KENNEL_DOG = filterItemsCanvas(canva, ITEM.KENNEL_DOG.id);
    var KENNEL_CAT = filterItemsCanvas(canva, ITEM.KENNEL_CAT.id);
    var OFFICE     = filterItemsCanvas(canva, ITEM.OFFICE.id);
    var TREE       = filterItemsCanvas(canva, ITEM.TREE.id);
    var FAUCET     = filterItemsCanvas(canva, ITEM.FAUCET.id);
    var ENTRY      = filterItemsCanvas(canva, ITEM.ENTRY.id);
    var titleArea  = getTabName(i);
    appendTitle('------------------ Init ------------------', titleArea);
    appendItems({id:getTextLang('linesOfArea').text},canva.getObjects('line'),infoLine);
    appendItems({id:getTextLang('circlesOfArea').text},canva.getObjects('circle'),infoCircle);
    appendItems(ITEM.KENNEL_DOG,KENNEL_DOG,infoKennel);
    appendItems(ITEM.KENNEL_CAT,KENNEL_CAT,infoKennel);  
    appendItems(ITEM.OFFICE,OFFICE,infoObject);
    appendItems(ITEM.TREE,TREE,infoObject);  
    appendItems(ITEM.FAUCET,FAUCET,infoObject);  
    appendItems(ITEM.ENTRY,ENTRY,infoObject);
    appendTitle('------------------ End ------------------', titleArea);
  });   

  appendTitle(getTextLang('animals').text, animals.length);
  _.each(animals, function (animal){
    simulatorSavePanelBody.append(JSON.stringify(animal)+"<br>")
  })

  appendTitle(getTextLang('kennels').text, kennels.length);
  _.each(kennels, function (kennel){
    simulatorSavePanelBody.append(JSON.stringify(kennel)+"<br>")
  })
});