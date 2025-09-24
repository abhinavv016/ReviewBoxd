import { create } from 'zustand'

interface UIStateProps{
    isVisible: boolean;
    open: () => void;
    close: () => void;
}
export const useUiState = create<UIStateProps>((set) => ({
    isVisible: false,
    open: () => set({isVisible: true}),
    close: () => set({isVisible: false}),
}))