import { create } from "zustand";

export interface Media {
    id: string;
    title: string;
    posterPath?: string;
    mediaType: "movie" | "tv";
}

interface WatchlistState {
    watchlist: Media[];
    activeTab: "movie" | "tv";
    setWatchlist: (items: Media[]) => void;
    addToWatchlist: (item: Media) => void;
    removeFromWatchlist: (id: string) => void;
    setActiveTab: (tab: "movie" | "tv") => void;
}

export const useWatchlistStore = create<WatchlistState>((set) => ({
    watchlist: [],
    activeTab: "movie",
    setWatchlist: (items) => set({ watchlist: items }),
    addToWatchlist: (item) =>
        set((state) => ({ watchlist: [...state.watchlist, item] })),
    removeFromWatchlist: (id) =>
        set((state) => ({
            watchlist: state.watchlist.filter((item) => item.id !== id),
        })),
    setActiveTab: (tab) => set({ activeTab: tab }),
}));