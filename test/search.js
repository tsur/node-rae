import "should";
import RaeClient from "../build/lib.js";

describe("Rae Dictionary Library: Search method", function() {
  const raeClient = RaeClient.create();
  const errorMsg = msg => `"${msg}" word param provided must be a valid string`;
  const notFoundErrorMsg = msg => `"${msg}" not found in RAE`;

  before(function(done) {
    done();
  });

  it("should fail if word param is not an string: null", function() {
    return raeClient.search(null).should.be.rejectedWith(Error, {
      message: errorMsg("null")
    });
  });

  it("should fail if word param is not an string: undefined", function() {
    return raeClient.search(undefined).should.be.rejectedWith(Error, {
      message: errorMsg("undefined")
    });
  });

  it("should fail if word param is not an string: NaN", function() {
    return raeClient.search(NaN).should.be.rejectedWith(Error, {
      message: errorMsg("NaN")
    });
  });

  it("should fail if word param is not an string: Number", function() {
    return raeClient.search(123123).should.be.rejectedWith(Error, {
      message: errorMsg("123123")
    });
  });

  it("should fail if word param is not an string: boolean", function() {
    return raeClient.search(true).should.be.rejectedWith(Error, {
      message: errorMsg("true")
    });
  });

  it("should fail if word param is not an string: object", function() {
    return raeClient.search({}).should.be.rejectedWith(Error, {
      message: errorMsg("[object Object]")
    });
  });

  it("should fail if word param is not an string: function", function() {
    return raeClient.search(function() {}).should.be.rejectedWith(Error, {
      message: errorMsg("function () {}")
    });
  });

  it("should fail if word param is an empty string", function() {
    return raeClient.search("").should.be.rejectedWith(Error, {
      message: errorMsg("")
    });
  });

  it("should fail if word param is an alpha-numeric string", function() {
    return raeClient.search("casa123").should.be.rejectedWith(Error, {
      message: errorMsg("casa123")
    });
  });

  it('should success if word param is a single existing real lema', function() {
    return raeClient.search('repositorio').should.be.fulfilled();
  });

  after(function(done) {
    done();
  });
});
