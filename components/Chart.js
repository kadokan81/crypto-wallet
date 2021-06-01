import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import {
	ChartDot,
	ChartPath,
	ChartPathProvider,
	ChartXLabel,
	ChartYLabel,
	monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import moment from "moment";
import { COLORS, FONTS, SIZES } from "../constants";

export const { width: WSIZE } = Dimensions.get("window");

const Chart = ({ chartPrices, containerStyle }) => {
	const starUnixTimeStamp = moment().subtract(7, "day").unix();
	let data = chartPrices
		? chartPrices.map((item, index) => {
				return {
					x: starUnixTimeStamp + (index + 1) * 3600,
					y: item,
				};
		  })
		: [];
	const points = monotoneCubicInterpolation({ data, range: 40 });

	const formatUsd = (value) => {
		"worklet";
		if (value == "") {
			return "";
		}
		return `$${Number(value).toFixed(2)}`;
	};

	const formatDateTime = (value) => {
		"worklet";
		if (value == "") {
			return "";
		}

		var selectedDate = new Date(value * 1000);
		let date = `0${selectedDate.getDate() + 1}`.slice(-2);
		let month = `0${selectedDate.getMonth() + 1}`.slice(-2);
		return `${date} / ${month}`;
	};
	return (
		<View style={{ backgroundColor: "black", ...containerStyle }}>
			<ChartPathProvider data={{ points, smoothingStrategy: "bezier" }}>
				<ChartPath
					height={150}
					stroke={COLORS.lightGreen}
					width={SIZES.width}
					strokeWidth={2}
				/>
				<ChartDot>
					<View
						style={{
							position: "absolute",
							height: 80,
							width: 80,
							alignItems: "center",
							backgroundColor: COLORS.transparentBlack,
						}}>
						{/* DOT */}
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								width: 25,
								height: 25,
								borderRadius: 15,
								backgroundColor: COLORS.white,
							}}>
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
									width: 15,
									height: 15,
									borderRadius: 15,
									backgroundColor: COLORS.lightGreen,
								}}></View>
						</View>
						<ChartYLabel
							format={formatUsd}
							style={{ color: COLORS.white, ...FONTS.body5 }}
						/>
						<ChartXLabel
							format={formatDateTime}
							style={{
								marginTop: 3,
								color: COLORS.lightGray3,
								...FONTS.body5,
							}}
						/>
					</View>
				</ChartDot>
			</ChartPathProvider>
		</View>
	);
};
export default Chart;
