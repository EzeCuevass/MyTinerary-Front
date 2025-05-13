import React, {useState} from "react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import commentActions from "../redux/actions/commentsActions"
import AddIcon from "@mui/icons-material/Add"
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Avatar from '@mui/material/Avatar';
import "../styles/comments.css"
// import { useRef } from "react";

function Comments({itinerary, cityid}){
    // console.log(itinerary);
    const [inputText, setInputText] = useState()
    const [modify, setModify] = useState()
    const [reload, setReload] = useState()
    const dispatch = useDispatch()
    // console.log(inputText);
    const user = useSelector(store=>store.userReducer.user)

    // let itineraryId = itinerary._id
    // let textmodify = document.getElementById("textmodify")
    // let textmodify = useRef() 
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
        // textmodify.classList.toggle("visible")
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
    },[reload,cityid,dispatch])
    console.log(itinerary.comments);
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
                                        <Avatar alt="Remy Sharp" src={comments.iduser.photo} />
                                        <p>{comments.iduser.fullname} commments: </p>
                                        <p>{comments.comment}</p>
                                        <p className="date-p">{new Date(comments.date).toLocaleDateString()}</p>
                                    </div>
                            </div>
                        ))
                    :
                        itinerary.comments.map(comments=>
                            (
                            user.id===comments.iduser._id?
                            (
                            <div className="comment" key={comments._id}>
                                {/* <p>{user.}</p> */}
                                {/* <img src={comments.iduser.photo} alt="godines"/> */}
                                <div className="box-comment">
                                    <Avatar alt="Remy Sharp" src={comments.iduser.photo} />
                                    <p>{comments.iduser.fullname} commments: </p>
                                    {/* <p>{comments.comment}</p> */}
                                    <TextField id="standart-basic" defaultValue={comments.comment} onChange={(event) => setModify(event.target.value)} key={comments._id} sx={{
                                                                                                                                                                                    color: "red",
                                                                                                                                                                                }}/>
                                    <p className="date-p">{new Date(comments.date).toLocaleDateString()}</p>
                                    {/* <textarea rows='2' onChange={(event) => setModify(event.target.value)} defaultValue={comments.comment} key={comments._id}/> */}
                                </div>
                                <div className="icons">
                                <EditIcon id={comments._id} onClick={() => toModify(comments)} className="pointer"/>
                                <DeleteIcon id={comments._id} onClick={() => toDelete(comments)} className="pointer"/>
                                </div>
                            </div>
                            ):
                            (<div className="comment" key={comments._id}>
                                {/* <img src={comments.iduser.photo} alt="godines"/> */}
                                <div className="box-comment">
                                    <Avatar alt="Remy Sharp" src={comments.iduser.photo} />
                                    <p>{comments.iduser.fullname} commments: </p>
                                    <p>{comments.comment}</p>
                                    <p className="date-p">{new Date(comments.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            ))):
                            <div>
                                <h1>There are no commentaries, be the first!</h1>
                            </div>
                        
                }
            </div>
            <div className="input-comment">
                <TextField id="standart-basic" label="Comment" onChange={(event) => setInputText(event.target.value)} value={inputText}/>
                <AddIcon onClick={toAdd} className="pointer"/>
            </div>
        </div>
    )
}
export default Comments