var buttonDeleteArea    = $("#deleteArea");
var areaPanel           = $("#areaPanel");
var simulatorSavePanel  = $("#simulatorSavePanel");
var areaPanelTab        = $("#areaPanelTab");
var areaPanelTabContent = $("#areaPanelTabContent");

buttonDeleteArea.click(function() {
  var newIdArea = getNewIdArea();
  if(newIdArea==0){
    return
  }
  if(hasAnimalsInArea(getLastIdArea())){
    alert("No se puede eliminar un área que tiene animales");
    return
  }
  if(areaPanelTab.children().last().hasClass('active') && newIdArea>0){
    getTabClick(newIdArea-2)
  }
  areaPanelTabContent.children().last().remove();     
  areaPanelTab.children().last().remove();  
  deleleKennelsByAreaId(getLastIdArea());   
  deleteLast();
  if(getNewIdArea()===0){
    areaPanel.hide();
    simulatorSavePanel.hide();
  }
});