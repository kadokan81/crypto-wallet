import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Portfolio, Market, Profile } from "../screens";
import { COLORS, icons } from "../constants";
import { TabIcon } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setTradeModalVisibility } from "../stores/tab/tabAction";

const Tab = createBottomTabNavigator();
const TabBarCustomeButton = ({ onPress, children }) => {
	return (
		<TouchableOpacity
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			onPress={onPress}>
			{children}
		</TouchableOpacity>
	);
};

const Tabs = () => {
	const isTradeModalVisible = useSelector(
		(state) => state.tabReduser.isTradeModalVisible
	);
	const dispatch = useDispatch();

	function setTabTradeButtonHandler() {
		dispatch(setTradeModalVisibility(!isTradeModalVisible));
	}

	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				style: {
					height: 70,
					backgroundColor: COLORS.primary,
					borderTopColor: "transparent",
				},
			}}>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					tabBarIcon: ({ focused }) =>
						!isTradeModalVisible && (
							<TabIcon
								focused={focused}
								icon={icons.home}
								lable={"Home"}
							/>
						),
				}}
				listeners={{
					tabPress: (e) => {
						if (isTradeModalVisible) {
							e.preventDefault();
						}
					},
				}}
			/>
			<Tab.Screen
				name='Portfolio'
				component={Portfolio}
				options={{
					tabBarIcon: ({ focused }) =>
						!isTradeModalVisible && (
							<TabIcon
								focused={focused}
								icon={icons.briefcase}
								lable={"Portfolio"}
							/>
						),
				}}
				listeners={{
					tabPress: (e) => {
						if (isTradeModalVisible) {
							e.preventDefault();
						}
					},
				}}
			/>
			<Tab.Screen
				name='Trade'
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={
								isTradeModalVisible ? icons.close : icons.trade
							}
							iconStyle={
								isTradeModalVisible
									? {
											width: 15,
											height: 15,
									  }
									: null
							}
							lable={"Trade"}
							isTrade={true}
						/>
					),
					tabBarButton: (props) => (
						<TabBarCustomeButton
							{...props}
							onPress={() => setTabTradeButtonHandler()}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Market'
				component={Market}
				options={{
					tabBarIcon: ({ focused }) =>
						!isTradeModalVisible && (
							<TabIcon
								focused={focused}
								icon={icons.market}
								lable={"Market"}
							/>
						),
				}}
				listeners={{
					tabPress: (e) => {
						if (isTradeModalVisible) {
							e.preventDefault();
						}
					},
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) =>
						!isTradeModalVisible && (
							<TabIcon
								focused={focused}
								icon={icons.profile}
								lable={"Profile"}
							/>
						),
				}}
				listeners={{
					tabPress: (e) => {
						if (isTradeModalVisible) {
							e.preventDefault();
						}
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
