import '@/public/styles/dark_theme.css'
import '@/public/styles/light_theme.css'

const rootElement = document.documentElement;
const modes = {false:"light", true:"dark"}
let isDarkMode = false;
const cssVariables = {
    false: {
        '--background': '#F0F0F0',
        '--container': '#CECECE',
        '--primary-text': '#101010',
        '--secondary-text': '#1C1C1C',
        '--navbar':  '#FAFAFA',
        '--navbar-border': '#FFFFFF',
    },
    true: {
        '--background': '#0D0D0D',
        '--container': '#1D1D1D',
        '--primary-text': '#EAEAEA',
        '--secondary-text': '#CCCCCC',
        '--navbar':  '#080808',
        '--navbar-border': '#040404',
    },
};

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

        },
        getCurrentMode(){
            return modes[isDarkMode];
        }
    },
    created() {


    }
}