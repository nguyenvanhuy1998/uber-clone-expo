import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                }}
            />
        </Tabs>
    );
};

export default Layout;
