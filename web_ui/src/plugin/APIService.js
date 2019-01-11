import axios from 'axios';
//const API_URL = '';
const API_URL = 'http://127.0.0.1:9000';

export class APIService{
    instance;
        constructor(){
        axios.defaults.withCredentials = true;
        this.instance = axios.create({
            baseURL: API_URL,
            withCredentials: false,
              headers: {
                "Access-Control-Allow-Origin": "*",
              }
        });
    }

    getClusters() {
        const url = `${API_URL}/api/cluster/`;
        console.info("Get Cluster:" + url);
        return this.instance.get(url).then(response => response.data).catch(reason => console.info(reason));
    }

    getBases(cluster) {
        const url = `${API_URL}/api/cluster/${cluster}/`;
        console.info("Get Base:" + url);
        return this.instance.get(url).then(response => response.data);
    }
    getBaseInfo(cluster, infoBaseId){
        const url = `${API_URL}/api/cluster/${cluster}/${infoBaseId}`;
        console.info("Base info:" + url);
        return this.instance.get(url).then(response => response.data);
    }

    deleteSession(cluster, base, session){
        const url = `${API_URL}/api/cluster/${cluster}/${base}/activeusers`;
        console.info("Delete session: " + url + " Bodu:" + session);
        return this.instance.delete(url, session);
    }

    getSession(cluster, base) {
        const url = `${API_URL}/api/cluster/${cluster}/${base}/activeusers`;
        console.info("Get session: " + url);
        return this.instance.get(url).then(response => response.data);
    }
}
