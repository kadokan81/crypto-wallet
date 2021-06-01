import React from "react";
import { Image, Text, View } from "react-native";
import { COLORS, FONTS, icons } from "../constants";

const TabIcon = ({ focused, icon, lable, isTrade, iconStyle }) => {
	if (isTrade) {
		return (
			<View
				style={{
					padding: 10,
					alignItems: "center",
					justifyContent: "center",
					width: 60,
					height: 60,
					borderRadius: 30,
					backgroundColor: COLORS.black,
				}}>
				<Image
					source={icon}
					style={{
						width: 30,
						height: 30,
						tintColor: COLORS.white,
						...iconStyle,
					}}
				/>
				<Text
					style={{
						color: COLORS.white,
						...FONTS.h4,
					}}>
					{lable}
				</Text>
			</View>
		);
	} else {
		return (
			<View style={{ alignItems: "center" }}>
				<Image
					source={icon}
					style={{
						width: 30,
						height: 30,
						resizeMode: "contain",
						tintColor: focused ? COLORS.white : COLORS.secondary,
						...iconStyle,
					}}
				/>
				<Text
					style={{
						color: focused ? COLORS.white : COLORS.secondary,
						...FONTS.h4,
					}}>
					{lable}
				</Text>
			</View>
		);
	}
};

export default TabIcon;
