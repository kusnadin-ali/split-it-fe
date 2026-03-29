import React from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  spacing?: number;
  style?: ViewStyle;
};

export default function VStack({ children, spacing = 12, style }: Props) {
  const childrenArray = React.Children.toArray(children);

  return (
    <View style={style}>
      {childrenArray.map((child, index) => (
        <View
          key={index}
          style={{ marginTop: index === 0 ? 0 : spacing }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}