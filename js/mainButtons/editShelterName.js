$('#editShelter').click(function() {
  var defaultName = $('#shelterName').text();
  var shelterName = prompt("¿Nombre del Refugio?",defaultName);
  if(shelterName==null || shelterName.length==0){
    return false;
  }
  $('#shelterName').text(shelterName);
});