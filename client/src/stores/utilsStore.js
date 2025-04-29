import create from "zustand";

export const useUtilsStore = create((set, get) => ({
  isProfileDropdownOpen: false,
  isSidebarCollapsed: false,

  setIsProfileDropdownOpen: () => {
    const { isProfileDropdownOpen } = get();
    set({ isProfileDropdownOpen: !isProfileDropdownOpen });
  },

  setIsSidebarCollapsed: () => {
    const { isSidebarCollapsed } = get();
    set({ isSidebarCollapsed: !isSidebarCollapsed });
  },
}));
