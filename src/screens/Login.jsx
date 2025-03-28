import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/Authcontext';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLoginService } from '../../utilities/AuthServices';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Login = ({ navigation }) => {
    const { t } = useTranslation();
    const { login } = React.useContext(AuthContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        try {
            // Prepare the payload in the required format
            const loginPayload = {
                phone_number: `+${data.phone}`, // Adding '+' prefix as per the required format
                password: data.password
            };

            // Call the login service
            const response = await userLoginService(loginPayload);

            // Store user ID in AsyncStorage
            await AsyncStorage.setItem('userId', response.id.toString());
            console.log("response", response.id);

            // Optionally store the entire user object
            await AsyncStorage.setItem('userData', JSON.stringify({
                id: response.id,
                phone_number: response.phone_number,
                full_name: response.full_name,
                email: response.email,
                is_active: response.is_active,
                is_admin: response.is_admin
            }));

            // Call the login method from AuthContext with necessary data
            login(response.phone_number, data.password);


            // show android toast 
            ToastAndroid.show('Login successful! Welcome ', ToastAndroid.SHORT);



        } catch (error) {
            console.error('Login error:', error);

            // Handle specific error cases
            let errorMessage = 'An error occurred. Please try again.';
            if (error.response?.status === 401) {
                errorMessage = 'Invalid phone number or password';
            } else if (error.response?.status === 400) {
                errorMessage = 'Invalid request format';
            }

            alert("Login failed ");
        }
    };

    return (
        <StyledView className="flex-1 bg-[#447055] p-6">
            <StyledView className="items-center mb-12 mt-10">
                <StyledText className="text-4xl font-bold text-white text-center mt-4">
                    {t('welcome')}
                </StyledText>
                <StyledText className="text-white text-lg opacity-80 mt-2">
                    Sign in to continue
                </StyledText>
            </StyledView>

            <StyledView className="w-full space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-lg">
                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        required: t('required'),
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: t('invalidPhone'),
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <StyledView className="relative mt-4">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="call-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 text-white text-lg"
                                placeholder={t('phoneNumber')}
                                placeholderTextColor="#ffffff80"
                                keyboardType="phone-pad"
                                value={value}
                                onChangeText={onChange}
                            />
                            {errors.phone && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.phone.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledView className="relative mt-4">
                            <StyledView className="absolute left-3 top-4 z-10">
                                <Icon name="lock-closed-outline" size={24} color="#ffffff" />
                            </StyledView>
                            <StyledTextInput
                                className="bg-white/20 rounded-xl p-4 pl-12 pr-12 text-white text-lg"
                                placeholder={t('password')}
                                placeholderTextColor="#ffffff80"
                                secureTextEntry={!showPassword}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            <StyledTouchableOpacity
                                className="absolute right-3 top-4 z-10"
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={24}
                                    color="#ffffff"
                                />
                            </StyledTouchableOpacity>
                            {errors.password && (
                                <StyledText className="text-red-400 text-sm ml-1 mt-1">
                                    {errors.password.message}
                                </StyledText>
                            )}
                        </StyledView>
                    )}
                />

                <StyledTouchableOpacity
                    className="bg-white mt-6 p-4 rounded-xl"
                    onPress={handleSubmit(handleLogin)}
                >
                    <StyledText className="text-blue-900 text-center font-bold text-lg">
                        {t('login')}
                    </StyledText>
                </StyledTouchableOpacity>

                <StyledView className="flex-col gap-4 justify-between mt-6">
                    <StyledTouchableOpacity
                        className="flex-row items-center"
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Icon name="help-circle-outline" size={20} color="#ffffff" />
                        <StyledText className="text-white ml-2">
                            {t('forgotPassword')}
                        </StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        className="flex-row items-center"
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Icon name="person-add-outline" size={20} color="#ffffff" />
                        <StyledText className="text-white ml-2">
                            {t('notRegistered')}
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default Login;