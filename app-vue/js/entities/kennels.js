var kennels         = [];
var idKennel        = 0;

function newIdKennel(){
  return idKennel++;
}
function getIdKennel(){
  return idKennel;
}

function addKennel(info){
  kennels.push(info);
}

function removeKennel(idRemove){
  kennels = _.without(kennels, _.findWhere(kennels, {
    id: idRemove
  }));
}

function deleleKennelsByAreaId(IdArea){
  _.each(getKennelsByAreaId(IdArea),function (kennel){
    removeKennel(kennel.id);
  });
}

function getKennelsByAreaId(IdArea){
  return _.filter(kennels,function(kennel){
    return kennel.areaId == IdArea;
  });
}

function getKennelById(idToFilter){
  return _.filter(kennels,function(kennel){
    return kennel.id == idToFilter;
  })[0];
}

function getKennelsWithAnimals(kennelsSelected){
    return _.map(kennelsSelected, function(obj) { 
      let objC = _.clone(obj);
      objC['animals']=getAnimalsByIdKennel(obj.id);
      objC['totalAnimals']= objC['animals'].length;
      return objC;
  }); 
}

function getAvailableKennelsForOneAnimal(actualKennelIdAnimal,species){
    return _.filter(kennels,function(kennel){
      return kennel.species == species && kennel.id!=actualKennelIdAnimal
  });
}

function getAvailableKennelsWithAnimalsForOneAnimal(idKennel, species){
  return getKennelsWithAnimals(getAvailableKennelsForOneAnimal(idKennel,species));
}