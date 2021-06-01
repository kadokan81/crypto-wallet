import React from "react";
import { Image, Text, View } from "react-native";
import { COLORS, FONTS, icons } from "../constants";

const BalanceInfo = ({ title, displayAmount, changePet, containerStyle }) => {
	return (
		<View style={{ ...containerStyle }}>
			<Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>
				{title}
			</Text>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginBottom: 5,
				}}>
				<Text
					style={{
						color: COLORS.lightGray3,
						...FONTS.h3,
						marginRight: 10,
					}}>
					$
				</Text>
				<Text
					style={{
						color: COLORS.white,
						...FONTS.h2,
						marginRight: 10,
					}}>
					{displayAmount.toFixed(2)}
				</Text>
				<Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>
					USD
				</Text>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				{changePet != 0 && (
					<Image
						source={icons.upArrow}
						style={{
							marginRight: 5,
							width: 10,
							height: 10,
							tintColor:
								changePet > 0 ? COLORS.lightGreen : COLORS.red,
							transform:
								changePet > 0
									? [{ rotate: "45deg" }]
									: [{ rotate: "135deg" }],
						}}
					/>
				)}
				<Text
					style={{
						color: changePet > 0 ? COLORS.lightGreen : COLORS.red,
						...FONTS.h3,
					}}>
					{changePet.toFixed(2)}%
				</Text>
				<Text style={{ color: COLORS.lightGray3, marginLeft: 10 }}>
					7d change
				</Text>
			</View>
		</View>
	);
};

export default BalanceInfo;
