const DEFAULT_SIDES = 4;
var canvas          = [];
var sides           = [];
var newNumberName   = 1;
var activeTab       = 0;
var idArea          = 0;


function addNew(){
  canvas.push(new fabric.Canvas('c_'+canvas.length, { selection: false}));
  sides.push(DEFAULT_SIDES);
  idArea++;
  newNumberName++;
}

function deleteLast(){
  canvas.pop();
  sides.pop();
  idArea--;
  newNumberName--;
}

function newIdAnimal(){
  return idAnimal++;
}
function getIdAnimal(){
  return idAnimal;
}

function setActiveTab(id){
  activeTab=id
}

function getActiveTab(){
  return activeTab;
}

function getNewIdArea(){
  return idArea;
}

function getLastIdArea(){
  return idArea-1;
}

function getActiveTabName(){
  return $("a[href$='tab_"+getActiveTab()+"']").text().trim();
}

function getSelectorTabActive(selector){
  return $('#tab_'+activeTab+" "+selector);
}

function getTab(id){
  return  $("a[href$='tab_"+id+"']");
}

function getTabClick(id){
  getTab(id).click();
}

function getTabName(id){
  return  getTab(id).text();
}

function getNewNumberName(){
  return newNumberName;
}

function getCanvas(idCanvas){
  return canvas[idCanvas];
}

function getSides(idSide){
  return sides[idSide];
}

function subtractOneSide(idSide){
  sides[idSide]=sides[idSide]-1;
}

function addOneSide(idSide){
  sides[idSide]=sides[idSide]+1;
}