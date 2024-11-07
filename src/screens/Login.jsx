import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { t } = useTranslation();

    const handleLogin = () => {
        console.log('Login attempted with:', email, password);
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
                    <StyledTextInput
                        className="bg-white rounded-lg p-4 text-black"
                        placeholder={t('email')}
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <StyledTextInput
                        className="bg-white rounded-lg p-4 text-black"
                        placeholder={t('password')}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Login Button */}
                    <StyledTouchableOpacity
                        className="bg-blue-500 text-white p-4 rounded-lg font-bold"
                        onPress={handleLogin}
                    >
                        <StyledText className="text-white text-center">{t('login')}</StyledText>
                    </StyledTouchableOpacity>

                    {/* Additional Options */}
                    <StyledView className="flex-row justify-between mt-4">
                        <StyledTouchableOpacity onPress={() => console.log('Forgot password')}>
                            <StyledText className="text-white">{t('forgotPassword')}</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <StyledText className="text-white">{t('notRegistered')}</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default Login;