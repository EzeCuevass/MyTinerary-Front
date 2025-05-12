import React, { useEffect, useCallback } from 'react';
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import userActions from '../redux/actions/userActions';
import { useNavigate } from "react-router-dom";

function GoogleSignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCallback = useCallback(async (res) => {
        const userObject = jwt_decode(res.credential);
        let response = await dispatch(userActions.signIn({
            email: userObject.email,
            password: userObject.sub,
            from: "Google Sign In"
        }));
        if (response.data.success) {
            navigate("/");
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        try {
            /* global google */
            const gButton = document.getElementById("gButton");
            if (window.google) {
                google.accounts.id.initialize({
                    client_id: "720582080896-315clarihnbjgmcm0gpdc8j9p8uqtkcv.apps.googleusercontent.com",
                    callback: handleCallback
                });
                google.accounts.id.renderButton(
                    gButton,
                    { theme: "outline", size: "medium", text: 'signup_with', locale: "en-IN" }
                );
            } else {
                console.error("Google SDK not loaded");
            }
        } catch (error) {
            console.error("Error initializing Google Sign-In:", error);
        }
    }, [handleCallback]); // Incluye handleCallback como dependencia

    return (
        <div>
            <div className="buttons" id='gButton'></div>
        </div>
    );
}

export default GoogleSignIn;