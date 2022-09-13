import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action"
// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
    //options:
    //null => anyone can
    //true => login can
    //false => login cant
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                //not login
                if (!response.payload.isAuth) {
                    if (option) {
                        window.location.href = '/login'
                    }
                } else {
                    //login
                    if (adminRoute && !response.payload.isAdmin) {
                        window.location.href = '/'
                    } else {
                        if (option === false) {
                            window.location.href = '/'
                        }
                    }
                }
            })
        })

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}