import axios from "axios";

const runAPI = '/run'


export default async function call(job, hostname) {
    return axios.get(runAPI, {params: {job, hostname}})
        .then(res => res.data)
        .catch(err => console.error(err))
}

