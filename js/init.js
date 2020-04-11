var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
var img = document.createElement('img');
img.src = deleteIcon;
var canvas = [];
var lados  = [];
var r      = 190;

function getSelector(selector){
  return  $(".tab-pane.active "+selector);
}

function getId(){
  return  $(".tab-pane.active").attr('idCanvas');
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

function changeLabelNumberPointsArea(){
  getSelector('#numberPointsArea').text(lados[getId()]);
}

function showInfo(info){
  getSelector('#especie').text(info.especie);
  getSelector('#numero').val(info.numero);
  getSelector('#info').show();
}

function changeValue(value,property) {
  var id = getId();
  var info = canvas[id].getActiveObject().info;
  info[property]=value;
}

function editTittleTap() {
    var id = getId();
    var actualAreaName = getTabName(id);
    var areaName = getAreaNameByPrompt(actualAreaName,id);
    if(!areaName)return 
    $('#link_'+id+' #titleArea').text(" "+areaName);
}

function createSpanElementTap(){
  var span = document.createElement('span');
  span.setAttribute("class", "glyphicon glyphicon-pencil");
  span.setAttribute("title", "Editar nombre del área");
  span.setAttribute("onclick", "editTittleTap()");
  return span;
}

function removeAreaToTap(){
  var myTab = document.getElementById("myTab"); 
  var myTabContent = document.getElementById("myTabContent"); 
  if(myTab.childNodes.length==0 || myTabContent.childNodes.length==0){
    return
  }
  if($(myTab.childNodes[lados.length-1]).hasClass('active') && myTab.childNodes.length>1){
    getTabClick(lados.length-2)
  }
  myTabContent.removeChild(myTabContent.childNodes[lados.length-1]);     
  myTab.removeChild(myTab.childNodes[lados.length-1]);     
  canvas.pop();
  lados.pop();
}

function getAreaNameByPrompt(defaultName,id){
  var nombreArea = prompt("¿Nombre del Área?",defaultName);
  if(nombreArea==null){
    return false;
  }
  if(nombreArea.length==0){
    nombreArea='Área '+(Number(id)+1);
  }
  return nombreArea;
}

function addAreaToTap() {
  $('#panelApp').show();
  var id =lados.length;
  var nombreArea = getAreaNameByPrompt('Área '+(id+1),id);
  if(!nombreArea)return
  var myTab = document.getElementById("myTab");
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
  a.append(createSpanElementTap());
  a.append(span);      
  li.append(a);
  myTab.append(li);
  var myTabContent = document.getElementById("myTabContent");
  myTabContent.setAttribute("style", "margin-top:10px");
  div.setAttribute("id", "tab_"+id);
  div.setAttribute("idCanvas", id);
  div.setAttribute("class", "tab-pane");
  myTabContent.appendChild(div);
  div.innerHTML +=$('#hiddenRow').html()
  $('#tab_'+id).find('canvas').attr('id','c_'+id);  
  getTabClick(id);
  canvas[id]=new fabric.Canvas('c_'+id, { selection: false});
  lados[id]=4;
  init(id);      
}     

function init(id,imgs) {
    changeLabelNumberPointsArea();
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    var cx = canvas[id].getWidth() / 2;
    var cy = canvas[id].getHeight() / 2;
    var a = 360/lados[id];
    var lines =new Array();              
    for(var i=0;i < lados[id];i++){
        var aRad=  (Math.PI / 180) * (a*(i+1));
        Xp = cx+r * Math.cos(aRad);
        Yp = cy+r * Math.sin(aRad);
        lines[i]={x2:Xp, y2:Yp};
        if(i != 0){
          lines[i] = makeLine([lines[i-1].x2, lines[i-1].y2, Xp, Yp]);
          canvas[id].add(lines[i]);
          if(i != 1){
            canvas[id].add(makeCircle(lines[i].get('x1'), lines[i].get('y1'), lines[i-1], lines[i]));
          }               
          if(i == lados[id]-1){
            lines[0] = makeLine([Xp, Yp, lines[0].x2, lines[0].y2]);
            canvas[id].add(
              lines[0],
              makeCircle(lines[0].get('x1'), lines[0].get('y1'), lines[lines.length-1], lines[0]),
              makeCircle(lines[1].get('x1'), lines[1].get('y1'), lines[0], lines[1])
            );         
          }
        }              
    }

    executeRotate(id,45);

    if(imgs !=undefined){
        imgs.forEach(function (img) {
        canvas[id].add(img);
      });
    }     

    loadEventsCanvas(id);
}

function loadEventsCanvas(id){
  canvas[id].on({
    'object:moving': function(e) {
        canvas[id].getObjects('circle').forEach((obj) => {
            obj.line1.angle=0;
            obj.line1 && obj.line1.set({'x2':obj.getPointByOrigin().x, 'y2': obj.getPointByOrigin().y});
            obj.line2 && obj.line2.set({'x1':obj.getPointByOrigin().x, 'y1': obj.getPointByOrigin().y});
        });    
        canvas[id].renderAll();    
    },
    'mouse:over': function(e) {

    },    
    'mouse:out': function(e) {

    },        
    'selection:created': function(e) {
      if(e.target && e.target.info){        
        var info = e.target.info; 
        showInfo(info);                 
      }
    },
    'selection:updated': function(e) {
      if(e.target && e.target.info){        
        var info = e.target.info;  
        showInfo(info);       
      }
    },
    'before:selection:cleared': function(e) {
      if(e.target && e.target.info){
        getSelector('#info').hide();
      }
    }
  });
}

function makeCircle(left, top, line1, line2) {
  var c = new fabric.Circle({
    left: left,
    top: top,
    strokeWidth: 1,
    radius: 5,
    fill: '#fff',
    stroke: '#666',
  });
  c.hasControls = c.hasBorders = false;
  c.line1 = line1;
  c.line2 = line2;
  return c;
}

function makeLine(coords) {
  return new fabric.Line(coords, {
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    selectable: false
  });
}

function rotate(direction) {  
  var id = getId();
  var degrees  = getSelector('#grados').val();
  if(direction=='right'){
    degrees = Math.abs(degrees)
  }     
  executeRotate(id,degrees);
}

function executeRotate(id,angleOffset) {     
  let canvasCenter = new fabric.Point(canvas[id].getWidth() / 2, canvas[id].getHeight() / 2);
  let radians = fabric.util.degreesToRadians(angleOffset);
  canvas[id].getObjects().forEach((obj) => {
      let objectOrigin = new fabric.Point(obj.left, obj.top);
      let new_loc = fabric.util.rotatePoint(objectOrigin, canvasCenter, radians);
      obj.top = new_loc.y;
      obj.left = new_loc.x;
      obj.angle += Number(angleOffset);
      obj.setCoords();
  });
  canvas[id].renderAll();
}

function deleteObject(eventData, target) {
  var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}

function makeImage(canvasId,urlImg,idImg,info){
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    position: { x: 0.5, y: -0.5 },
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  });
  fabric.Image.fromURL(urlImg, function(myImg) {
    var img1 = myImg.set({ 
      left: 100, 
      top: 50 ,
      width:50,
      height:50,
      id: idImg,
      info: info
      });
    canvas[canvasId].add(img1); 
  });
}

function removeLine() {
  var id = getId();
  if(lados[id]!=3){
    var img = canvas[id].getObjects('image');
    canvas[id].clear();
    var newLados= lados[id]-1;
    lados[id]=newLados;
    init(id,img);  
  }            
}

function addLine() {
  var id = getId();
  var img = canvas[id].getObjects('image');
  canvas[id].clear();
  var newLados= lados[id]+1;
  lados[id]=newLados;
  init(id,img);      
}

function addItem(item) {
  var id = getId();
  var img; 
  var idCanvas;
  var info;
  switch (item) {
    case 'cat':
      img = 'img/kennel_cat.png';
      idCanvas = 'chenilleCat';
      info = {especie:'gatos'};
    break;
    case 'dog':
      img = 'img/kennel_dog.png';
      idCanvas = 'chenilleDog';
      info = {especie:'perros'};
    break;
    case 'office':
      img = 'img/casa2.png';
      idCanvas = 'office';
    break;
    default:
      break;
  }
  makeImage(id,img,idCanvas,info)
}

function save() {
  $('#panelAppGuardado').show();
  var simuladirGuardado = $("#simuladorGuardado");
  $(simuladirGuardado).text('');
  canvas.forEach(function (canva,i) {
    var titleArea = getTabName(i);
    $(simuladirGuardado).append("<b>Init Nombre del área = "+titleArea+"</b>");
    $(simuladirGuardado).append("<br><b>Lineas del área:</b><br>");
    canva.getObjects('line').forEach(function (obj) {
      $(simuladirGuardado).append("coords: "+obj.getCoords()+"<br><br>");
    });
    $(simuladirGuardado).append("<b>Circulos del área:</b><br>");
    canva.getObjects('circle').forEach(function (obj) {
      $(simuladirGuardado).append("left: "+obj.left+"<br>");
      $(simuladirGuardado).append("top: "+obj.top+"<br>");
      $(simuladirGuardado).append("linea1:  "+obj.line1.getCoords()+" <br>");
      $(simuladirGuardado).append("linea2: "+obj.line2.getCoords()+"<br><br>");
    });
    $(simuladirGuardado).append("<b>Cheniles Perros:</b><br>");
    canva.getObjects('image').forEach(function (obj) {
      if(obj.id=='chenilleDog'){
        $(simuladirGuardado).append("type: "+obj.type+"<br>");
        $(simuladirGuardado).append("left: "+obj.left+"<br>");
        $(simuladirGuardado).append("top:  "+obj.top+" <br>");
        $(simuladirGuardado).append("width: "+obj.width+"<br>");
        $(simuladirGuardado).append("height: "+obj.height+"<br>");
        $(simuladirGuardado).append("id: "+obj.id+"<br>");
        $(simuladirGuardado).append("info: "+JSON.stringify(obj.info)+"<br><br>");
      }           
    });
    $(simuladirGuardado).append("<b>Cheniles Gatos:</b><br>");
    canva.getObjects('image').forEach(function (obj) {
      if(obj.id=='chenilleCat'){
        $(simuladirGuardado).append("type: "+obj.type+"<br>");
        $(simuladirGuardado).append("left: "+obj.left+"<br>");
        $(simuladirGuardado).append("top:  "+obj.top+" <br>");
        $(simuladirGuardado).append("width: "+obj.width+"<br>");
        $(simuladirGuardado).append("height: "+obj.height+"<br>");
        $(simuladirGuardado).append("id: "+obj.id+"<br>");
        $(simuladirGuardado).append("info: "+JSON.stringify(obj.info)+"<br><br>");
      }           
    });
    $(simuladirGuardado).append("<b>Oficinas:</b><br>");
    canva.getObjects('image').forEach(function (obj) {
      if(obj.id=='office'){
        $(simuladirGuardado).append("type: "+obj.type+"<br>");
        $(simuladirGuardado).append("left: "+obj.left+"<br>");
        $(simuladirGuardado).append("top:  "+obj.top+" <br>");
        $(simuladirGuardado).append("width: "+obj.width+"<br>");
        $(simuladirGuardado).append("height: "+obj.height+"<br>");
        $(simuladirGuardado).append("id: "+obj.id+"<br>");
        $(simuladirGuardado).append("info: "+JSON.stringify(obj.info)+"<br><br>");
      }      
    });
    $(simuladirGuardado).append("<b>End Nombre del área = "+titleArea+"</b><br>");
  });   
}