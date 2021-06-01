import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import RootReduser from "./stores/RootReduser";
import thunk from "redux-thunk";

const Stack = createStackNavigator();

const store = createStore(RootReduser, applyMiddleware(thunk));

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName={"MainLayout"}>
					<Stack.Screen name='MainLayout' component={Tabs} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
