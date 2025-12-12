import { createContext, useContext } from 'react';

export type Page = 'home' | 'about' | 'services' | 'contact';

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'home',
  navigate: () => {},
});

export const useNavigation = () => useContext(NavigationContext);
