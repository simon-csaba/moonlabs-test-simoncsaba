import axios from "axios";

const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

export const setCurrentUser = decoded => {
    return {
        type: 'SET_CURRENT_USER',
        payload: decoded
    }
};

export const loginUser = (userData, navigate, dispatch) => {
    axios.post('http://localhost:3030/authentication', userData)
        .then(res => {
            const { accessToken, user } = res.data;
            localStorage.setItem('jwtToken', accessToken);
            setAuthToken(accessToken);
            dispatch(setCurrentUser(user));
            navigate('/');
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERRORS',
                payload: err
            })}
        );
};

export const registerUser = (userData, navigate, dispatch) => {
    axios.post('http://localhost:3030/users', userData)
        .then(res => {
            navigate('/login');
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERRORS',
                payload: err
            })}
    );
};

export const logoutUser = (navigate, dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken();
    dispatch(
        {
            type: 'LOUGOUT_USER',
        }
    );
    navigate('/');
}