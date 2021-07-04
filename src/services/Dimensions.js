import {Dimensions } from "react-native";

export default {
    getScreenSize() {  
        const screenWidth = Math.round(Dimensions.get('window').width);  
        const screenHeight = Math.round(Dimensions.get('window').height);  
        return ({"screenWidth":screenWidth,
                 "screenHeight":screenHeight})  
    }
}
