import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { ReactNode, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "@/constants";
import { router } from "expo-router";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Map from "./Map";

type Props = {
    children?: ReactNode;
    title?: string;
    snapPoints: string[];
};

const RideLayout = ({ children, title, snapPoints }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    return (
        <GestureHandlerRootView>
            <View className="flex-1 bg-white">
                <View className="flex flex-col h-screen bg-blue-500">
                    <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                                <Image
                                    source={icons.backArrow}
                                    resizeMode="contain"
                                    className="w-6 h-6"
                                />
                            </View>
                        </TouchableOpacity>
                        <Text className="text-xl font-JakartaBold ml-5">
                            {title || "Go back"}
                        </Text>
                    </View>
                    <Map />
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints || ["40%", "85%"]}
                    index={0}
                >
                    <BottomSheetScrollView
                        style={{
                            flex: 1,
                            padding: 20,
                        }}
                    >
                        {children}
                    </BottomSheetScrollView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
};

export default RideLayout;
