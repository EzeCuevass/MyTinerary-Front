import axios from "axios";

const commentActions = {

addComment: (comment) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
    if (comment.comments.comment !== "") {
        const res = await axios.post(`https://mytinerary-back-cuevas.herokuapp.com/api/comments`, { comment }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        dispatch({
        type: "MESSAGE",
        payload: {
            view: true,
            message: res.data.message,
            success: res.data.success
        }
        })
        console.log(res);
        return res
    }
    else {
        dispatch({
        type: "MESSAGE",
        payload: {
            view: true,
            message: "Add a new comment",
            success: false
        }
        })
    }
    }

},
modifyComment: (comment) => {
    const token = localStorage.getItem('token')
    return async (dispatch, getState) => {
        const res = await axios.put(`https://mytinerary-back-cuevas.herokuapp.com/api/comments`, { comment }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: "MESSAGE",
            payload: {
                view: true,
                message: res.data.message,
                success: res.data.success
            }
        })
    return res
    }
},
deleteComment: (id) => {
    const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post(`https://mytinerary-back-cuevas.herokuapp.com/api/comments/${id}`,{},
            {headers: {'Authorization': "Bearer "+token}}
        )
        dispatch({
            type: 'MESSAGE', 
            payload: {view: true, 
                message: res.data.message, 
                success: res.data.success}
        })
        return res.data.response
    }
}
}

export default commentActions;