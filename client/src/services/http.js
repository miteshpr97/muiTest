import axios from "axios";
import Cookies from "js-cookie";

// export const appServiceName = 'http://localhost:5000'; 
export const appServiceName = process.env.REACT_APP_BASE_URL;

// console.log(appServiceName);


class RestfulProvider {
    constructor() {
        this.setCommonHeaders();
    }
    setCommonHeaders = () => {
        // const token = localStorage.getItem("token");
        const token = Cookies.get('token')

        
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set the Authorization header
            axios.defaults.headers.common["x-auth-gl"] = token; // Set the custom header
        }
    };

    makeCall = (url, data, axiosMethod) => {
        const header = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (localStorage.getItem("token")) {
            this.setCommonHeaders();
        }

        return new Promise((resolve, reject) => {
            const response = axiosMethod(`${appServiceName}${url}`, data, header);

            response
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    reject(
                        error
                        // ||
                        // "Server is down, please check after some time !!"
                    );
                });
        });
    };

    put = (url, data) => {
        return this.makeCall(url, data, axios.put);
    };

    post = (url, data) => {
        return this.makeCall(url, data, axios.post);
    };

    get = (url) => {
        return this.makeCall(url, undefined, axios.get);
    };

    delete = (url, request) => {
        return this.makeCall(url, { data: request }, axios.delete);
    };
}

export default new RestfulProvider();