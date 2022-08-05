import axios from "axios";

const activitiesActions = {
    getActivities: ()=>{
        return async (dispatch, getState) => {
            const res = await axios.get("https://mytinerary-cuevas.herokuapp.com/api/activities")
            console.log(res);
            dispatch({type: "GETACTIVITIES", payload:res.data.response.activities})
        }
    },
    getOneActivity: (id)=>{
        return async (dispatch, getState) => {
            const res = await axios.get(`https://mytinerary-cuevas.herokuapp.com/api/activities/${id}`)
            dispatch({type:"GETONEACTIVITY", payload: res.data.response.activities})
        }
    },
    findActbyTin: (id)=>{
        return async (dispatch, getState) => {
            const res = await axios.get(`https://mytinerary-cuevas.herokuapp.com/api/activities/itineraries/${id}`)
            dispatch({type:"FIND_ACTIVITY_FROM_ITINERARY", payload: res.data.response.activities})
            console.log(res);
        }
    }
}
export default activitiesActions