var tabs_area_canvas_component = {
  props: {
    prop : Object
  },
  mounted: function (){
    let canvas = new fabric.Canvas(this.$data.id, { selection: false});
    area_generate(canvas,this.$props.prop.area_sides);
    this.$props.prop.canvas = canvas;
  },
  data(){
    return {
        id: 'c_'.concat(this.$props.prop.id)
    }
  },
  template: `
    <canvas :id='id' width="740px" height="380px" style="border:1px solid #ccc"></canvas>        
  `
}

var area_sides_control_component = {
  props: {
    prop : Object
  },
  methods: {
    change_sides: function (operation) {
      let area_sides =  this.$props.prop.area_sides;
      if(area_sides===3 && operation===-1)return;
      this.$props.prop.area_sides=area_sides+operation;
      let copy_images = this.$props.prop.canvas.getObjects('image');
      this.$props.prop.canvas.clear();
      area_generate(this.$props.prop.canvas,this.$props.prop.area_sides,copy_images);
    }
  },
  template: `
  <b-input-group>
    <b-input-group-prepend>
      <b-button variant="outline-secondary" 
              size="sm" 
              @click="change_sides(-1)" 
              :title="$t('remove_side')">
        <b-icon-dash></b-icon-dash>
      </b-button>
    </b-input-group-prepend>
    <b-form-input size="sm" readonly disabled :value="$t('num_sides',{ num: prop.area_sides})"></b-form-input>
    <b-input-group-append>
      <b-button variant="outline-secondary" 
                size="sm" 
                @click="change_sides(1)" 
                :title="$t('add_side')">
        <b-icon-plus></b-icon-plus>
      </b-button>
    </b-input-group-append>
  </b-input-group>  
  `
}

var area_rotate_control_component = {
  props: {
    prop : Object
  },
  methods: {
    rotate: function (degrees) {
      canvas_rotate(this.$props.prop.canvas,degrees);
      this.$props.prop.canvas.requestRenderAll();
    },
    rotate_left: function () {
      this.rotate(-Math.abs(this.$data.degrees));
    },
    rotate_right: function () {
      this.rotate(this.$data.degrees);
    }
  },
  data() {
    return {
      degrees: 1
    }
  },
  template: `
    <div>
      <label for="range-2">
        <b-input-group>
          <b-input-group-prepend>
            <b-button variant="outline-secondary" 
                    size="sm" 
                    @click="rotate_left" 
                    :title="$t('ratate_to',{ direction: $t('left')})">
              <b-icon-chevron-left></b-icon-chevron-left>
            </b-button>
          </b-input-group-prepend>
          <b-input-group-append>
            <b-button variant="outline-secondary" 
                      size="sm" 
                      @click="rotate_right" 
                      :title="$t('ratate_to',{ direction: $t('right')})">
              <b-icon-chevron-right></b-icon-chevron-right>
            </b-button>
          </b-input-group-append>
          &nbsp; {{ $t('degrees') }} {{ degrees }}
        </b-input-group> 
      </label>
      <b-form-input :title="$t('select_degrees')" v-model="degrees" type="range" min="1" max="180" step="1"></b-form-input>
    </div>
  `
}

var area_item_component = {
  props: {
    prop : Object
  },
  methods: {

  },
  data() {
    return {

    }
  },
  template: `
    <div>
      <b-button variant="outline-secondary" 
          size="sm" 
          @click="rotate_left" 
          :title="$t('ratate_to',{ direction: $t('left')})">
          <span class="fas fa-door-open" style="font-size:36px"></span>
      </b-button>
    </div>
  `
}