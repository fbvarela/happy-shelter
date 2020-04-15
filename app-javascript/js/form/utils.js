function getObjsForm(formName){
  let jqForm = getFormInputJQ(formName);
  let inputFilter = _.filter(jqForm,function(obj){
    jqObj = $(obj);
    return (jqObj.attr('type')==='radio' && jqObj.is(':checked')) || jqObj.attr('type')!=='radio';
  });
  let map = _.map(inputFilter, function(obj) { 
    jqObj = $(obj);
    return {
      name:jqObj.attr('name'),
      value:jqObj.val()
    };
  }); 
  return _.object(_.map(map, _.values))
}  

function getObjsFormType(formName,type){
  let jqForm = getFormInputJQ(formName);
  return _.filter(jqForm,function(obj){
    jqObj = $(obj);
    return jqObj.attr('type')===type;
  });
}

function updateForm(formName, objFromUpdate){
  let jqForm = getFormInputJQ(formName);
  _.each(jqForm,function(obj){
    let input = $(obj);
    if(input.attr('type')==='radio'){
      updateRadio(input,input.val()===objFromUpdate[input.attr('name')]);
    }else{
      input.val(objFromUpdate[input.attr('name')]);
    }    
  }); 
}

function updateRadio(obj,checked){
  $(obj).attr('checked', checked);  
  $(obj).parent().addClass('active');
  if(!checked){
    $(obj).parent().removeClass('active');
  }
}

function updateRadios(fornName){
  _.each(_.groupBy(getObjsFormType(fornName,'radio'), function(obj){ return obj.name; }),function(obj){
    _.each(obj, function(subObj, i){
      updateRadio(subObj,(i===0));
    })
  })
}

function getValInputForm(fornName,inputName){
 return $('#'+fornName+' input[name="'+inputName+'"]').val();
}

function setValInputForm(fornName,inputName,value){
  return $('#'+fornName+' input[name="'+inputName+'"]').val(value);
 }

function getFormInputJQ(formName){
  return  $('form#'+formName+' :input');
}