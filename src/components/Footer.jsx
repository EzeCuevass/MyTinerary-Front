import React from "react";
import "../styles/footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
function Footer(){
    return (
        <div className="Footer">
            <div className="Texts">
                <h1>MyTinerary</h1>
                <div className="subfooter">
                    <div className="logos-box">
                        <InstagramIcon />
                        <FacebookIcon />
                    </div>
                    <div className="copyright">
                        <p>Copyright © - MYTINERARY All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer