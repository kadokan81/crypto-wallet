import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const IconTextButton = ({ containStyle, icon, lable, onPress }) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				height: 50,
				borderRadius: SIZES.radius,
				backgroundColor: COLORS.white,
				...containStyle,
			}}>
			<Image
				source={icon}
				resizeMode='contain'
				style={{ width: 20, height: 20 }}
			/>
			<Text style={{ marginLeft: SIZES.base, ...FONTS.h3 }}>{lable}</Text>
		</TouchableOpacity>
	);
};

export default IconTextButton;
