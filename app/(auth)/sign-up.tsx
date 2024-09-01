import { CustomButton, InputField, OAuth } from "@/components";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface FormData {
    name: string;
    email: string;
    password: string;
}
const SignUp = () => {
    const [form, setForm] = useState<FormData>({
        email: "",
        name: "",
        password: "",
    });
    const onSignUpPress = () => {};
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                {/* Header  */}
                <View className=" relative w-full h-[250px]">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px]"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create Your Account
                    </Text>
                </View>
                {/* Input Form */}
                <View className="p-5">
                    <InputField
                        label="Name"
                        placeholder="Enter name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value: string) =>
                            setForm({
                                ...form,
                                name: value,
                            })
                        }
                    />
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value: string) =>
                            setForm({
                                ...form,
                                email: value,
                            })
                        }
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        value={form.password}
                        secureTextEntry={true}
                        textContentType="password"
                        onChangeText={(value: string) =>
                            setForm({
                                ...form,
                                password: value,
                            })
                        }
                    />
                    <CustomButton
                        title="Sign Up"
                        onPress={onSignUpPress}
                        className="mt-6"
                    />
                    <OAuth />
                    <Link
                        href={"/sign-in"}
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Already have account?{" "}
                        <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
