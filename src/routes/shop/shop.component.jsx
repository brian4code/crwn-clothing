import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import CategoriesPreview from '../categories-preview/categories-preview.component' 
import Category from '../category/category.component'
// import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { fetchCategoriesAsync } from '../../store/categories/category.action'

import './shop.styles.scss'

const Shop = () => {
  const dispatch = useDispatch()

  // get categories mapping as an object from firestore 
  useEffect(() => {
    // const getCategoriesMap = async () => {
    //   const categoryArray = await getCategoriesAndDocuments()
    //   dispatch(setCategories(categoryArray))
    // }

    // getCategoriesMap()

    // Redux thunk action to separate out the async behaviour 
    dispatch(fetchCategoriesAsync())
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop
