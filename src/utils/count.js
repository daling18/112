export const age = function(birthday){
  let time = new Date(birthday).getTime(),
      _time = (new Date()).getTime();
  
  return Math.floor((_time - time)/3.1536e10);
}