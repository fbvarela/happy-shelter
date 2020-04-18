const messages = {
  ES: {
      close: 'Cerrar',
      area: 'Área',
      area_name: 'Área {num}',
      save: 'Guardar',
      add_new_area: 'Añadir nuevo área',
      delele_area: 'Eliminar último área',
      edit_shelter_name: 'Editar nombre del refugio',
      name_of_area: '¿Nombre del área?',
      control_panel : 'Panel de control',
      info : 'Info',
      shelter_name: '¿Nombre del Refugio?',
      remove_side: 'Eliminar un punto del área',
      add_side: 'Añadir un punto al área',
      num_sides: 'Num. puntos: {num}',
      left: 'izquierda',
      right : 'derecha',
      ratate_to: 'Rotar todo hacia la {direction}',
      degrees: 'Grados',
      select_degrees: 'Seleccione los grados',
      add_kennel_dog: 'Añadir chenil de perros',
      add_kennel_cat: 'Añadir chenil de gatos',
      add_item_office: 'Añadir oficina',
      add_item_tree: 'Añadir árbol',
      add_item_entry: 'Añadir entrada',
      add_item_faucet: 'Añadir fuente',
      error_remove_kennel_has_animals: 'No se puede eliminar un chenil que tiene animales'
  },
  EN: {
      close: 'Close',
      area: 'Area ',
      area_name: 'Area {num}',
      save: 'Save',
      add_new_area: 'Add new area',
      delele_area: 'Add last area',
      edit_shelter_name: 'Edit shelter name',
      name_of_area: 'Name of the area?',
      control_panel : 'Control Panel',
      info : 'Info',
      shelter_name: 'Shelter Name?',
      remove_side: 'Remove a point from the area',
      add_side: 'Add a point to the area',
      num_sides: 'Num of points: {num}',
      left: 'left',
      right : 'right',
      ratate_to: 'Rotate everything to the {direction}',
      degrees: 'Degrees',
      select_degrees: 'Select degrees',
      add_kennel_dog: 'Add dog kennel',    
      add_kennel_cat: 'Add cat kennel',
      add_item_office: 'Add office',
      add_item_tree: 'Add tree',
      add_item_entry: 'Add entry',
      add_item_faucet: 'Add faucet',
      error_remove_kennel_has_animals: 'You cannot remove a kennel that has animals'
  }
}

const i18n = new VueI18n({
  locale: 'ES', 
  messages 
})