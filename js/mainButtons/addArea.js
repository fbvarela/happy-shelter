var buttonAddArea       = $("#addArea");
var areaPanel           = $("#areaPanel");
var areaPanelTab        = $("#areaPanelTab");
var areaPanelTabContent = $("#areaPanelTabContent");

buttonAddArea.click(function() {
  var id = getNewIdArea();
  var nombreArea = getAreaNameByPrompt(getTextLang('area').text.concat(" ").concat(getNewNumberName()));
  if(!nombreArea)return
  areaPanel.show();
  var li = document.createElement('li');
  var a = document.createElement('a');
  var div = document.createElement('div'); 
  var span = document.createElement('span');  
  span.textContent = " "+nombreArea;
  span.setAttribute("id","titleArea");
  a.setAttribute("href", "#tab_"+id); 
  a.setAttribute("id", "link_"+id); 
  a.setAttribute("role", "tab");
  a.setAttribute("data-toggle", "tab");
  a.append(createSpanElementTap(id));
  a.append(span);      
  li.append(a);
  li.setAttribute("onclick", "areaTabClick("+id+")");
  areaPanelTab.append(li);
  areaPanelTabContent.attr("style", "margin-top:10px");
  div.setAttribute("id", "tab_"+id);
  div.setAttribute("class", "tab-pane");
  areaPanelTabContent.append(div);
  div.innerHTML +=$('#hiddenRow').html();
  $('#tab_'+id).find('canvas').attr('id','c_'+id);  
  addNew();
  getTabClick(id);
  generateArea(id); 
});    

function getAreaNameByPrompt(defaultName){
  var nombreArea = prompt(getTextLang('nameOfTheArea').text, defaultName);
  if(nombreArea==null){
    return false;
  }
  if(nombreArea.length==0){
    nombreArea=getTextLang('area').text.concat(" ").concat(getNewNumberName());
  }
  return nombreArea;
} 

function createSpanElementTap(id){
  var span = document.createElement('span');
  span.setAttribute("class", "glyphicon glyphicon-pencil");
  span.setAttribute("title", "Editar nombre del área");
  span.setAttribute("id", id);
  span.setAttribute("onclick", "editTittleTap(this)");
  return span;
}

function editTittleTap(a) {
  var id = getActiveTab();
  if(a.id!=id){
    return
  }
  var actualAreaName = getTabName(id);
  var areaName = getAreaNameByPrompt(actualAreaName);
  if(!areaName)return 
  $('#link_'+id+' #titleArea').text(" "+areaName);
}

function areaTabClick(id){
  canvas[getActiveTab()].discardActiveObject();
  canvas[getActiveTab()].requestRenderAll(); 
  setActiveTab(id);
}