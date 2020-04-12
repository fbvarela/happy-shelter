var buttonDeleteArea    = $("#deleteArea");
var areaPanel           = $("#areaPanel");
var simulatorSavePanel  = $("#simulatorSavePanel");
var areaPanelTab        = $("#areaPanelTab");
var areaPanelTabContent = $("#areaPanelTabContent");

buttonDeleteArea.click(function() {
  var newId = getNewId();
  if(newId==0){
    return
  }
  if(areaPanelTab.children().last().hasClass('active') && newId>0){
    getTabClick(newId-2)
  }
  areaPanelTabContent.children().last().remove();     
  areaPanelTab.children().last().remove();     
  deleteLast();
  if(getNewId()===0){
    areaPanel.hide();
    simulatorSavePanel.hide();
  }
});