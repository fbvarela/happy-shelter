Vue.component('buttons_component', {
  props: {
    prop : {
      click            : String,
      class            : String,
      fa               : String,
      glyphicon        : String,
      text             : String,
      title            : String,
      alternative_text : String 
    },
    tab : Object          
  },
  data(){
    return {
        text: this.$props.prop.text,
        title: this.$props.prop.title
    }
  },
  template: `
    <b-button variant="outline-secondary" 
              size="lg" 
              @click="$emit('click', prop, tab)" 
              :title="$t(title)" 
              >
      <b-icon v-if="prop.class" :icon="prop.class"></b-icon>
      <span   v-if="prop.fa"        class="fa" :class="prop.fa"></span>
      <span   v-if="prop.glyphicon" class="glyphicon_200 glyphicon" :class="prop.glyphicon"></span>
      {{ $t(text) }} {{prop.alternative_text}}
    </b-button>
  `
})