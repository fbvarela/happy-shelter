var buttons_lang_component = {
  data (){
    let ES ='ES';
    let EN ='EN';
    return {
      selected: ES,
      options: [
        { text:ES, value: ES },
        { text:EN, value: EN }
      ]
    }
  },
  methods: {
    change_lang: function (lang) {
      i18n.locale=lang;
    }
  },
  template:`
    <b-form-radio-group
          buttons
          @change="change_lang" 
          v-model="selected"
          :options="options"
          button-variant="outline-primary"
          size="sm">
    </b-form-radio-group>
  `
}