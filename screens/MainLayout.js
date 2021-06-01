import React from "react";
import { Animated, View } from "react-native";
import { useSelector } from "react-redux";
import { IconTextButton } from "../components";
import { COLORS, icons, SIZES } from "../constants";

const MainLayout = ({ children }) => {
	const isTradeModalVisible = useSelector(
		(state) => state.tabReduser.isTradeModalVisible
	);

	const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		if (isTradeModalVisible) {
			Animated.timing(modalAnimatedValue, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}).start();
		} else {
			Animated.timing(modalAnimatedValue, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false,
			}).start();
		}
	}, [isTradeModalVisible]);

	const modalY = modalAnimatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [SIZES.height, SIZES.height - 280],
	});
	return (
		<View style={{ flex: 1 }}>
			{children}

			{/* Dim background */}
			{isTradeModalVisible && (
				<Animated.View
					style={{
						position: "absolute",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						backgroundColor: COLORS.transparentBlack,
					}}
					opacity={modalAnimatedValue}
				/>
			)}
			{/* Modall */}
			<Animated.View
				style={{
					position: "absolute",
					left: 0,
					top: modalY,
					width: "100%",
					padding: SIZES.padding,
					backgroundColor: COLORS.primary,
				}}>
				<IconTextButton
					lable='Transfer'
					onPress={() => console.log("Transfer")}
					icon={icons.send}
				/>
				<IconTextButton
					lable='Withdraw'
					onPress={() => console.log("Withdraw")}
					icon={icons.withdraw}
					containStyle={{
						marginTop: SIZES.base,
					}}
				/>
			</Animated.View>
		</View>
	);
};

export default MainLayout;
