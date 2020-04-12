function showInfo(info){
  var infoFile = getSelectorTabActive('#info #infoFiles');
  infoFile.empty();
  info.files.forEach(function (obj) {
    infoFile.append(createSpanInfo(obj));
    infoFile.append("<br/>");
  });
  getSelectorTabActive('#info').show();
}

function addFile(){
  $('#formFile').trigger("reset");
  $('#modalFile').modal('show');
}

function saveFile(){
  let infoFile = getSelectorTabActive('#info #infoFiles');
  let id = $("#formFile input[name='id']").val();
  let file = {};
  if(id){
    $("form#formFile :input").each(function(){
      let input = $(this);
      file[input.attr('name')]=input.val();
      getCanvas(getActiveTab()).getActiveObject().info.files[id]=file;
    });
    infoFile.find('[id='+id+']').html(createSpanInfo(file));
  }else{
    $("form#formFile :input").each(function(){
      let input = $(this);
      file[input.attr('name')]=input.val();
    });
    file['id'] =getCanvas(getActiveTab()).getActiveObject().info.files.length;
    getCanvas(getActiveTab()).getActiveObject().info.files.push(file)   
    infoFile.append(createSpanInfo(file));
    infoFile.append("<br/>");  
  }
};

function createSpanInfo(file){
  var title =" Ficha de ".concat(file.name);
  var span = document.createElement('span');
  span.setAttribute("id", file.id);
  span.append(createSpanEditInfo(file));
  span.append(document.createTextNode(title));
  return span;
}

function createSpanEditInfo(file){
  var title ="Editar ficha de ".concat(file.name);
  var span = document.createElement('span');
  span.setAttribute("class", "glyphicon glyphicon-pencil");
  span.setAttribute("title",title);
  span.setAttribute("onclick", "editInfo("+file.id+")");
  return span;
}

function editInfo(id){
  $('#formFile').trigger("reset");
  $('#modalFile').modal('show');
  let file = getCanvas(getActiveTab()).getActiveObject().info.files[id];
  $("form#formFile :input").each(function(){
    let input = $(this);
    input.val(file[input.attr('name')]);
   }); 
}