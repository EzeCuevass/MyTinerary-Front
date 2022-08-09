import axios from "axios";
let url = "https://mytinerary-back-cuevas.herokuapp.com"
// let url = "http://localhost:4000"

const citiesActions = {
    getCities: ()=>{
        return async (dispatch, getState) => {
            const res = await axios.get(url+"/api/cities")
            dispatch({type: "GETCITIES", payload: res.data.response.cities})
        }
    },
    getOneCity: (id)=>{
        return async (dispatch, getState) => {
            const res = await axios.get(url+`/api/cities/${id}`)
            dispatch({type: "GETONECITY", payload: res.data.response.city})
        }
    },
    filterCities: (inputValue)=>{
        return async (dispatch, getState) => {
            const res = await axios.get(url+"/api/cities")
            dispatch({type: "FILTERCITY", payload:inputValue})
        }
    }
}
export default citiesActions