import React from 'react';
import {Alert, BackHandler} from 'react-native'
const ExitAlert = () => {
    return(  
        Alert.alert(
            'Do you want to exit app',
            'press ok to exit',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false},
        )
          
    )
}

export default ExitAlert