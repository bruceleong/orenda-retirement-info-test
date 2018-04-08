import history from '../history'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const setUser = user => ({type: SET_USER, user})

/**
 * THUNK CREATORS
 */

export const getUserData = (userName) =>
async (dispatch) => {
  try {
    db.collection('clientInfo')
    .doc(userName)
    .get()
    .then(doc => {
        console.log('doc.data()', doc.data());
        dispatch(setUser(doc.data()))
    })
    // const updatedUser = await axios.put(`/api/users/${id}`, user)
    // dispatch(setUser(updatedUser.data))
    // return updatedUser;
  }
  catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}