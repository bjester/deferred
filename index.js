"use strict";

/**
 * Deferred promise
 */
class Deferred extends Promise
{
  /**
   * @param {Function|} executor
   */
  constructor(executor)
  {
    let self_resolve, self_reject;
    executor = executor || (() => {});

    super(function(resolve, reject)
    {
      self_resolve = resolve;
      self_reject = reject;
      executor(resolve, reject);
    });

    this._resolve = self_resolve;
    this._reject = self_reject;
  }

  /**
   * @param value
   * @returns {Deferred}
   */
  resolve(value)
  {
    this._resolve(value);
    return this;
  }

  /**
   * @param value
   * @returns {Deferred}
   */
  reject(value)
  {
    this._reject(value);
    return this;
  }

  /**
   * @returns {Promise}
   */
  promise()
  {
    return new Promise((resolve, reject) =>
    {
      this.then(resolve, reject);
    });
  }
}

module.exports = Deferred;
