var buttons_main_component = {
  props: {
    prop : {
      click         : String,
      class         : String,
      text          : String,
      title         : String,
      shelter_name  : String 
    }          
  },
  data(){
    return {
        text: this.$props.prop.text,
        title: this.$props.prop.title
    }
  },
  template: `
    <span @click="$emit('click', prop)" :title="$t(title)" 
          class="btn btn-default btn-lg">
      <span class="glyphicon" :class="prop.class"></span>
      <span>{{ $t(text) }} {{prop.shelter_name}}</span>
    </span>
  `
}
var buttons_lang_component = {
  props: {
    prop :  {
      lang  : String,
      class : String
    }
  },
  template:`
    <label @click="$emit('click', prop)" class="btn btn-primary" :class="prop.class">
      <input type="radio"><span>{{prop.lang}}</span>
    </label>
  `
}