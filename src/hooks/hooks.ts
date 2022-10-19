import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useEffect, useRef } from "react";

// Use throughout your redux instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useClickAway = (handleClickAway: () => void) => {
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!node.current?.contains(target)) {
        handleClickAway();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return node;
};
