
var vue_panel_areas = new Vue({
  el: '#panel-areas', 
  i18n : i18n,  
  data: {
    tabIndex: 0,
    tabs:[],
    buttons_firts:[
      {
        id: 0,
        click: 'add_kennel_dog',
        fa: 'fa-dog',
        title: 'add_kennel_dog'
      },
      {
        id: 1,
        click: 'add_kennel_cat',
        fa: 'fa-cat',
        title: 'add_kennel_cat'
      }
    ],
    buttons_senconds:[
      {
        id: 0,
        click: 'add_item_office',
        class: 'house-door-fill',
        title: 'add_item_office'
      },
      {
        id: 1,
        click: 'add_item_tree',
        fa: 'fa-tree',
        title: 'add_item_tree'
      },
      {
        id: 2,
        click: 'add_item_entry',
        fa: 'fa-door-open',
        title: 'add_item_entry'
      },
      {
        id: 3,
        click: 'add_item_faucet',
        fa: 'fa-faucet',
        title: 'add_item_faucet'
      }
    ]
  },
  components: {
    'tabs-area-canvas'    : tabs_area_canvas_component,
    'area_sides_control'  : area_sides_control_component,
    'area_rotate_control' : area_rotate_control_component
  },
  methods: {
    add_new_tab: function(){
      let tabs         = this.$data.tabs;
      let new_tabs_id  = tabs.length+1;
      let area_name = prompt(this.$t('name_of_area'),this.$t('area_name',{ num: new_tabs_id }));
      if(!area_name || !area_name.trim())return;
      tabs.push({
        id:new_tabs_id,
        title:area_name,
        area_sides:DEFAULT_SIDES,
      });
    },
    dalete_last_tab: function (){
      let tabs  = this.$data.tabs;
      if(tabs.length==0)return;
      tabs.pop();
    },
    button_click: function (prop, tab) {
      this[prop.click](tab);
    },
    add_kennel_cat : function (tab){
      let cat       = new item(ITEM.KENNEL_CAT.id);
      this.add_item(tab, cat);
    },
    add_kennel_dog : function(tab){
      let dog       = new item(ITEM.KENNEL_DOG.id);
      this.add_item(tab, dog);
    },
    add_item_office : function(tab){
      let i         = new item(ITEM.OFFICE.id);
      let canvas    = tab.canvas;
      make_image(canvas,i);
    }, 
    add_item_tree : function(tab){
      let i         = new item(ITEM.TREE.id);
      let canvas    = tab.canvas;
      make_image(canvas,i);
    }, 
    add_item_entry : function(tab){
      let i         = new item(ITEM.ENTRY.id);
      let canvas    = tab.canvas;
      make_image(canvas,i);
    }, 
    add_item_faucet : function(tab){
      let i         = new item(ITEM.FAUCET.id);
      let canvas    = tab.canvas;
      make_image(canvas,i);
    }, 
    add_item : function(tab, item){
      let canvas    = tab.canvas;
      let id_canvas = tab.id; 
      item.info.areaId = id_canvas;
      item.info.id=getIdKennel();
      newIdKennel();
      addKennel(item.info);
      make_image(canvas,item);
    }
  }
})