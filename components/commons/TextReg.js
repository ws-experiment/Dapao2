import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TextReg = props => {
    return (
        <Text {...props} style={{...styles.font, ...props.style}}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    font: {
        fontFamily: 'font-regular'
    }
});

export default TextReg;