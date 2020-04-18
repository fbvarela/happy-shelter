var animals         = [];
var idAnimal        = 0;

function addAnimal(info){
  info.id=Number(info.id)
  animals.push(info);
}

function updaetAnimal(info){
  info.id=Number(info.id);
  let indexOfUpdatedUser = _.findIndex(animals,{ id: info.id});
  animals[indexOfUpdatedUser] = info;
}

function hasAnimalsInArea(idToFilter){
  hasAnimal=false;
  _.each(getKennelsByAreaId(idToFilter), function(kennel){
      if(hasAnimalsInKennel(kennel.id)){
        hasAnimal=true
      }
  })
  return hasAnimal;
 }

function hasAnimalsInKennel(idToFilter){
 let animalsKennel = getAnimalsByIdKennel(idToFilter);
 return animalsKennel.length>0;
}
function getAnimalsByIdKennel(idToFilter){
  return _.filter(animals,function(animal){
    return animal.idKennel == idToFilter;
  });
}

function getAnimalById(idToFilter){
  return _.filter(animals,function(animal){
    return animal.id == idToFilter;
  })[0];
}