import Axios from 'axios'

const setAuthToken = (token) => {
    if (token) {
        const extracted = token.split(" ")[1]
        Axios.defaults.headers.common['x-auth-token'] = extracted
    } else {
        delete Axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken