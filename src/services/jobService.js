import axios from "axios";

const runAPI = '/run'
const getHistoryAPI = '/monitoring'
const schedulingAPI = '/schedule'
const getUpcomingAPI = '/upcoming'
const deleteAPI = '/DeleteJob'
const orchestratorAPI = '/Orchestrator'

axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;

export async function call(job, hostname) {
    return axios.get(runAPI, {params: {job, hostname}})
        .then(res => res.data)
}

export async function getHistory() {
    return axios.get(getHistoryAPI)
        .then(res => res.data)
}

export async function schedule(job, hostname, cronExpression) {
    const body = {job, hostname, cronExpression}
    return axios.post(schedulingAPI, body)
}

export async function getUpcoming() {
    return axios.get(getUpcomingAPI)
        .then(res => res.data)

}

export async function deleteJob(id) {
    return axios.delete(deleteAPI, {params: {id}})
        .then(res => res.data)
}

export async function orchestrator(data) {
    return axios.post(orchestratorAPI, data)
        .then(res => res.data)
}




