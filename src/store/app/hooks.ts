import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatcher, RootState } from './store';



export const useDispatcher = () =>  useDispatch<AppDispatcher>();
export const useStoreState: TypedUseSelectorHook<RootState> = useSelector;