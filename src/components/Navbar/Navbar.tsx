import { useContext, createContext } from "react";

export interface NavigationBarContextProps {
    isExpanded: boolean;
    toggle: () => void;
}

const NavigationBarContext = createContext<NavigationBarContextProps>({
    isExpanded: false,
    toggle: () => {}
});

export const NavigationBarProvider = NavigationBarContext.Provider;
export const useNavigationBar = () => useContext(NavigationBarContext);

const NavigationBar = () => {
    const { isExpanded, toggle } = useNavigationBar();
    return (
        <div>
            <button onClick={toggle}>Toggle</button>
            {isExpanded && <div>Expanded</div>}
        </div>
    );
}

export default NavigationBar;