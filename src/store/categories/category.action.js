import { all, call, takeLatest, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = (categoriesArray) => 
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)