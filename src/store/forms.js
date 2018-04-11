import { db } from '../config/constants'

/**
 * ACTION TYPES
 */
const SET_FORMS = 'SET_FORMS'

/**
 * ACTION CREATORS
 */
const setForms = forms => ({type: SET_FORMS, forms})

/**
 * THUNK CREATORS
 */

export const getFormData = (providerName) =>
  (dispatch) => {
  try {
    db.collection('clientForms')
    .doc(providerName)
    .collection('forms')
    .get()
    .then(snapshot => {
        let formDataArr = []
        snapshot.forEach(doc => {
            console.log('in snapshot arr data is', doc.data())
            formDataArr.push(doc.data())
        })
        dispatch(setForms(formDataArr))
    })
  }
  catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_FORMS:
      return action.forms
    default:
      return state
  }
}
