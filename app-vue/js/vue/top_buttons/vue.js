
var vue_top_buttons = new Vue({
  el: '#top-buttons', 
  i18n : i18n,  
  components: {
    'buttons-main': buttons_main_component,
    'buttons-lang': buttons_lang_component
  },
  data: {
    buttons:[
      {
        id: 1,
        click: 'add_new_area',
        class: 'glyphicon-plus',
        title: 'message.add_new_area',
        text:  'message.area'
      },
      {
        id: 2,
        click: 'delete_last_area',
        class: 'glyphicon-trash',
        title: 'message.delele_area',
        text:  'message.area'     
      },
      {
        id: 3,
        click: 'save',
        class: 'glyphicon-floppy-disk',
        title: 'message.save',
        text:  'message.area'
      },
      {
        id: 4,
        click: 'change_shelte_name',
        class: 'glyphicon-pencil',
        title: 'message.edit_shelter_name',
        shelter_name: 'DISEÑA LAS ÁREAS DE TU REFUGIO ANIMAL'
      },
    ],
    langs:[
      {
        id: 1,
        click:"change_lang",
        lang: 'ES',
        class: 'active'
      },
      {
        id: 2,
        click:"change_lang",
        lang: 'EN'
      }
    ]
  },
  methods: {
    button_click: function (prop) {
      this[prop.click](prop);
    },
    change_shelte_name: function (prop) {
      let new_shelter_name = prompt(getTextLang('shelterName').text, prop.shelter_name);
      !new_shelter_name || !new_shelter_name.trim() ? false : prop.shelter_name=new_shelter_name;
    },
    change_lang: function (prop) {
      i18n.locale=prop.lang;
      changeLanguage(prop.lang);
    },
    add_new_area: function(){
      addAreaPENDINGMIGRATE();
    },
    delete_last_area: function(){
      deleteAreaPENDINGMIGRATE();
    },
    save: function(){
      savePENDINGMIGRATE();
    }          
  }
})