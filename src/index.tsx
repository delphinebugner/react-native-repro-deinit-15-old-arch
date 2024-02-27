import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-repro-deinit-15-old-arch' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ReproDeinit15OldArchProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ReproDeinit15OldArchView';

export const ReproDeinit15OldArchView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReproDeinit15OldArchProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
