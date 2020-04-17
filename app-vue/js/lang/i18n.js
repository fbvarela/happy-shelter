const messages = {
  ES: {
    message: {
      area: 'Área',
      save: 'Guardar',
      add_new_area: 'Añadir nuevo área',
      delele_area: 'Eliminar último área',
      edit_shelter_name: 'Editar nombre del refugio'
    }
  },
  EN: {
    message: {
      area: 'Area',
      save: 'Save',
      add_new_area: 'Add new area',
      delele_area: 'Add last area',
      edit_shelter_name: 'Edit shelter name'
    }
  }
}

const i18n = new VueI18n({
  locale: 'ES', 
  messages 
})