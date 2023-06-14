import App from '../App';
import Swup from 'swup';
// import JsPlugin from '@swup/js-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
// import SwupGtmPlugin from '@swup/gtm-plugin';
// import SwupGaPlugin from '@swup/ga-plugin';
// import DebugPlugin from '@swup/debug-plugin';

const PageLoader = {
    init: _ => {
        // if (App.isMobile) return
        PageLoader.previousUrl = null
        PageLoader.swup = new Swup({
            containers: ["#app"],
            linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
            cache: false,
            plugins: [
                new SwupPreloadPlugin(),
                // new SwupGtmPlugin(),
                // new SwupGaPlugin(),
                // new DebugPlugin()
            ]
        });
        // reload components for each container after transition
        PageLoader.swup.on('transitionStart', function() {
            PageLoader.previousUrl = window.location.href
            document.body.classList.add("is-loading");
        });
        PageLoader.swup.on('willReplaceContent', function() {
        });
        PageLoader.swup.on('contentReplaced', function() {
            App.pageType = document.querySelector('#app').getAttribute("page-type");
            document.body.setAttribute('page-type', App.pageType)
            document.querySelectorAll('[data-swup]').forEach(function(container) {
                App.interact();
            });
            document.body.classList.remove("is-loading");
            PageLoader.updateGTM()
        });
        // PageLoader.swup.on('transitionStart', function() {
        //     App.pageType = document.querySelector('#page-content').getAttribute("page-type");
        // });
    },
    updateGTM: _ => {
        if (typeof window.dataLayer === 'object') {
            window.gtag('config', window.dataLayer[1][1], {
                'page_title': document.title,
                'page_path': window.location.pathname + window.location.search
            });
        }
    }
};
export default PageLoader;
