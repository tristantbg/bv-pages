import ls from 'lazysizes';
import 'lazysizes/plugins/optimumx/ls.optimumx';
import 'lazysizes/plugins/object-fit/ls.object-fit.js';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.js';

// lazysizes.cfg.init = false;

const LazySizes = {
  init: _ => {
    ls.init()
  }
};

export default LazySizes;
