import '@/shared/styles/dark_theme.css'
import '@/shared/styles/light_theme.css'

const rootElement = document.documentElement;
const modes = {false:"light", true:"dark"}
let isDarkMode = false;
const cssVariables = {
    false: {
        '--background': '#F0F0F0',
        '--container': '#CECECE',
        '--primary-text': '#101010',
        '--secondary-text': '#1C1C1C',
    },
    true: {
        '--background': '#0D0D0D',
        '--container': '#1D1D1D',
        '--primary-text': '#EAEAEA',
        '--secondary-text': '#CCCCCC',
    },
};

class ObserverPattern {
    constructor() {
        this.observers = [];
    }

    subscribe(observerFunction) {
        this.observers.push(observerFunction);
    }

    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notify() {
        this.observers.forEach((observer) => {
            observer(isDarkMode);
        });
    }
};
const darkModeNotifications = new ObserverPattern();

export default {
    isDarkMode,
    modes,
    methods: {
        alterMode(){
            isDarkMode = !isDarkMode;
            const selectedCSS = isDarkMode ? cssVariables.true : cssVariables.false;
            for (let [variable,valor] of Object.entries(selectedCSS)){
                rootElement.style.setProperty(variable, valor);
            }
            if(isDarkMode){
                document.querySelectorAll('style[data-vite-dev-id$="light_theme.css"]').forEach(styleElement => {
                    styleElement.disabled = true;
                });
                document.querySelectorAll('style[data-vite-dev-id$="dark_theme.css"]').forEach(styleElement => {
                    styleElement.disabled = false;
                });
            }
            else {
                document.querySelectorAll('style[data-vite-dev-id$="dark_theme.css"]').forEach(styleElement => {
                    styleElement.disabled = true;
                });
                document.querySelectorAll('style[data-vite-dev-id$="light_theme.css"]').forEach(styleElement => {
                    styleElement.disabled = false;
                });
            }
            darkModeNotifications.notify();
        },
        getCurrentMode(){
            return modes[isDarkMode];
        },
        watchDarkMode(functionToCall){
            darkModeNotifications.subscribe(functionToCall)
        },
        unwatchDarkMode(functionToCall){
            darkModeNotifications.unsubscribe(functionToCall)
        }
    },
}