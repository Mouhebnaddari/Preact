import axios from "axios";

const runAPI = '/run'
const getHistoryAPI = '/getHistory'
const schedulingAPI ='/scheduling'


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
export async function schedule(job,hostname,value) {
    return axios.get(schedulingAPI,{params:{job,hostname,value}})
        .then(res => res.data)
        .catch(err => console.error(err))
}


