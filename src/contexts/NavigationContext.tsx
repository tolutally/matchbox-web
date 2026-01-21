import { createContext, useContext } from 'react';

export type Page = 'home' | 'about' | 'services' | 'pricing' | 'contact' | 'call-me' | 'private-demo';

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'home',
  navigate: () => {},
});

export const useNavigation = () => useContext(NavigationContext);
