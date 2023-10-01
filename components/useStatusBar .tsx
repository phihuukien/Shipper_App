import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { StatusBar } from 'react-native';

export const useStatusBar = (style:any, animated = true) => {
    useFocusEffect(
      useCallback(() => {
        StatusBar.setBarStyle(style, animated);
        StatusBar.setBackgroundColor('white'); //add color code
        StatusBar.setTranslucent(true);
      }, [])
    );
  };