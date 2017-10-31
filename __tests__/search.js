import 'should';
// @todo importing from build has some awful impact on coverage. Check it out!
// import RaeClient from '../build/lib';
import RaeClient from '../src';

describe('Rae Dictionary Library: Search method', () => {
  const raeClient = RaeClient.create();
  const errorMsg = (msg) => `"${msg}" word param provided must be a valid string`;

  it('should fail if word param is not an string: null', () =>
    raeClient.search(null).should.be.rejectedWith(Error, {
      message: errorMsg('null'),
    }));

  it('should fail if word param is not an string: undefined', () =>
    raeClient.search(undefined).should.be.rejectedWith(Error, {
      message: errorMsg('undefined'),
    }));

  it('should fail if word param is not an string: NaN', () =>
    raeClient.search(NaN).should.be.rejectedWith(Error, {
      message: errorMsg('NaN'),
    }));

  it('should fail if word param is not an string: Number', () =>
    raeClient.search(123123).should.be.rejectedWith(Error, {
      message: errorMsg('123123'),
    }));

  it('should fail if word param is not an string: boolean', () =>
    raeClient.search(true).should.be.rejectedWith(Error, {
      message: errorMsg('true'),
    }));

  it('should fail if word param is not an string: object', () =>
    raeClient.search({}).should.be.rejectedWith(Error, {
      message: errorMsg('[object Object]'),
    }));

  it('should fail if word param is not an string: function', () =>
    raeClient.search(() => {}).should.be.rejectedWith(Error, {
      message: errorMsg('function () {}'),
    }));

  it('should fail if word param is an empty string', () =>
    raeClient.search('').should.be.rejectedWith(Error, {
      message: errorMsg(''),
    }));

  it('should fail if word param is an alpha-numeric string', () =>
    raeClient.search('casa123').should.be.rejectedWith(Error, {
      message: errorMsg('casa123'),
    }));

  it('should success if word param is a single existing real lema', () =>
    raeClient.search('repositorio').should.be.fulfilled());
});
