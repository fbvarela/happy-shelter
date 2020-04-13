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
    img : 'img/casa.png',
    title: 'Oficina'
  },
  TREE: {
    id  : 'TREE',
    img : 'img/tree.png',
    title: 'Árbol'
  },
  ENTRY: {
    id  : 'ENTRY',
    img : 'img/entry.png',
    title: 'Entrada'
  },
  FAUCET: {
    id  : 'FAUCET',
    img : 'img/faucet.png',
    title: 'Fuente'
  }
}

class item  {
  constructor(item, areaId) {
    switch(item) {
      case ITEM.KENNEL_DOG.id:
        this.id  = ITEM.KENNEL_DOG.id;
        this.img = ITEM.KENNEL_DOG.img;
        this.title=ITEM.KENNEL_DOG.title;
        this.info = {
          species:ITEM.KENNEL_DOG.species,
        }
      break;
      case ITEM.KENNEL_CAT.id:
        this.id  = ITEM.KENNEL_CAT.id;
        this.img = ITEM.KENNEL_CAT.img;
        this.title=ITEM.KENNEL_CAT.title;
        this.info = {
          species:ITEM.KENNEL_CAT.species,
        }
      break;
      case ITEM.OFFICE.id:
        this.id  = ITEM.OFFICE.id;
        this.img = ITEM.OFFICE.img;
        this.title=ITEM.OFFICE.title;
      break;
      case ITEM.TREE.id:
        this.id  = ITEM.TREE.id;
        this.img = ITEM.TREE.img;
        this.title=ITEM.TREE.title;
      break;
      case ITEM.ENTRY.id:
        this.id  = ITEM.ENTRY.id;
        this.img = ITEM.ENTRY.img;
        this.title=ITEM.ENTRY.title;
      break;
      case ITEM.FAUCET.id:
        this.id  = ITEM.FAUCET.id;
        this.img = ITEM.FAUCET.img;
        this.title=ITEM.FAUCET.title;
      break;
      default:
    }
  }
}