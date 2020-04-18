
var vue_top_buttons = new Vue({
  el: '#top-buttons', 
  i18n : i18n,  
  components: {
    'buttons-lang': buttons_lang_component
  },
  data: {
    buttons:[
      {
        id: 0,
        click: 'add_new_area',
        class: 'plus',
        title: 'add_new_area',
        text:  'area'
      },
      {
        id: 1,
        click: 'delete_last_area',
        class: 'trash',
        title: 'delele_area',
        text:  'area'     
      },
      {
        id: 2,
        click: 'save',
        class: 'file-earmark-check',
        title: 'save',
        text:  'save'
      },
      {
        id: 3,
        click: 'change_shelte_name',
        class: 'pencil',
        title: 'edit_shelter_name',
        alternative_text: 'DISEÑA LAS ÁREAS DE TU REFUGIO ANIMAL'
      },
    ]
  },
  methods: {
    button_click: function (prop) {
      this[prop.click](prop);
    },
    change_shelte_name: function (prop) {
      let new_shelter_name = prompt(this.$t('shelter_name'), prop.alternative_text);
      !new_shelter_name || !new_shelter_name.trim() ? false : prop.alternative_text=new_shelter_name;
    },
    add_new_area: function(){
      vue_panel_areas.add_new_tab();      
      //addAreaPENDINGMIGRATE();
    },
    delete_last_area: function(){
      vue_panel_areas.dalete_last_tab();  
      //deleteAreaPENDINGMIGRATE();
    },
    save: function(){
      savePENDINGMIGRATE();
    }          
  }
})