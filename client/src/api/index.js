import axios from 'axios';

export const fetchPositions = async () => {
    const { data } = await axios.get("http://localhost:5000/position");
    return data;
}
