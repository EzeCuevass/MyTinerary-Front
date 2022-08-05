import React, {useState} from "react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import commentActions from "../redux/actions/commentsActions"
import AddIcon from "@mui/icons-material/Add"
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import "../styles/comments.css"

function Comments({itinerary, cityid}){
    // console.log(itinerary);
    const [comments, setComments] = useState([])
    const [inputText, setInputText] = useState()
    const [modify, setModify] = useState()
    const [reload, setReload] = useState()
    const dispatch = useDispatch()
    // console.log(inputText);
    const user = useSelector(store=>store.userReducer.user)

    // let itineraryId = itinerary._id
    var textmodify = document.getElementById("textmodify")
    async function toAdd(event) {
        const commentData = {
            itineraryId: itinerary._id,
            comments: {
                comment: inputText,
                userid: user.id
            },
        }
        await dispatch(commentActions.addComment(commentData))
        setInputText("")
        setReload(!reload)
    }
    async function toModify(comments){
        textmodify.classList.toggle("visible")
        const commentData = {
            commentId : comments._id,
            comment: modify
            }
        await dispatch(commentActions.modifyComment(commentData))
            setReload(!reload)
    }
    async function toDelete(comments){
        await dispatch(commentActions.deleteComment(comments._id))
        setReload(!reload)
    }

    useEffect(()=>{
        dispatch(itinerariesActions.findTinFromCity(cityid))
    },[reload])
    console.log(user);
    return(
        <div className="comments-box">
            <div className="comments-container">
                {
                    user==null?
                    <h1>Go to sign in for comment about the itineraries!</h1>:
                    <div></div>
                }
                {itinerary.comments.length>0?
                    user==null?
                        itinerary.comments.map(comments=>(
                            <div className="comment" key={comments._id}>
                                    <div className="box-comment">
                                        <p className="date-p">{new Date(comments.date).toUTCString()}</p>
                                        <p>{comments.comment}</p>
                                    </div>
                            </div>
                        ))
                    :
                        itinerary.comments.map(comments=>
                            (
                            user.id==comments.iduser?
                            (
                            <div className="comment" key={comments._id}>
                                {/* <p>{user.}</p> */}
                                {/* <img src={comments.iduser.photo} alt="godines"/> */}
                                <div className="box-comment">
                                    <p className="date-p">{new Date(comments.date).toUTCString()}</p>
                                    <p>{comments.comment}</p>
                                    <textarea rows='2' onChange={(event) => setModify(event.target.value)} defaultValue={comments.comment} id="textmodify" key={comments._id}/>
                                </div>
                                <div>
                                <EditIcon id={comments._id} onClick={() => toModify(comments)} />
                                <DeleteIcon id={comments._id} onClick={() => toDelete(comments)} />
                                </div>
                            </div>
                            ):
                            (<div className="comment" key={comments._id}>
                                {/* <img src={comments.iduser.photo} alt="godines"/> */}
                                <div className="box-comment">
                                    <p className="date-p">{new Date(comments.date).toUTCString()}</p>
                                    <p>{comments.comment}</p>
                                </div>
                            </div>
                            ))):
                            <div>
                                <h1>There are no commentaries, be the first!</h1>
                            </div>
                        
                }
            </div>
            <div className="input-comment">
                <TextField id="standard-basic" label="Comment" variant="standard" onChange={(event) => setInputText(event.target.value)} value={inputText}/>
                <AddIcon onClick={toAdd}  />
            </div>
        </div>
    )
}
export default Comments