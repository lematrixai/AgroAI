declare module 'react-native-curved-bottom-bar' {
  import { ComponentType, ReactElement } from 'react';
  import { ViewStyle } from 'react-native';

  interface NavigatorProps {
    children: ReactElement[];
    type?: 'DOWN' | 'UP';
    style?: ViewStyle;
    shadowStyle?: ViewStyle;
    height?: number;
    circleWidth?: number;
    bgColor?: string;
    initialRouteName?: string;
    borderTopLeftRight?: boolean;
    renderCircle?: (props: { selectedTab: string; navigate: (route: string) => void }) => ReactElement;
    tabBar?: (props: { routeName: string; selectedTab: string; navigate: (route: string) => void }) => ReactElement;
    // Add optional props that were causing the error
    width?: number | string;
    id?: string;
    borderColor?: string;
    borderWidth?: number;
    circlePosition?: 'LEFT' | 'CENTER' | 'RIGHT';
    strokeWidth?: number;
    backBehavior?: 'none' | 'history' | 'initialRoute' | 'order';
  }

  interface ScreenProps {
    name: string;
    component: ComponentType;
    position?: 'LEFT' | 'RIGHT' | 'CENTER';
  }

  export const CurvedBottomBarExpo: {
    Navigator: ComponentType<NavigatorProps>;
    Screen: ComponentType<ScreenProps>;
  };
}