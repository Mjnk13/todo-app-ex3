import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useTripDispatch = () => useDispatch<AppDispatch>();
export const useTripSelector: TypedUseSelectorHook<RootState> = useSelector;