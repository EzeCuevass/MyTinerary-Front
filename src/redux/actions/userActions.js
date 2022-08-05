import axios from "axios";
const userActions = {
    signUp: (userData) => {
        return async(dispatch, getState) => {
            try {
                const res = await axios.post("https://mytinerary-cuevas.herokuapp.com/api/auth/signUp",{userData})
                dispatch({type: "MESSAGE",
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                console.log(res);
                return res
            } catch(error){
                console.log(error);
            }
        }
    },
    signIn: (logedUser) => {
        // console.log(logedUser)
        try {
            return async (dispatch, getState) => {
            const res = await axios.post("https://mytinerary-cuevas.herokuapp.com/api/auth/signIn",{logedUser})
            // console.log(res)
            if (res.data.success) {
                // console.log(res.data.response);
                localStorage.setItem("token", res.data.response.token)
                dispatch({type:"USER", payload: res.data.response.userData})
            } else {
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    },
                })
            }
            return res
        }} catch (error){
            console.log(error);
        }
        
    },
    signOut: () => {
        return async (dispatch, getState) => {
            localStorage.removeItem("token")
            dispatch({type:"USER", payload:null})
        }
    },
    verifyToken: (token) => {
        // console.log(token);
        return async (dispatch, getState) => {
            await axios.get("https://mytinerary-cuevas.herokuapp.com/api/auth/signInToken", {headers:{'Authorization': 'Bearer ' + token}})
            .then(user=>{if (user.data.success){
                // console.log(user);
                dispatch({type:"USER",payload:user.data.response})
                dispatch({type:"MESSAGE",
                            payload: {
                                view:true,
                                message:user.data.message,
                                success:user.data.success
                            }})
                            // console.log("lol");
            }else{localStorage.removeItem("token")
            console.log("lol2")}
        }
        ).catch(error=>{
            console.log("lol");
            if (error.response.status === 401)
                dispatch({type:"MESSAGE",
                            payload:{
                                view:true,
                                message:"Please, sign in again",
                                success: false,
                            }})
            localStorage.removeItem("token")
        })
        }
    }
}

export default userActions
