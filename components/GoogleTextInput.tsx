import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY; // Cần phải thanh toán bill mới có google api key
const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress,
}: GoogleInputProps) => {
    return (
        <View
            className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
        >
            <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder="Search"
                debounce={200}
                styles={{
                    textInputContainer: {
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        marginHorizontal: 20,
                        position: "relative",
                        shadowColor: "#d4d4d4",
                    },
                    textInput: {
                        backgroundColor: textInputBackgroundColor
                            ? textInputBackgroundColor
                            : "white",
                        fontSize: 16,
                        fontWeight: "600",
                        marginTop: 5,
                        width: "100%",
                        borderRadius: 200,
                    },
                    listView: {
                        backgroundColor: textInputBackgroundColor
                            ? textInputBackgroundColor
                            : "white",
                        position: "relative",
                        top: 0,
                        width: "100%",
                        borderRadius: 10,
                        shadowColor: "#d4d4d4",
                        zIndex: 99,
                    },
                }}
                onPress={(data, details = null) => {
                    handlePress({
                        latitude: 10.773831195356284, // details?.geometry.location.lat!,
                        longitude: 106.70137407148702, // details?.geometry.location.lng!,
                        address:
                            "122 Pasteur, Bến Nghé, Quận 1, Hồ Chí Minh, Việt Nam", //data.description,
                    });
                }}
                query={{
                    key: googlePlacesApiKey,
                    language: "en",
                }}
                renderLeftButton={() => (
                    <TouchableOpacity
                        className="justify-center items-center w-6 h-6"
                        onPress={() => {
                            handlePress({
                                latitude: 10.773831195356284, // details?.geometry.location.lat!,
                                longitude: 106.70137407148702, // details?.geometry.location.lng!,
                                address:
                                    "122 Pasteur, Bến Nghé, Quận 1, Hồ Chí Minh, Việt Nam", //data.description,
                            });
                        }}
                    >
                        <Image
                            source={icon ? icon : icons.search}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
                textInputProps={{
                    placeholderTextColor: "gray",
                    placeholder: initialLocation ?? "Where do you want to go?",
                }}
            />
        </View>
    );
};

export default GoogleTextInput;
