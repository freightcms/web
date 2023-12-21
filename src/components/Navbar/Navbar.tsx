import { useContext, createContext, useEffect } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

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

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (isExpanded) {
                    toggle();
                }
            }
        }

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, [isExpanded, toggle]);

    return (
        <div className="min-h-8 bg-sky-500 flex flex-row w-full">
            <div className="flex-grow">
                <img src={window.appConfig.logo} alt={`${window.appConfig.name} logo`} />
            </div>
            <div className="flex flex-row justify-self-end">
                <button onClick={toggle}>
                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M4 6H20V8H4V6M4 11H20V13H4V11M4 16H11V18H4V16Z" />
                    </svg>
                </button>
            </div>
            {/** overlay here to give the focus effect */}
            <div className={clsx({'hidden': !isExpanded}, 'fixed inset-0 bg-black opacity-50 z-40')}></div>
            <div className={clsx({'hidden': !isExpanded}, 'g-gray-800 text-white w-64 p-4 absolute inset-y-0 right-0 z-50')} >
                <div className="flex flex-col gap-y-2">
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;