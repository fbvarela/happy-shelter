const DEFAULT_SIDES = 4;
var canvas          = [];
var sides           = [];
var newId           = 0;
var newNumberName   = 1;
var activeTab       = 0;

function addNew(){
  canvas.push(new fabric.Canvas('c_'+canvas.length, { selection: false}));
  sides.push(DEFAULT_SIDES);
  newId++;
  newNumberName++;
}

function deleteLast(){
  canvas.pop();
  sides.pop();
  newId--;
  newNumberName--;
}

function setActiveTab(id){
  activeTab=id
}

function getActiveTab(){
  return activeTab;
}

function getNewId(){
  return newId;
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