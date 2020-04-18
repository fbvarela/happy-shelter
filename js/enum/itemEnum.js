const ITEM = {
  KENNEL_DOG: {
    id  : 'KENNEL_DOG',
    img : 'img/kennel_dog.png',
    species:'dogs'
  },
  KENNEL_CAT: {
    id   : 'KENNEL_CAT',
    img  : 'img/kennel_cat.png',
    species:'cats'
  },
  OFFICE: {
    id  : 'OFFICE',
    img : 'img/casa.png'
  },
  TREE: {
    id  : 'TREE',
    img : 'img/tree.png'
  },
  ENTRY: {
    id  : 'ENTRY',
    img : 'img/entry.png'
  },
  FAUCET: {
    id  : 'FAUCET',
    img : 'img/faucet.png'
  }
}

class item  {
  constructor(item) {
    switch(item) {
      case ITEM.KENNEL_DOG.id:
        this.id  = ITEM.KENNEL_DOG.id;
        this.img = ITEM.KENNEL_DOG.img;
        this.info = {
          species:ITEM.KENNEL_DOG.species,
        }
      break;
      case ITEM.KENNEL_CAT.id:
        this.id  = ITEM.KENNEL_CAT.id;
        this.img = ITEM.KENNEL_CAT.img;
        this.info = {
          species:ITEM.KENNEL_CAT.species,
        }
      break;
      case ITEM.OFFICE.id:
        this.id  = ITEM.OFFICE.id;
        this.img = ITEM.OFFICE.img;
      break;
      case ITEM.TREE.id:
        this.id  = ITEM.TREE.id;
        this.img = ITEM.TREE.img;
      break;
      case ITEM.ENTRY.id:
        this.id  = ITEM.ENTRY.id;
        this.img = ITEM.ENTRY.img;
      break;
      case ITEM.FAUCET.id:
        this.id  = ITEM.FAUCET.id;
        this.img = ITEM.FAUCET.img;
      break;
      default:
    }
  }
}