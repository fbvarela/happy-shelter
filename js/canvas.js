var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
var img = document.createElement('img');
img.src = deleteIcon;

function area_generate(canvas,sides,imgs_copy) {
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  let cx = canvas.getWidth() / 2;
  let cy = canvas.getHeight() / 2;
  let a = 360/sides;
  let lines =new Array();
  let r = 190;              
  for(let i=0;i < sides;i++){
    let aRad=  (Math.PI / 180) * (a*(i+1));
    Xp = cx+r * Math.cos(aRad);
    Yp = cy+r * Math.sin(aRad);
    lines[i]={x2:Xp, y2:Yp};
    if(i != 0){
      lines[i] = makeLine([lines[i-1].x2, lines[i-1].y2, Xp, Yp]);
      canvas.add(lines[i]);
      if(i != 1){
        canvas.add(makeCircle(lines[i].get('x1'), lines[i].get('y1'), lines[i-1], lines[i]));
      }               
      if(i == sides-1){
        lines[0] = makeLine([Xp, Yp, lines[0].x2, lines[0].y2]);
        canvas.add(
          lines[0],
          makeCircle(lines[0].get('x1'), lines[0].get('y1'), lines[lines.length-1], lines[0]),
          makeCircle(lines[1].get('x1'), lines[1].get('y1'), lines[0], lines[1])
        );         
      }
    }              
  }
  canvas_rotate(canvas,45);
  canvas_events_load(canvas);
  if(imgs_copy != undefined){
    imgs_copy.forEach(function (img) {
        canvas.add(img);
    });
  }
  canvas.requestRenderAll();
}

function canvas_rotate(canvas,angleOffset) {     
  let canvas_width  = canvas.getWidth();
  let canvas_height = canvas.getHeight();
  let canvasCenter = new fabric.Point(canvas_width / 2, canvas_height / 2);
  let radians = fabric.util.degreesToRadians(angleOffset);
  canvas.getObjects().forEach((obj) => {
      let objectOrigin = new fabric.Point(obj.left, obj.top);
      let new_loc = fabric.util.rotatePoint(objectOrigin, canvasCenter, radians);
      obj.top = new_loc.y;
      obj.left = new_loc.x;
      obj.angle += Number(angleOffset);
      obj.setCoords();
  });
}

function canvas_events_load(canvas){
  canvas.on({
    'object:moving': function() {
      canvas.getObjects('circle').forEach((obj) => {
          obj.line1.angle=0;
          obj.line1 && obj.line1.set({'x2':obj.getPointByOrigin().x, 'y2': obj.getPointByOrigin().y});
          obj.line2 && obj.line2.set({'x1':obj.getPointByOrigin().x, 'y1': obj.getPointByOrigin().y});
      });    
      canvas.requestRenderAll();    
    },     
    'selection:created': function(e) {
      if(e.target && e.target.id!=undefined){ 
        showInfo( e.target.id);                 
      }
    },
    'selection:updated': function(e) {
      if(e.target && e.target.id!=undefined){        
        showInfo(e.target.id);       
      }else{
        getSelectorTabActive('#info').hide();
      }
    },
    'before:selection:cleared': function() {
        getSelectorTabActive('#info').hide();
    },
    'mouse:over': function() {

    },    
    'mouse:out': function() {

    },   
  });
}

function make_image(canvas,item){  
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    position: { x: 0.5, y: -0.5 },
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: delete_object,
    render: render_icon,
    cornerSize: 24
  });
  fabric.Image.fromURL(item.img, function(myImg) {
    let img1 = myImg.set({ 
      left: 100, 
      top: 50 ,
      width:50,
      height:50,
      itemType: item.id,
      id: item.info && item.info.id
      });
    canvas.add(img1);
  });
}

function delete_object() {
  let vue_data = vue_panel_areas.$data;
  let tabIndex = vue_data.tabIndex;
  let canvas = vue_data.tabs[tabIndex].canvas;
  let obj = canvas.getActiveObject(); 
  if(obj.id!=undefined){
    if(hasAnimalsInKennel(obj.id)){
      alert(vue_panel_areas.$t('error_remove_kennel_has_animals'));
      return
    }
    removeKennel(obj.id);
  }  
  canvas.remove(obj);
  canvas.requestRenderAll(); 
}


function render_icon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}