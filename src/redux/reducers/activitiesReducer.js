const initialState = {
    activities : [],
    activity : []
}
const activitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETACTIVITIES": return{
            ...state,
            activities: action.payload,
        }
        case "GETONEACTIVITY":
            return{
                ...state,
                activity: action.payload
            }
        case "FIND_ACTIVITY_FROM_ITINERARY":
            return{
                ...state,
                activity: action.payload
            } 
        default:
            return state
    }
}
export default activitiesReducer