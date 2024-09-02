import { CustomButton, InputField, OAuth } from "@/components";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

interface FormData {
    name: string;
    email: string;
    password: string;
}
interface VerifyForm {
    state: "default" | "success" | "pending" | "failed";
    error: string;
    code: string;
}
const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [verification, setVerification] = useState<VerifyForm>({
        state: "default",
        error: "",
        code: "",
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [form, setForm] = useState<FormData>({
        email: "",
        name: "",
        password: "",
    });
    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setVerification({
                ...verification,
                state: "pending",
            });
        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));
            Alert.alert("Error", error.errors[0].longMessage);
        }
    };
    const onPressVerify = async () => {
        if (!isLoaded) return;
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: verification.code,
                }
            );
            if (completeSignUp.status === "complete") {
                // fetch API chưa làm
                await setActive({
                    session: completeSignUp.createdSessionId,
                });
                setVerification({
                    ...verification,
                    state: "success",
                });
            } else {
                setVerification({
                    ...verification,
                    error: "Verification failed. Please try again.",
                    state: "failed",
                });
            }
        } catch (error: any) {
            setVerification({
                ...verification,
                error: error.errors[0].longMessage,
                state: "failed",
            });
        }
    };
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
                        autoCapitalize="none"
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
            <ReactNativeModal
                isVisible={verification.state === "pending"}
                onModalHide={() => {
                    if (verification.state === "success") {
                        setShowSuccessModal(true);
                    }
                }}
            >
                <View className="bg-white px-7 py-9 rounded-2xl min-h[300px]">
                    <Text className="font-JakartaExtraBold text-2xl mb-2">
                        Verification
                    </Text>
                    <Text className="font-Jakarta mb-5">
                        We've sent a verification code to {form.email}
                    </Text>
                    <InputField
                        label="Code"
                        icon={icons.lock}
                        placeholder="12345"
                        value={verification.code}
                        keyboardType="numeric"
                        onChangeText={(code: string) =>
                            setVerification({
                                ...verification,
                                code,
                            })
                        }
                    />
                    {verification.error && (
                        <Text className="text-red-500 text-sm mt-1">
                            {verification.error}
                        </Text>
                    )}
                    <CustomButton
                        title="Verify Email"
                        onPress={onPressVerify}
                        className="mt-5 bg-success-500"
                    />
                </View>
            </ReactNativeModal>
            <ReactNativeModal isVisible={showSuccessModal}>
                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                    <Image
                        source={images.check}
                        className="w-[110px] h-[110px] mx-auto my-5"
                    />
                    <Text className="text-3xl font-JakartaBold text-center">
                        Verified
                    </Text>
                    <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                        You have successfully verified your account
                    </Text>
                    <CustomButton
                        title="Browser Home"
                        onPress={() => {
                            setShowSuccessModal(false);
                            router.push("/(root)/(tabs)/home");
                        }}
                        className="mt-5"
                    />
                </View>
            </ReactNativeModal>
        </ScrollView>
    );
};

export default SignUp;
