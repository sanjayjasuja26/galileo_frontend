import axios from 'axios';

export const getIPAddress = async () => {
    try {
        const res = await axios.get('https://geolocation-db.com/json/'); 
        return res.data.IPv4;       
    } catch (error) {
        console.log(error);
    }
}