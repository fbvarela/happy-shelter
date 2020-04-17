var actualLang;
var resourceLoadLang;
var resourceLang;

function changeLanguage(lang){
  if(actualLang && actualLang===lang)return;
  resourceLoadLang = eval("LANGS_LOAD_"+lang);
  resourceLang = eval("LANGS_"+lang);
  document.title = getTextLang('document').title;
  _.each(resourceLoadLang, function(obj,id){    
    var attr = Object.getOwnPropertyNames(obj)[0];
    var translation = obj[Object.getOwnPropertyNames(obj)[0]];
    var objJQ;
    if(obj.array){
      objJQ = $(obj.array+' #'+id);
      _.each(objJQ, function(objJQQ){
        if(attr==='text'){
          $(objJQQ).text(translation);
        }else{
          $(objJQQ).attr(attr,translation);
        }
      })     
    }else{
      objJQ = $('#'+id);
      if(attr==='text'){
        objJQ.text(translation);
      }else{
        objJQ.attr(attr,translation);
      }
    }
    
  });
  actualLang=lang
}

function getTextLang(id){
  var textFind = resourceLang[id]
  if(undefined===textFind){
    console.log("Text id: "+id+" not found");
    return {text:id}
  }
  return textFind;
}