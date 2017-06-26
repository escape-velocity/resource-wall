var expect = chai.expect;

describe("Rating", function() {
  describe("constructor", function() {
    it("should be an object", function() {
      var rating = new Rating();
      expect(rating).to.be.a('object');
    });

    it("should have 10 input and 10 field labels", function() {
      var rating = new Rating();
      var inputLen = rating.$element.find('input').length;
      var labelLen = rating.$element.find('label').length;

      expect(inputLen).to.equal(10);
      expect(labelLen).to.equal(10);
    });
  });

  describe("options and api", function() {
    it("should have readOnly class for readOnly option", function() {
      var rating = new Rating({
        readOnly: true
      });

      var bool = rating.$element.find('.rating').hasClass('readOnly');

      expect(bool).to.equal(true);
    });

    it("should return a  number for get method", function() {
      var rating = new Rating({
        defaultRating: 3
      });

      expect(rating.get()).to.be.a('number');
    });

    it("should set the ratings to a given value", function() {
      var rating = new Rating({
        defaultRating: 3
      });

      rating.set(2);
      expect(rating.get()).to.equal(2);
    });
  });
});
