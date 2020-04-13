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

function addAnimalForm(){
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
};

function createSpanInfo(animal){
  var title =" Ficha de ".concat(animal.name);
  var span = document.createElement('span');
  span.setAttribute("id", animal.id);
  span.append(createSpanEditInfo(animal,'glyphicon-pencil', 'editInfo','Editar ficha'));
  span.append(createSpanEditInfo(animal,'glyphicon-home', 'changeChenil','Cambiar chenil'));
  span.append(document.createTextNode(title));
  return span;
}

function createSpanEditInfo(animal, icon, functionClick, titleInit){
  var title =titleInit.concat(" de ").concat(animal.name);
  var span = document.createElement('span');
  span.setAttribute("class", "glyphicon "+icon);
  span.setAttribute("title",title);
  span.setAttribute("onclick", functionClick+"("+animal.id+")");
  return span;
}

function changeChenil(id){
  let animal=getAnimalById(id);
  $('#modalChageChenil').modal('show');
  $(formChangeKennelJQ+" input[name='idAnimal']").val(id);
  $(formChangeKennelJQ+" #species").text(animal.species);
  $(formChangeKennelJQ+" #name").text(animal.name);
  $(formChangeKennelJQ+" #actualChenil").text(animal.idKennel);
  var availableKennels = getAvailableKennelsWithAnimalsForOneAnimal(animal.idKennel,animal.species);
  $(formChangeKennelJQ+" #chenilDisponibles").empty();
  if(availableKennels.length===0){
    $(formChangeKennelJQ+" #chenilDisponibles").append("<b style='color:red'>¡¡No tienes cheniles disponibles!!</b>");
  }else{
    $(formChangeKennelJQ+" #chenilDisponibles").append("<b>Cheniles disponibles:</b></br>");
    _.each(availableKennels,function(availableKennel){     
      $(formChangeKennelJQ+" #chenilDisponibles").append("Área: "+getTabName(availableKennel.areaId));
      $(formChangeKennelJQ+" #chenilDisponibles").append("<br>");
      $(formChangeKennelJQ+" #chenilDisponibles").append("Chenil id: "+
      availableKennel.id+'&nbsp;&nbsp;&nbsp;<input type="radio" name="newChenil"'+ 
      'onclick="enanbleBtn(true)" id="newChenil" value='+availableKennel.id+'>');
      $(formChangeKennelJQ+" #chenilDisponibles").append("<br>");
      $(formChangeKennelJQ+" #chenilDisponibles").append("Número actual de "+animal.species+": "+availableKennel.totalAnimals);
      $(formChangeKennelJQ+" #chenilDisponibles").append("<br>");
      $(formChangeKennelJQ+" #chenilDisponibles").append("<br>");
    });
  }
  enanbleBtn(false)
  
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