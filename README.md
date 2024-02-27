# react-native-repro-deinit-15-old-arch

Reproduction for an issue https://github.com/software-mansion/react-native-screens/issues/2007

On iOS 15, custom deinit function on custom Swift Native Components are not entered when unmounting a screen.
Run the example app to see it on action:

1. Build and open the example app on latest iOS version following the instruction on [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Clic on "Destroy component", a native log appears on XCode `"I deallocated the component wisely"`

![Deallocation log on component direct destroy](doc/image.png)

3. Go on Screen2
4. Return on Screen1: the native log `"I deallocated the component wisely"` should appear on XCode because the component has been destroyed when the screen was poping
   ![Deallocation log on screen pop](doc/demoLogScreenUnmounted.gif)
5. Do the same on iOS 15.5: **the log does not appear anymore** on Screen2 pop!
   ![No deallocation log on screen pop](doc/demoNoLogiOS15.gif)

6. Apply the following patch on RNScreens: 
```diff
diff --git a/node_modules/react-native-screens/ios/RNSScreen.mm b/node_modules/react-native-screens/ios/RNSScreen.mm
index 4b24cff..7e0718d 100644
--- a/node_modules/react-native-screens/ios/RNSScreen.mm
+++ b/node_modules/react-native-screens/ios/RNSScreen.mm
@@ -609,8 +609,9 @@ - (void)updatePresentationStyle
 #if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_15_0) && \
     __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_15_0
   if (@available(iOS 15.0, *)) {
-    UISheetPresentationController *sheet = _controller.sheetPresentationController;
-    if (_stackPresentation == RNSScreenStackPresentationFormSheet && sheet != nil) {
+    if (_stackPresentation == RNSScreenStackPresentationFormSheet) {
+      UISheetPresentationController *sheet = _controller.sheetPresentationController;
+      if (sheet != nil) {
       sheet.prefersScrollingExpandsWhenScrolledToEdge = _sheetExpandsWhenScrolledToEdge;
       sheet.prefersGrabberVisible = _sheetGrabberVisible;
       sheet.preferredCornerRadius =
@@ -646,6 +647,7 @@ - (void)updatePresentationStyle
       } else {
         RCTLogError(@"Unhandled value of sheetAllowedDetents passed");
       }
+      }
     }
   }

```
The deallocation log is back on screen pop on iOS 15.5! 

> In the real project, it's not a log in the deinit function but an important clean up function for a native video player, so we should enter it!

## Usage

```js
import { ReproDeinit15OldArchView } from 'react-native-repro-deinit-15-old-arch';

// ...

<ReproDeinit15OldArchView color="tomato" />;
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
