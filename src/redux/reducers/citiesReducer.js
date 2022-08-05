const initialState = {
    cities : [],
    auxiliar : [],
    filterCity: [],
    city: []
}

const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETCITIES": return {
            ...state,
            cities: action.payload,
            auxiliar: action.payload
        }
        case "GETONECITY":
            return{
                ...state,
                city: action.payload,
                auxiliar: action.payload
            }
        case "FILTERCITY":
            let filter = state.cities.filter(city => city.cityname.toLowerCase().startsWith(action.payload.toLowerCase().trim()))
            console.log(filter)
            return {
                ...state,
                filterCity:filter,
            }
        default:
            return state
    }
}
export default citiesReducer