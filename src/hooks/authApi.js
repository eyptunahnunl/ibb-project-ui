import axios from 'axios';

axios.interceptors.request.use(
	function (config) {
		const { origin } = new URL(config.url);

		const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
		const token = localStorage.getItem("access-token");

		if (allowedOrigins.includes(origin)) {
		 	config.headers.authorization = token;
	    }

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
export const fetchLogin = async(input) => {
    const {data} = await axios.post("https://localhost:44345/api/auth/login",input);
    
    return data
};

export const fetchRegister = async(input) => {
    const {data} = await axios.post("https://localhost:44345/api/auth/register",input);
    
    return data
};

export const fetchClaims = async (id) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_ENDPOINT}/api/users/getuserclaims?${id}`
	);

	return data;
};


export const updatePark = async (input) => {
    const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/api/isparks/update`,
        input    
	);

    return data;
}

export const fetchMe =async(id) => {
	const {data} =await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/api/`
	)
}
