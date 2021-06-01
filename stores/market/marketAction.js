import axios from "axios";

export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_ERROR = "GET_HOLDINGS_ERROR";
export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_ERROR = "GET_COIN_MARKET_ERROR";

export const getHoldingsBegin = () => ({
	type: GET_HOLDINGS_BEGIN,
});

export const getHoldingsSucess = (myHoldings) => ({
	type: GET_HOLDINGS_SUCCESS,
	payload: { myHoldings },
});

export const getHoldingsError = (error) => ({
	type: GET_HOLDINGS_ERROR,
	payload: { error },
});

export function getHoldings(
	holdings = [],
	currency = "usd",
	orderBy = "market_cap_desc",
	sparkline = true,
	priceChangePerc = "7d",
	perPage = 10,
	page = 1
) {
	return (dispatch) => {
		dispatch(getHoldingsBegin());
		let ids = holdings
			.map((item) => {
				return item.id;
			})
			.join(",");

		let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}
        `;

		return axios({
			url: apiUrl,
			method: "GET",
			header: {
				Accept: "application/json",
			},
		})
			.then((response) => {
				if (response.status == 200) {
					let myHoldings = response.data.map((item) => {
						let coin = holdings.find((a) => a.id == item.id);

						let price7d =
							item.current_price /
							(1 + item.price_change_percentage_7d_in_currency);

						return {
							id: item.id,
							symbol: item.symbol,
							name: item.name,
							image: item.image,
							current_price: item.current_price,
							qty: coin.qty,
							total: coin.qty * item.current_price,
							price_change_percentage_7d_in_currency:
								item.price_change_percentage_7d_in_currency,
							holding_value_change_7d:
								(item.current_price - price7d) * coin.qty,
							sparkline_in_7d: {
								value: item.sparkline_in_7d.price.map(
									(price) => {
										return price * coin.qty;
									}
								),
							},
						};
					});

					dispatch(getHoldingsSucess(myHoldings));
				} else {
					dispatch(getHoldingsError(response.data));
				}
			})
			.catch((error) => {
				dispatch(getHoldingsError(error));
			});
	};
}

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}

export const getCoinMarketStart = () => ({
	type: GET_COIN_MARKET_BEGIN,
});

export const getCoinMarketSuccess = (coins) => ({
	type: GET_COIN_MARKET_SUCCESS,
	payload: { coins },
});

export const getCoinMarketError = (error) => ({
	type: GET_COIN_MARKET_ERROR,
	payload: { error },
});

export function getCoinMarket(
	currency = "usd",
	orderBy = "market_cap_desc",
	sparkline = true,
	priceChangePerc = "7d",
	perPage = 10,
	page = 1
) {
	return (dispatch) => {
		dispatch(getCoinMarketStart());

		let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;
		return axios({
			url: apiUrl,
			method: "GET",
			header: {
				Accept: "aplication/json",
			},
		})
			.then((response) => {
				if (response.status == 200) {
					dispatch(getCoinMarketSuccess(response.data));
				} else {
					dispatch(getCoinMarketError(response.data));
				}
			})
			.catch((error) => {
				dispatch(getCoinMarketError(error));
			});
	};
}
