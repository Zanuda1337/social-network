export type TAlertTypes = "error" | "warning" | "info" | "success";
export type TAlert = {
  id: number;
  type: TAlertTypes;
  message: string;
};
