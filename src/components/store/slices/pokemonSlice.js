import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    selectedPokemon: '',
    IVBase: [0, 0, 0, 0, 0],
    EVBase: [0, 0, 0, 0, 0, 0],
    baseStats: [0, 0, 0, 0, 0, 0],
    level: 10
  },
  reducers: {
    
    updateEVBase: (state, action) => {
        let newEVBase = [...(state.EVBase)]
        newEVBase[action.payload.i] = action.payload.val
        state.EVBase = newEVBase
    },
    updateIVBase: (state, action) => {
        let newIVBase = [...(state.IVBase)]

        newIVBase[action.payload.i] = (action.payload.val >= 15 ? 15 : action.payload.val)
        //if we are not directly editing the HP IV, we recalculate it 
        //https://bulbapedia.bulbagarden.net/wiki/Individual_values#Generation_I_and_II
    
        if (action.payload.i !== 0) {
            let bits  = ""
            for (let iter= 1; iter<=4; iter++){
                bits = bits.concat((newIVBase[iter] & 1).toString())
            }
            newIVBase[0] = parseInt(bits, 2)
        }
        state.IVBase = newIVBase
    },
    updateBaseStats: (state, action) => {
        state.baseStats = action.payload
    },
    updateLevel: (state, action) => {
        state.level = action.payload
    },
    updateSelectedPokemon: (state, action) => {
        state.selectedPokemon = action.payload
    }
  },
})

const selectEVBase = state => state.pokemon.EVBase

const selectBaseStats = state => state.pokemon.baseStats
    
const selectIVBase = state => state.pokemon.IVBase

const selectLevel = state => state.pokemon.level

export {selectEVBase, selectBaseStats, selectIVBase, selectLevel}

// Action creators are generated for each case reducer function
export const { updateSelectedPokemon, updateEVBase, updateIVBase, updateBaseStats, updateLevel, updateActualStats } = pokemonSlice.actions



export default pokemonSlice.reducer