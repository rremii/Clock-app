import axios from 'axios'

const instanceTime = axios.create({
    withCredentials: false,
    baseURL: `http://worldtimeapi.org/api/`,
    headers: {}
})
const instanceLocation = axios.create({
    withCredentials: false,
    baseURL: `https://api.freegeoip.app/`,
    headers: {}
})
const instanceQoute = axios.create({
    withCredentials: false,
    baseURL: `https://api.quotable.io/`,
    headers: {}
})
export const timeAPI = {
    getTime: (timezone) => {
        return instanceTime.get(`timezone/${timezone}`)
    },
}
export const locationAPI = {
    getLocation: () => {
        return instanceLocation.get(`json/?apikey=6aea65a0-875f-11ec-89c0-5f5cfa00ecd7`)
    },
}
export const qoutesAPI = {
    getQoutes: () => {
        return instanceQoute.get(`random`)
    },
}