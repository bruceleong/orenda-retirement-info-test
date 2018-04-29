/**
 * ACTION TYPES
 */
const SET_ROUTE = 'SET_ROUTE'

/**
 * INITIAL STATE
 */
const defaultRouteState = true

/**
 * ACTION CREATORS
 */
const setRoute = newBoolean => ({type: SET_ROUTE, newBoolean})

/**
 * THUNK CREATORS
 */

export const reRenderRoutes = (newBoolean) =>
 (dispatch) => {
  try {
    dispatch(setRoute(!newBoolean))
  }
  catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultRouteState, action) {
  console.log('in the reducer newBoolean', action.newBoolean, state)
  switch (action.type) {
    case SET_ROUTE:
      return action.newBoolean
    default:
    
      return state
  }
}
