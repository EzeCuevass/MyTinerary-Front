const initialState = {
    itineraries : [],
    auxiliar : [],
    itinerary: []
}

const itinerariesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETITINERARIES": return {
            ...state,
            itineraries: action.payload,
            auxiliar: action.payload
        }
        case "GETONEITINERARY":
            return{
                ...state,
                itinerary: action.payload,
                auxiliar: action.payload
            }
        case "FIND_ITINERARY_FROM_CITY":
            return {
                ...state,
                itinerary: action.payload,
            }
        default:
            return state
    }
}
export default itinerariesReducer