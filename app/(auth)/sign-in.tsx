import { CustomButton, InputField, OAuth } from "@/components";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

interface FormData {
    email: string;
    password: string;
}
const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [form, setForm] = useState<FormData>({
        email: "",
        password: "",
    });
    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });
            if (signInAttempt.status === "complete") {
                await setActive({
                    session: signInAttempt.createdSessionId,
                });
                router.replace("/(root)/(tabs)/home");
            } else {
                console.log(JSON.stringify(signInAttempt, null, 2));
                Alert.alert("Error", "Login in failed. Please try again.");
            }
        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));
            Alert.alert("Error", error.errors[0].longMessage);
        }
    }, [isLoaded, form]);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
        >
            <View className="flex-1 bg-white">
                {/* Header  */}
                <View className=" relative w-full h-[250px]">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px]"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Welcome 👋
                    </Text>
                </View>
                {/* Input Form */}
                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        textContentType="emailAddress"
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
                        title="Sign In"
                        onPress={onSignInPress}
                        className="mt-6"
                    />
                    <OAuth />
                    <Link
                        href={"/sign-up"}
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Don't have an account?{" "}
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignIn;
