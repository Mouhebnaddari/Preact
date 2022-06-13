import axios from "axios";

const runAPI = '/run'
const getHistoryAPI = '/monitoring'
const schedulingAPI = '/schedule'
const signAPI = '/Signup'
const loginAPI = '/login'
const getUpcomingAPI = '/mon'
const deleteAPI = '/DeleteJob'
const orchestratorAPI='/Orchestrator'


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

export async function sign(username, password, email) {
    const body = {username, password, email}
    return axios.post(signAPI, body)
}

export async function login(password, email) {
    const body = {password, email}
    return axios.post(loginAPI, body)
}

export async function getUpcoming() {
    return axios.get(getUpcomingAPI)
        .then(res => res.data)

}

export async function deleteJob(_id) {
    const body = {_id}
    return axios.delete(deleteAPI, body)
        .then(res => res.data)
}
export async function orchestrator(job,hostname){
    const body ={job,hostname}
    return axios.post(orchestratorAPI,body)
        .then (res=>res.data)
}




