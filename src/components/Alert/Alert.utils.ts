import { TAlertVariants } from "src/components/Alert/Alert.types";

export const getSvgId = (variant: TAlertVariants): string => {
  if (variant === "success") return "checkbox-checked";
  return "info";
};
