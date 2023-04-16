import { createContext, useState, useEffect } from "react"
// import SHOP_DATA from '../shop-data.js'

import {addCollectionAndDocuments, getCategoriesAndDocuments} from '../utils/firebase/firebase.utils.js'

export const CategoriesContext = createContext({
  categoriesMap: {},
})


export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  // use this one-off function to import initial data to firestore 
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  //   console.log("uploaded data to firestore")
  // }, [])

  // get categories mapping as an object from firestore 
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }

    getCategoriesMap()
  }, [])

  const value = { categoriesMap }
  return <CategoriesContext.Provider value={value} >
    {children}
  </CategoriesContext.Provider>
}
