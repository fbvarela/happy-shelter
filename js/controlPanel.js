var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
var img = document.createElement('img');
img.src = deleteIcon;

function subtractOneSide(idSide){
  sides[idSide]=sides[idSide]-1;
}

function addOneSide(idSide){
  sides[idSide]=sides[idSide]+1;
}

function removeLine() {
  var id = getActiveTab();
  if(getSides(id)!=3){
    var img = getCanvas(id).getObjects('image');
    getCanvas(id).clear();
    subtractOneSide(id);
    generateArea(id,img);  
  }            
}

function addLine() {
  var id = getActiveTab();
  var img = getCanvas(id).getObjects('image');
  getCanvas(id).clear();
  addOneSide(id);
  generateArea(id,img);      
}

function addItem(item) {
  let canvasId = getActiveTab();
  makeImage(canvasId,item.img,item.id);
}

function addKennelItem(item) {
  let canvasId = getActiveTab();
  item.info.areaId = canvasId;
  item.info.id=getIdKennel();
  newIdKennel();
  addKennel(item.info);
  makeImage(canvasId,item.img,item.id,item.info.id);
}

function deleteObject() {
  let canvas = getCanvas(getActiveTab());
  let obj = canvas.getActiveObject(); 
  if(obj.id!=undefined){
    if(hasAnimalsInKennel(obj.id)){
      alert(getTextLang('errorRemoveKennelHasAnimals').text);
      return
    }
    removeKennel(obj.id);
  }  
  canvas.remove(obj);
  canvas.requestRenderAll(); 
}

function makeImage(canvasId,urlImg,idImg,id){  
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
      itemType: idImg,
      id: id
      });
    getCanvas(canvasId).add(img1);
  });
}

function rotate(direction) {  
  var id = getActiveTab();
  var degrees  = getSelectorTabActive('#grados').val();
  if(direction=='right'){
    degrees = Math.abs(degrees)
  }     
  executeRotate(id,degrees);
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}