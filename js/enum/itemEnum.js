const ITEM = {
  KENNEL_DOG: {
    id  : 'KENNEL_DOG',
    img : 'img/kennel_dog.png',
    title: 'Jaula perros',
    species:'perros'
  },
  KENNEL_CAT: {
    id   : 'KENNEL_CAT',
    img  : 'img/kennel_cat.png',
    title: 'Jaula gatos',
    species:'gatos'
  },
  OFFICE: {
    id  : 'OFFICE',
    img : 'img/casa2.png',
    title: 'Oficina'
  },
  PUTIL: {
    id  : 'PUTIL',
    img : 'img/putil.jpeg',
    title: 'Putil'
  }
}

class item  {
  constructor(item) {
    switch(item) {
      case ITEM.KENNEL_DOG.id:
        this.id  = ITEM.KENNEL_DOG.id;
        this.img = ITEM.KENNEL_DOG.img;
        this.title=ITEM.KENNEL_DOG.title;
        this.info = {
          species:ITEM.KENNEL_DOG.species,
          files: new Array(0)
        }
        break;
      case ITEM.KENNEL_CAT.id:
        this.id  = ITEM.KENNEL_CAT.id;
        this.img = ITEM.KENNEL_CAT.img;
        this.title=ITEM.KENNEL_CAT.title;
        this.info = {
          species:ITEM.KENNEL_CAT.species,
          files: new Array(0)
        }
        break;
      case ITEM.PUTIL.id:
        this.id  = ITEM.PUTIL.id;
        this.img = ITEM.PUTIL.img;
        this.title=ITEM.PUTIL.title;
        this.info = {
          species:ITEM.PUTIL.species,
          files: new Array(0)
        }
        break;
        case ITEM.OFFICE.id:
          this.id  = ITEM.OFFICE.id;
          this.img = ITEM.OFFICE.img;
          this.title=ITEM.OFFICE.title;
          break;
      default:
    }
  }
}
