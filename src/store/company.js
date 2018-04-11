import { db } from '../config/constants'

/**
 * ACTION TYPES
 */
const SET_COMPANY = 'SET_COMPANY'

/**
 * INITIAL STATE
 */
const defaultCompany = ''

/**
 * ACTION CREATORS
 */
const setCompany = company => ({type: SET_COMPANY, company})

/**
 * THUNK CREATORS
 */

export const getCompanyData = (companyName) =>
 (dispatch) => {
  try {
    db.collection('clientInfo')
    .doc(companyName)
    .get()
    .then(doc => {
        console.log('doc.data()', doc.data());
        dispatch(setCompany(doc.data()))
    })
  }
  catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultCompany, action) {
  switch (action.type) {
    case SET_COMPANY:
      return action.company
    default:
      return state
  }
}