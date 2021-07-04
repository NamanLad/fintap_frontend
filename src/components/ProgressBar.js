import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View,ProgressBarAndroid } from 'react-native';

const ProgressBar = ({ progress, days }) => {
  const [progressColor, setProgressColor] = useState('green');
  const [progressValue, setProgressValue] = useState(100);

  const progressDecide = () => {
    progress = parseInt(progress);
    if (days == -1) {
      setProgressColor('red');
      setProgressValue(100);
    } else {
      setProgressValue(progress);
      if (progress > 80) {
        setProgressColor('green');
      } else if (progress > 60) {
        setProgressColor('#f0b667');
      } else {
        setProgressColor('red');
      }
    }
  }

  useEffect(() => {
    progressDecide();
  }, [])
  return (<ProgressBarAndroid
    styleAttr="Horizontal"
    indeterminate={false}
    progress={parseFloat(progressValue/100)}
    color={progressColor}
  />)
}


export default ProgressBar



// const DecideColor = (progress) => {
//   progress=parseInt(progress)
//   if(progress>80) {
//     return('green')
//   }
//   else if(progress>60)   {
//     return('#F0B667')
//   }
//   else{
//     return('red')
//   }
// }