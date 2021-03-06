import * as tabActionType from "./tabAction";
const initialState = {
	isTradeModalVisible: false,
};

const tabReduser = (state = initialState, action) => {
	switch (action.type) {
		case tabActionType.SET_TRADE_MODAL_VISIBILITY:
			return {
				...state,
				isTradeModalVisible: action.payload.isVisible,
			};

		default:
			return state;
	}
};
export default tabReduser;
