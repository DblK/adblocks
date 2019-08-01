const { EventEmitter } = require('events');
const assert = require('assert');
const debug = require('debug')('cicp:adblocks');

class AdBlocks extends EventEmitter {
  /**
   *
   * @constructor
   */
  constructor() {
    super();
    debug('constructor');
  }

  /**
   * Set additional properties after object constructor
   *
   * @param {{logger: object}} param Additional Object
   */
  setInitialProperties({ logger }) {
    // debug('setInitialProperties');
    assert(logger, 'Logger must be present');
    this.logger = logger;
  }

  handleRequest(req, res, next) {
    debug('handleRequest', req.url);
    // debug(req.body.e);
    // debug('rawBody', req.rawBody);
    // res.end('test adblocks');
    // next(new Error('eee'));

    // Log only blocked
    // const child = this.logger.child({ mode: 'ADBLOCK' });
    // child.info(`${req.method} ${req.url}`);
    next();
  }

  option() {
    return {
      command: {
        short: 'a',
        long: 'adblocks',
        parameters: '<file>',
      },
      description: 'Add a selection of domain/request to block',
      callback: (args) => {
        debug('Adblock', args);
      },
    };
  }
}

module.exports = function setup(options, imports, register) {
  const adblocks = new AdBlocks(imports);

  register(null, {
    adblocks,
  });
};
