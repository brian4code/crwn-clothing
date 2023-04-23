import { createSelector } from 'reselect'

// Memoization with impoted reselect library

// Selector should contain all the business logic (ie. data transform)

const selectCategoryReducer = (state) => state.categories
//  function returns the categories reducer

// create a memoized selector 
export const selectCategories = createSelector(
  [selectCategoryReducer],       // Array of input selector 
  // determine if there is any change to categories reducer value
  // if not change, use the memoized value and skip below processing 

  (categoriesSlice) => categoriesSlice.categories   // output selector
)                    // fucntion to extract the categories Array


// create another memoized selector 
export const selectCategoriesMap = createSelector(
  [selectCategories],           // Array of input selector 
  // determine if there is any change to categories Array by reference

  (categories) => categories.reduce((acc, category) => {
    const {title, items} = category
    acc[title.toLowerCase()] = items
    return acc
  }, {})
) 

  // a new categoriesMap object is created, thus causing re-render
