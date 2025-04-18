import { HeaderProps } from "@/types";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {!!title && (
        <Typo
          size={32}
          fontWeight="600"
          style={StyleSheet.flatten([styles.title, { width: leftIcon ? "82%" : "100%" }])}
        >
          {title}
        </Typo>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    alignSelf: "flex-start",
  },
  title: {
    textAlign: "center",
  },
});
