export default function deviceReducer(state = {},action) {
  let isMobile = state.isMobile === 'false' ? false : true;
  if (state.isMobile=== false){
    isMobile=false;
  }
  let Secion = state.Secion ;
// Aqui Guardamos los datos del usuario
switch (action.type) {
  case "LoginState":
    Secion=action.payload;
  default:
}
  return Object.assign({}, state, { isMobile ,Secion });
}