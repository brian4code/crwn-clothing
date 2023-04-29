import { CATEGORIES_ACTION_TYPES } from "./category.types"
import { createAction } from "../../utils/reducer/reducer.utils"

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

// (action generator)
// export const setCategories = (categoriesArray) => 
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)

// (action generator)
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)


// Redux thunk action - an async function that have access to dispatch
export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart())

  try {
    const categoriesArray = await getCategoriesAndDocuments()
    dispatch(fetchCategoriesSuccess(categoriesArray))

  } catch (error) {
    dispatch(fetchCategoriesFailed(error))
  }

}

