import axios from "axios";

const runAPI = '/run'
const getHistoryAPI = '/getHistory'


export async function call(job, hostname) {
    return axios.get(runAPI, {params: {job, hostname}})
        .then(res => res.data)
        .catch(err => console.error(err))
}


export async function getHistory() {
    return axios.get(getHistoryAPI)
        .then(res => res.data)
        .catch(err => console.error(err))
}


