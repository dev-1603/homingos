
/**
 * @method toggleSpinner
 * @param { Object } state
 * @param { Object } payload
 */
const toggleSpinner = (state, payload) => {
  state.qSpinner = payload
}

/**
 * @method updatephotos
 * @param { Object } state
 * @param { Object } payload
 */
const updatephotos =(state, payload) => {
  state.picData = payload
}


export {
  toggleSpinner,
  updatephotos
}
