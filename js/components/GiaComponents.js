import loadComponents from 'gia/loadComponents';
import removeComponents from 'gia/removeComponents';
import TinySlider from './gia/TinySlider';
import GiaConfig from 'gia/config';
const GiaComponents = {
    init: _ => {
        // enable components
        GiaConfig.set('log', false);
        GiaComponents.components = {
            TinySlider,
        }
        GiaComponents.load()
    },
    load: (container = document.documentElement) => {
        loadComponents(GiaComponents.components, container);
    },
    unload: (container = document.documentElement) => {
      removeComponents(container);
    }
};
export default GiaComponents;
