import { db } from '../config/constants'

/**
 * ACTION TYPES
 */
const SET_ALL_COMPANIES = 'SET_ALL_COMPANIES'

/**
 * INITIAL STATE
 */
const defaultAllCompanies = []

/**
 * ACTION CREATORS
 */
const setAllCompanies = allCompanies => ({type: SET_ALL_COMPANIES, allCompanies})

/**
 * THUNK CREATORS
 */

export const getAllCompaniesData = () =>
  (dispatch) => {
  try {
    db.collection('companies')
    .get()
    .then(snapshot => {
        let companyArr = []
        snapshot.forEach(doc => {
            companyArr.push(doc.data().name)
        })
        console.log('the name arr is', companyArr)
        dispatch(setAllCompanies(companyArr))
    })

  }
  catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultAllCompanies, action) {
  switch (action.type) {
    case SET_ALL_COMPANIES:
      return action.allCompanies
    default:
      return state
  }
}
