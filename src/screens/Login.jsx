import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/Authcontext';
import { useForm, Controller } from 'react-hook-form';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Login = ({ navigation }) => {
    const { t } = useTranslation();
    const { login } = React.useContext(AuthContext);

    const { control, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        console.log('Login attempted with:', data.email, data.password);
        login(data.email, data.password); // Set authentication as true
    };

    return (
        <StyledView className="flex-1 bg-[#9EA199] p-6">
            <StyledView className="w-full">
                {/* Header */}
                <StyledText className="text-3xl font-bold text-white text-center mb-12">
                    {t('welcome')}
                </StyledText>

                {/* Login Form */}
                <StyledView className="w-full space-y-4">
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <StyledTextInput
                                    className="bg-black rounded-lg p-4 text-black"
                                    placeholder={t('email')}
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.email && (
                                    <StyledText className="text-red-500 text-sm ml-1">
                                        {errors.email.message}
                                    </StyledText>
                                )}
                            </>
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
                            <>
                                <StyledTextInput
                                    className="bg-black mt-4 rounded-lg p-4 text-black"
                                    placeholder={t('password')}
                                    secureTextEntry={true}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.password && (
                                    <StyledText className="text-red-500 text-sm ml-1">
                                        {errors.password.message}
                                    </StyledText>
                                )}
                            </>
                        )}
                    />

                    {/* Login Button */}
                    <StyledTouchableOpacity
                        className="bg-blue-500 text-black p-4 rounded-lg font-bold"
                        onPress={handleSubmit(handleLogin)}
                    >
                        <StyledText className="text-white text-center">{t('login')}</StyledText>
                    </StyledTouchableOpacity>

                    {/* Additional Options */}
                    <StyledView className="flex-row justify-between mt-4">
                        <StyledTouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <StyledText className="text-black">{t('forgotPassword')}</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <StyledText className="text-black">{t('notRegistered')}</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default Login;