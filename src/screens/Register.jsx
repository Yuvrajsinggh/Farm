import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const RegisterScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            email: ''
        }
    });

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
        // Handle registration logic here
    };

    return (
        <StyledView className="flex-1 bg-[#9EA199] p-6">
            <StyledView className="w-full">
                {/* Header */}
                <StyledText className="text-3xl font-bold text-white text-center mb-12">
                    {t('register')}
                </StyledText>

                {/* Registration Form */}
                <StyledView className="w-full space-y-4">
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: t('required') }}
                        render={({ field: { onChange, value } }) => (
                            <StyledView>
                                <StyledTextInput
                                    className="bg-white rounded-lg p-4 text-black"
                                    placeholder={t('name')}
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.name && (
                                    <StyledText className="text-red-500 text-sm ml-1">
                                        {errors.name.message}
                                    </StyledText>
                                )}
                            </StyledView>
                        )}
                    />

                    <Controller
                        control={control}
                        name="phone"
                        rules={{
                            required: t('required'),
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: t('invalidPhone')
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <StyledView>
                                <StyledTextInput
                                    className="bg-white rounded-lg p-4 text-black mt-4 mb-4"
                                    placeholder={t('phone')}
                                    keyboardType="phone-pad"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.phone && (
                                    <StyledText className="text-red-500 text-sm ml-1">
                                        {errors.phone.message}
                                    </StyledText>
                                )}
                            </StyledView>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <StyledView>
                                <StyledTextInput
                                    className="bg-white rounded-lg p-4 text-black"
                                    placeholder={t('emailOptional')}
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.email && (
                                    <StyledText className="text-red-500 text-sm ml-1">
                                        {errors.email.message}
                                    </StyledText>
                                )}
                            </StyledView>
                        )}
                    />

                    <StyledTouchableOpacity
                        className="bg-blue-500 text-white p-4 rounded-lg font-bold mt-4"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <StyledText className="text-white text-center">{t('createAccount')}</StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className="text-white text-center mt-4"
                        onPress={() => navigation.navigate('Login')}
                    >
                        <StyledText>{t('alreadyHaveAccount')}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default RegisterScreen;