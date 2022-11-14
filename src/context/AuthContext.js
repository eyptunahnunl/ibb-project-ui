import React from "react";
import { useParams } from "react-router-dom";

import { useState, createContext, useEffect, useContext } from 'react';
import { fetchClaims, fetchLogin, fetchMe, fetchRegister } from "../hooks/authApi";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	
 	useEffect(() => {
		(async () => {
			try {

				const me =await fetchMe()


			   
			} catch (e) {
			
			}
		})();
	}, []); 

    const login = (data) => {
		setLoggedIn(true);
		setUser(data);

		
		localStorage.setItem('access-token', data.data.token)

	};

    const values = {
		loggedIn,
		user,
		login,

	};


    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};
const useAuth = () => useContext(AuthContext);
export {AuthProvider, useAuth};