const formAddAnimal = 'formFile';
const formAddAnimalJQ = '#'.concat(formAddAnimal);
const formChangeKennel = 'formChangeChennil';
const formChangeKennelJQ = '#'.concat(formChangeKennel);

function showInfo(idKennel){
  var kennelInfo = getKennelById(idKennel)
  var infoFile = getSelectorTabActive('#info #infoFiles');
  var infoChenilId = getSelectorTabActive('#chenilId');
  infoFile.empty();
  infoChenilId.text(idKennel);
  setValInputForm(formAddAnimal,'idKennel',idKennel);
  setValInputForm(formAddAnimal,'species',kennelInfo.species);
  _.forEach(getAnimalsByIdKennel(idKennel), function (obj) {
    infoFile.append(createSpanInfo(obj));
    infoFile.append("<br/>");
  });
  getSelectorTabActive('#info').show();
}

function showModal(){
  $(formAddAnimalJQ).trigger("reset");
  $('#modalFile').modal('show');  
}

function addRecord(){
  showModal();
  $('#dpPickUpDate').datetimepicker();
  updateRadios(formAddAnimal);
}

function editInfo(id){
  showModal();
  updateForm(formAddAnimal, getAnimalById(id));
}

function saveFile(){
  let infoFile = getSelectorTabActive('#info #infoFiles');
  let animal = getObjsForm(formAddAnimal);
  if(animal.id){
    updaetAnimal(animal);
    infoFile.find('[id='+animal.id+']').html(createSpanInfo(animal));
  }else{
    animal.id = getIdAnimal();
    addAnimal(animal);
    newIdAnimal();   
    infoFile.append(createSpanInfo(animal));
    infoFile.append("<br/>");  
  }
  $('#modalFile').modal('hide');
};

function createSpanInfo(animal){
  var span = document.createElement('span');
  var span2 = document.createElement('span');
  var span3 = document.createElement('span');
  span2.setAttribute("id", "recordOf");
  span2.append(document.createTextNode(getTextLang('recordOf').text));
  span3.append(animal.name.toUpperCase());
  span.setAttribute("id", animal.id);
  span.append(createSpanEditInfo(animal,'glyphicon-pencil', 'editInfo',getTextLang('edifInfoIcon').title,'edifInfoIcon'));
  span.append(createSpanEditInfo(animal,'glyphicon-home', 'changeChenil',getTextLang('changeKennelIcon').title, 'changeKennelIcon'));
  span.append(span2);
  span.append(span3);
  return span;
}

function createSpanEditInfo(animal, icon, functionClick, title, id){
  var span = document.createElement('span');
  span.setAttribute("id", id);
  span.setAttribute("class", "glyphicon "+icon);
  span.setAttribute("title",title);
  span.setAttribute("onclick", functionClick+"("+animal.id+")");
  return span;
}

function changeChenil(id){
  let animal=getAnimalById(id);
  $('#modalChageChenil').modal('show');
  $(formChangeKennelJQ+" input[name='idAnimal']").val(id);
  $(formChangeKennelJQ+" #species").text(getTextLang(animal.species).text);
  $(formChangeKennelJQ+" #name").text(animal.name);
  $(formChangeKennelJQ+" #actualChenil").text(animal.idKennel);
  var availableKennels = getAvailableKennelsWithAnimalsForOneAnimal(animal.idKennel,animal.species);
  $(formChangeKennelJQ+" #chenilDisponibles").empty();
  if(availableKennels.length===0){
    $(formChangeKennelJQ+" #chenilDisponibles").append(getTextLang('errorNotHaveKennelsAvailable').text);
  }else{
    $(formChangeKennelJQ+" #chenilDisponibles").append(getTextLang('kennelsAvailable').text);
    _.each(availableKennels,function(availableKennel){     
      $(formChangeKennelJQ+" #chenilDisponibles").append(
        getTextLang('area').text.concat(": ")
        .concat(getTabName(availableKennel.areaId))
      );
      $(formChangeKennelJQ+" #chenilDisponibles").append("<br>");
      $(formChangeKennelJQ+" #chenilDisponibles").append(getTextLang('idKennel').text+
      availableKennel.id+'&nbsp;&nbsp;&nbsp;<input type="radio" name="newChenil"'+ 
      'onclick="enanbleBtn(true)" id="newChenil" value='+availableKennel.id+'><br>');
      $(formChangeKennelJQ+" #chenilDisponibles").append(
        getTextLang('actualNumberOf').text
        .concat(getTextLang(animal.species).text)
        .concat(": ")
        .concat(availableKennel.totalAnimals)
      );
      $(formChangeKennelJQ+" #chenilDisponibles").append("<br><br>");
    });
  }
  enanbleBtn(false);
}

function enanbleBtn(enable){
  $("#modalChageChenil #saveChangeChenilBtn").attr("disabled", !enable);
}

function saveChangeChenil(){
  let animal = getAnimalById(getValInputForm(formChangeKennel, 'idAnimal'));
  animal.idKennel=getObjsForm(formChangeKennel)['newChenil']
  updaetAnimal(animal);
  $('#modalChageChenil').modal('hide');
  canvas[getActiveTab()].discardActiveObject();
  canvas[getActiveTab()].requestRenderAll(); 
}