import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './slices/pokemonSlice'
/* eslint-disable no-underscore-dangle */

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },/* preloadedState, */
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})
 /* eslint-enable */