function generateArea(id,imgs) {
  changeLabelNumberPointsArea(id);
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  let cx = getCanvas(id).getWidth() / 2;
  let cy = getCanvas(id).getHeight() / 2;
  let sides = getSides(id);
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
      getCanvas(id).add(lines[i]);
      if(i != 1){
        getCanvas(id).add(makeCircle(lines[i].get('x1'), lines[i].get('y1'), lines[i-1], lines[i]));
      }               
      if(i == sides-1){
        lines[0] = makeLine([Xp, Yp, lines[0].x2, lines[0].y2]);
        getCanvas(id).add(
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
      getCanvas(id).add(img);
    });
  }     

  loadEventsCanvas(id);
}

function loadEventsCanvas(id){
  getCanvas(id).on({
    'object:moving': function(e) {
      getCanvas(id).getObjects('circle').forEach((obj) => {
          obj.line1.angle=0;
          obj.line1 && obj.line1.set({'x2':obj.getPointByOrigin().x, 'y2': obj.getPointByOrigin().y});
          obj.line2 && obj.line2.set({'x1':obj.getPointByOrigin().x, 'y1': obj.getPointByOrigin().y});
      });    
      getCanvas(id).requestRenderAll();    
    },
    'mouse:over': function(e) {

    },    
    'mouse:out': function(e) {

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
    }
  });
}

function changeLabelNumberPointsArea(id){
  getSelectorTabActive('#numberPointsArea').text(getSides(id));
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
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1,
    selectable: false
  });
}

function executeRotate(id,angleOffset) {     
  let canvasCenter = new fabric.Point(getCanvas(id).getWidth() / 2, getCanvas(id).getHeight() / 2);
  let radians = fabric.util.degreesToRadians(angleOffset);
  getCanvas(id).getObjects().forEach((obj) => {
      let objectOrigin = new fabric.Point(obj.left, obj.top);
      let new_loc = fabric.util.rotatePoint(objectOrigin, canvasCenter, radians);
      obj.top = new_loc.y;
      obj.left = new_loc.x;
      obj.angle += Number(angleOffset);
      obj.setCoords();
  });
  getCanvas(id).requestRenderAll();
}