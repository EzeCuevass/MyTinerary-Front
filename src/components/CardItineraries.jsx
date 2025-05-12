import React, {useState, useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Collapse from '@mui/material/Collapse';
import Comments from "./Comments";
import "../styles/comments.css"
let emoji = "💵"


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));

function CardItineararies({cityid, itinerary}){
    const dispatch = useDispatch()
    const [reload, setReload] = useState()
    const [,setLikes] = useState(itinerary.likes.length)
    
    const user = useSelector(store=>store.userReducer.user)
    
    async function likesDislikes() {
        const like = await dispatch(itinerariesActions.like(itinerary._id))
        setLikes(like)
        setReload(!reload)
    }
    
    useEffect(()=>{
        dispatch(itinerariesActions.findTinFromCity(cityid))
    },[reload,cityid,dispatch])
    
    
    // expand button
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
    return(
        <div className="itinerary" key={itinerary._id}>
                    <div className="itinerary-box-one">
                        <div className="box-photo">
                            <img src={itinerary.personPhoto} alt="itinerary" className="photo-itinerary"/>
                        </div>
                        <div className="person-name">
                            <p>{itinerary.person}</p>
                        </div>
                    </div>
                    <div className="itinerary-box-two">
                        <div className="itinerary-body">
                            <h3>{itinerary.itineraryName}</h3>
                            <p>{emoji.repeat(itinerary.price)}</p>
                            <p>{itinerary.duration}</p>
                            <div className="likes">
                            { user &&
                            user ?
                                (<span className="likeButton" onClick={likesDislikes}>{itinerary.likes.includes(user.id) ?
                                <FavoriteIcon />:
                                <FavoriteBorderIcon />}</span>)
                                : (<FavoriteBorderIcon />)}
                                <p>{itinerary.likes.length}</p>
                            </div>
                            <p>See Activities</p>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon sx={{ color: "white"}}/>
                            </ExpandMore>
                            
                        </div>
                    </div>
                    <div className="itinerary-box-three">
                        {itinerary.hashtags.map(hashtags=>(
                            <p className="hashtag-css" key={hashtags}>{hashtags}</p>
                        ))}
                    </div>
                    <div className="itinerary-box-four">
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <div className="activities-box">
                                { itinerary.activities.length > 0 ?
                                itinerary.activities.map(activities=>(
                                    <div className="activities" key={activities._id}>
                                        <p>{activities.activity}</p>
                                        <div className="activity-box-photo">
                                            <img src={activities.activityphoto} alt="activity"className="activity-photo"/>
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="activities">
                                        <h1>No activities available</h1>
                                    </div>}
                            </div>
                        </Collapse>
                    </div>
                    <div className="comments-box-container">
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                            {
                                itinerary.activities.length>0?
                                <Comments itinerary={itinerary} cityid={cityid}/>
                                :
                                <div></div>
                            }
                    </Collapse>
                        </div>
                </div>
    )
}
export default CardItineararies