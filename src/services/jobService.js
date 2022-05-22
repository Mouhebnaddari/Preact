import axios from "axios";

const runAPI = '/run'
const getHistoryAPI = '/getHistory'
const schedulingAPI = '/schedule'

export async function call(job, hostname) {
    return axios.get(runAPI, {params: {job, hostname}})
        .then(res => res.data)
}

export async function getHistory() {
    return axios.get(getHistoryAPI)
        .then(res => res.data)
}

export async function schedule(job, hostname, cron) {
    const body = {job, hostname, cron}
    return axios.post(schedulingAPI, body)
}


