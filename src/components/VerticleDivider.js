import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

const VerticleDivider = (props) => {
    return(
        <View style={styles(props.height)}></View>
    )
}

export default VerticleDivider

const styles = (height) => {
    return ({
            width: 1,
            height:parseInt(height),
            backgroundColor: '#BDBDBD'
    })

}