import React from 'react';
import { View, Text, Button } from 'react-native';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';  // Import the hook from react-i18next
const StyledView = styled(View);
const StyledText = styled(Text);

const Register = ({ navigation }) => {
    const { t } = useTranslation();  // Access translation function
    return (
        <StyledView className="flex-1 justify-center items-center">
            <StyledText className="text-black mb-5">{t('registerScreen')}</StyledText>
            <Button
                title={t('alreadyRegistered')}
                onPress={() => navigation.navigate('Login')}
                color="#841584"
            />
        </StyledView>
    );
};

export default Register;