import axios from "axios";

const setSurveys = (survey) => {
    return {
        type: 'FETCH_SURVEYS',
        payload: survey,
    }
}

export const fetchSurveys = (dispatch, userId) => {
    axios.get(`http://localhost:3030/surveys?userId=${userId}`).then((res) => {
        dispatch(setSurveys(res.data));
    }).catch((err) => {
        console.log(err);
    });
}

export const submitSurvey = (navigate, values) => {
    
    const payload = {
        name: values.content.split("\n")[0],
        content: values.content.split("\n").slice(1).join("\n"),
    }
    
    axios.post("http://localhost:3030/surveys", payload).then((res) => {
        navigate("/surveys");
    }).catch((err) => {
        console.log(err);
    }
    );
};

export const deleteSurvey = (navigate, id) => {
    axios.delete(`http://localhost:3030/surveys/${id}`).then((res) => {
        navigate("/");
    }
    ).catch((err) => {
        console.log(err);
    }
    );
};

