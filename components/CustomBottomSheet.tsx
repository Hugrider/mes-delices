import { useThemeColors } from "@/constants/Theme";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

type Props = {
  points: string[];
  children: ReactNode;
};

export default forwardRef<BottomSheet, Props>(function CustomBottomSheet(
  { points, children }: Props,
  ref
) {
  const colors = useThemeColors();
  const snapPoints = useMemo(() => points, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.2} disappearsOnIndex={0} />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: colors.background }}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({});
