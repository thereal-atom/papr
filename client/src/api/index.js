import axios from 'axios';

export const fetchPositions = async () => {
    const { data } = await axios.get("http://localhost:5000/position");
    return data;
}
export const fetchListData = async () => {
    const { data } = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/24hr`);
    let prices = [];
    data.forEach(filter => {
        //if(filter.symbol == pair) setPairPrice(filter.lastPrice);
        if( filter.lastPrice > 0.01 && (filter.priceChangePercent > 0.25 || filter.priceChangePercent < -0.25) && filter.quoteVolume > 1000000 && !filter.symbol.includes('_')) prices.push(filter)
    })
    return prices;
}
