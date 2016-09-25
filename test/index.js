const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const Deferred = require('../index');

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

describe('Deferred', function()
{
  it('should extend Promise', function()
  {
    let d = new Deferred();
    d.should.be.instanceOf(Deferred);
    d.should.be.instanceOf(Promise);
  });

  it("shouldn't have any cross instance issues", function()
  {
    let d1 = new Deferred();
    let d2 = new Deferred();

    // go through same process for both to ensure it works
    let d1_isPending = true;
    let d2_isPending = true;
    d1.then(() => { d1_isPending = false }, () => { d1_isPending = false });
    d2.then(() => { d2_isPending = false }, () => { d2_isPending = false });

    d1.resolve();
    return d1.should.eventually.be.fulfilled.then(function()
    {
      chai.assert(!d1_isPending, 'd1 is pending');
      chai.assert(d2_isPending, 'd2 is not pending');
    });
  });

  describe('#constructor()', function()
  {
    it('should call the executor', function()
    {
      let executor = sinon.spy();
      new Deferred(executor);

      executor.should.have.been.calledOnce;
    });

    it('should call the executor with resolve', function()
    {
      let executor = sinon.spy();
      let d = new Deferred(executor);

      executor.should.have.been.calledWith(sinon.match.func, sinon.match.func);
      let args = executor.getCall(0).args;

      args[0]();

      return d.should.eventually.be.fulfilled;
    });

    it('should call the executor with reject', function()
    {
      let executor = sinon.spy();
      let d = new Deferred(executor);

      executor.should.have.been.calledWith(sinon.match.func, sinon.match.func);
      let args = executor.getCall(0).args;

      args[1]();

      return d.should.eventually.be.rejected;
    });

    it('should keep reference to resolve, reject', function()
    {
      let executor = sinon.spy();
      let d = new Deferred(executor);

      executor.should.have.been.calledWith(sinon.match.func, sinon.match.func);
      let args = executor.getCall(0).args;

      d._resolve.should.equal(args[0]);
      d._reject.should.equal(args[1]);
    });
  });

  describe('#resolve()', function()
  {
    it('should resolve the promise with the value', function()
    {
      let d = new Deferred();
      d.resolve('test', 'not used');

      return d.should.eventually.become('test');
    });
  });

  describe('#reject()', function()
  {
    it('should reject the promise with the value', function()
    {
      let d = new Deferred();
      d.reject('test', 'not used');

      return d.should.eventually.be.rejectedWith('test');
    });
  });

  describe('#promise()', function()
  {
    it('should return a promise', function()
    {
      let d = new Deferred();
      d.promise().should.be.instanceOf(Promise);
      d.promise().should.not.be.instanceOf(Deferred);
    });

    it('should return a promise that resolves when deferred does', function()
    {
      let d = new Deferred();
      let p = d.promise();

      d.resolve('test');

      return p.should.eventually.become('test');
    });

    it('should return a promise that rejects when deferred does', function()
    {
      let d = new Deferred();
      let p = d.promise();

      d.reject('test');

      return p.should.eventually.be.rejectedWith('test');
    });
  });
});
