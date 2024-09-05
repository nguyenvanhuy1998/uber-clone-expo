import { CustomButton, DriverCard, RideLayout } from "@/components";
import { useDriverStore } from "@/store";
import { router } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

const ConfirmRide = () => {
    const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
    return (
        <RideLayout title="Choose a Driver" snapPoints={['65%, "85%']}>
            <FlatList
                data={drivers}
                renderItem={({ item }) => (
                    <DriverCard
                        item={item}
                        selected={selectedDriver!}
                        setSelected={() =>
                            setSelectedDriver(Number(item.driver_id!))
                        }
                    />
                )}
                ListFooterComponent={() => (
                    <View className="mx-5 mt-10">
                        <CustomButton
                            title="Select Ride"
                            onPress={() => router.push("/(root)/book-ride")}
                        />
                    </View>
                )}
            />
        </RideLayout>
    );
};

export default ConfirmRide;
