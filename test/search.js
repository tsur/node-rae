const should = require('should');
const RaeInstace = require('../Rae.js');

describe('Rae Dictionary Library: Search method', function() {
  const Rae = new RaeInstace();

  before(function(done) {

    done();

  });

  it('should fail if word param is not an string: null', function() {

    return Rae.search(null).should.be.rejected;

  });

  it('should fail if word param is not an string: undefined', function() {

    return Rae.search(undefined).should.be.rejected;

  });

  it('should fail if word param is not an string: NaN', function() {

    return Rae.search(NaN).should.be.rejected;

  });

  it('should fail if word param is not an string: Number', function() {

    return Rae.search(123123).should.be.rejected;

  });

  it('should fail if word param is not an string: boolean', function() {

    return Rae.search(true).should.be.rejected;

  });

  it('should fail if word param is not an string: object', function() {

    return Rae.search({}).should.be.rejected;

  });

  it('should fail if word param is not an string: function', function() {

    return Rae.search(function() {}).should.be.rejected;

  });

  it('should fail if word param is an empty string', function() {

    return Rae.search('').should.be.rejected;

  });

  it('should fail if word param is an alpha-numeric string', function() {

    return Rae.search('bravo23').should.be.rejected;

  });

  it('should fail if no results are found', function() {

    return Rae.search('myownnewword').should.be.rejected;

  });

  it('should success if word param is a single existing real lema', function() {

    return Rae.search('bravo').should.finally.be.a.Array;

  });

  it('should success if word param contains multiple existing real lemas', function() {

    return Rae.search('casa').should.finally.be.a.Array;

  });

  it('should success if using callback instead of promises', function(done) {

    Rae.search('casa', function(err, result) {

      should.not.exist(err);
      should.exist(result);
      should(result).be.a.Array;

      done();

    });

  });

  after(function(done) {

    done();

  });

});