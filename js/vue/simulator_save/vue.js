
var simulator_save = new Vue({
  el: '#simulator_save', 
  i18n : i18n,  
  data: {
    show: false,
    texts: []
  },
  components: {

  },
  methods: {
    append_title :function(title, num){
      if(num!=undefined){
        title = title.concat(" (").concat(num).concat(")");
      }else{
        title= title.concat(end);
      }
      this.$data.texts.push(title);  
    },
    append_items : function(item, arrayData, params){
      this.append_title(this.$t(item.id), arrayData.length);
      var that = this;
      _.each(arrayData, function (obj) {
        that.append_info_item(obj, params);
      });
    },   
    append_info_item: function(obj, paramsToAppend){
      var that = this;
      _.each(paramsToAppend, function (param) {
        var string;
        var moreParams = param.split(',');
        if(moreParams.length>1){
          string = param.concat(": ").concat(JSON.stringify(obj[moreParams[0]][moreParams[1]]));
        }else{
          string = param.concat(": ").concat(JSON.stringify(obj[param]));
        }
        that.$data.texts.push(string);
      });
    }, 
    filter_items_canvas: function(canva,idToFilter){
      return _.filter(canva.getObjects('image'),function(obj){
        return obj.itemType === idToFilter;
      });
    },
    generate_info: function (){
      this.$data.texts=[];
      var infoKennel = ['type','left','top','width','height','scaleX','scaleY','itemType','id'];
      var infoObject = ['type','left','top','width','height','scaleX','scaleY','itemType'];
      var infoCircle = ['left','top',"line1,x1","line1,y1","line1,x2","line1,y2","line2,x1","line2,y1","line2,x2","line2,y2"];
      var infoLine   = ['x1','y1','x2','y2','scaleX','scaleY'];
      var that = this;
      _.each(vue_panel_areas.$data.tabs, function (tabs) { 
        let canva = tabs.canvas;
        var KENNEL_DOG = that.filter_items_canvas(canva, ITEM.KENNEL_DOG.id);
        var KENNEL_CAT = that.filter_items_canvas(canva, ITEM.KENNEL_CAT.id);
        var OFFICE     = that.filter_items_canvas(canva, ITEM.OFFICE.id);
        var TREE       = that.filter_items_canvas(canva, ITEM.TREE.id);
        var FAUCET     = that.filter_items_canvas(canva, ITEM.FAUCET.id);
        var ENTRY      = that.filter_items_canvas(canva, ITEM.ENTRY.id);
        that.append_title('------------------ Init ------------------', tabs.title.concat(" id: ").concat(tabs.id));
        that.append_items({id:'lines_of_area'},canva.getObjects('line'),infoLine);
        that.append_items({id:'lines_of_circles'},canva.getObjects('circle'),infoCircle);
        that.append_items(ITEM.KENNEL_DOG,KENNEL_DOG,infoKennel);
        that.append_items(ITEM.KENNEL_CAT,KENNEL_CAT,infoKennel);  
        that.append_items(ITEM.OFFICE,OFFICE,infoObject);
        that.append_items(ITEM.TREE,TREE,infoObject);  
        that.append_items(ITEM.FAUCET,FAUCET,infoObject);
        that.append_items(ITEM.ENTRY,ENTRY,infoObject);
        that.append_title('------------------ End ------------------', tabs.title.concat(" id: ").concat(tabs.id));  
      });  

      this.append_title('animals', animals.length);
      _.each(animals, function (animal){
        that.$data.texts.push(JSON.stringify(animal));
      })
    
      this.append_title('kennels', kennels.length);
      _.each(kennels, function (kennel){
        that.$data.texts.push(JSON.stringify(kennel));
      })
    }
  }
})