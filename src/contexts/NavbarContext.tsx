"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface NavbarContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  hideNavbar: () => void;
  showNavbar: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hideNavbar = () => setIsVisible(false);
  const showNavbar = () => setIsVisible(true);

  // Auto-show navbar when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      showNavbar();
    }
  }, [isModalOpen]);

  return (
    <NavbarContext.Provider
      value={{
        isVisible,
        setIsVisible,
        hideNavbar,
        showNavbar,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
