import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TextBold = props => {
    return (
        <Text {...props} style={{...styles.font, ...props.style}}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    font: {
        fontFamily: 'font-bold'
    }
});

export default TextBold;