import axios from "axios";
let url = "https://mytinerary-back-production-abd3.up.railway.app/"
// let url = "http://localhost:4000"
const activitiesActions = {
    getActivities: ()=>{
        return async (dispatch, getState) => {
            const res = await axios.get(url+"/api/activities")
            console.log(res);
            dispatch({type: "GETACTIVITIES", payload:res.data.response.activities})
        }
    },
    getOneActivity: (id)=>{
        return async (dispatch, getState) => {
            const res = await axios.get(url+`/api/activities/${id}`)
            dispatch({type:"GETONEACTIVITY", payload: res.data.response.activities})
        }
    },
    findActbyTin: (id)=>{
        return async (dispatch, getState) => {
            const res = await axios.get(url+`/api/activities/itineraries/${id}`)
            dispatch({type:"FIND_ACTIVITY_FROM_ITINERARY", payload: res.data.response.activities})
            console.log(res);
        }
    }
}
export default activitiesActions
