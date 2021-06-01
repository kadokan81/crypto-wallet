import { useFocusEffect } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { connect, useSelector } from "react-redux";
import { MainLayout } from ".";
import { BalanceInfo, Chart, IconTextButton } from "../components";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import dummyData from "../constants/dummy";
import { getCoinMarket, getHoldings } from "../stores/market/marketAction";

const Home = ({ getHoldings, myHoldings, coins, getCoinMarket }) => {
	const [selectedCoin, setSelectedCoin] = useState(null);
	useFocusEffect(
		React.useCallback(() => {
			getHoldings((holdings = dummyData.holdings));
			getCoinMarket();
		}, [])
	);

	const totalWalet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

	const renderWalletInfoSection = () => {
		return (
			<View
				style={{
					paddingHorizontal: 25,
					paddingVertical: 10,
					backgroundColor: COLORS.gray,
					borderBottomLeftRadius: 25,
					borderBottomRightRadius: 25,
				}}>
				<BalanceInfo
					title='You Wallet'
					displayAmount={totalWalet}
					changePet={2.3}
					containerStyle={{}}
				/>
			</View>
		);
	};

	return (
		<MainLayout>
			<View style={{ flex: 1, backgroundColor: COLORS.black }}>
				{renderWalletInfoSection()}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingHorizontal: 20,
					}}>
					<IconTextButton
						icon={icons.send}
						lable='Transfer'
						containStyle={{
							paddingHorizontal: 10,
							flex: 1,
							marginRight: SIZES.padding,
						}}
						onPress={() => console.log("Transfer")}
					/>
					<IconTextButton
						icon={icons.withdraw}
						lable='Withdraw'
						containStyle={{ paddingHorizontal: 20, flex: 1 }}
						onPress={() => console.log("Withdraw")}
					/>
				</View>
				<Chart
					containerStyle={{
						marginTop: SIZES.padding,
					}}
					chartPrices={
						selectedCoin
							? selectedCoin?.sparkline_in_7d?.price
							: coins[0]?.sparkline_in_7d?.price
					}
				/>
				<FlatList
					data={coins}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{
						marginBottom: 30,
						paddingTop: SIZES.padding,
					}}
					ListHeaderComponent={
						<View style={{ marginBottom: SIZES.radius }}>
							<Text style={{ color: COLORS.white, fontSize: 18 }}>
								Top Cryptocurrency
							</Text>
						</View>
					}
					ListHeaderComponentStyle={{
						marginLeft: 50,
						...FONTS.h2,
					}}
					renderItem={({ item }) => {
						const renderColor =
							item.price_change_percentage_7d_in_currency == 0
								? COLORS.lightGray3
								: item.price_change_percentage_7d_in_currency >
								  0
								? COLORS.lightGreen
								: COLORS.red;
						return (
							<TouchableOpacity
								style={{
									padding: 10,
									flexDirection: "row",
								}}
								onPress={() => setSelectedCoin(item)}>
								<View style={{ width: 35 }}>
									<Image
										source={{ uri: item.image }}
										style={{ height: 20, width: 20 }}
									/>
								</View>
								<View stylr={{ flex: 1 }}>
									<Text
										style={{
											color: COLORS.white,
											...FONTS.h3,
										}}>
										{item.name}
									</Text>
								</View>
								<View style={{ flex: 2 }}>
									<Text
										style={{
											color: COLORS.white,
											...FONTS.h3,
											alignSelf: "flex-end",
										}}>
										${item.current_price}
									</Text>
									<Text
										style={{
											alignSelf: "flex-end",
											color: renderColor,
										}}>
										{item.price_change_percentage_7d_in_currency.toFixed(
											2
										)}
										%
									</Text>
								</View>
							</TouchableOpacity>
						);
					}}
					ListFooterComponent={
						<View
							style={{
								marginBottom: 50,
							}}
						/>
					}
				/>
			</View>
		</MainLayout>
	);
};

function mapStateToProps(state) {
	return {
		myHoldings: state.marketReduser.myHoldings,
		coins: state.marketReduser.coins,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getHoldings: (
			holdings,
			currency,
			coinList,
			orderBy,
			sparkline,
			priceChangePerc,
			perPage,
			page
		) => {
			return dispatch(
				getHoldings(
					holdings,
					currency,
					coinList,
					orderBy,
					sparkline,
					priceChangePerc,
					perPage,
					page
				)
			);
		},
		getCoinMarket: (
			currency,
			coinList,
			orderBy,
			sparkline,
			priceChangePerc,
			perPage,
			page
		) => {
			return dispatch(
				getCoinMarket(
					currency,
					coinList,
					orderBy,
					sparkline,
					priceChangePerc,
					perPage,
					page
				)
			);
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
