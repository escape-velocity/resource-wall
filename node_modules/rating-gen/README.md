# Ratings

![Alt text](rating.png "Ratings")

#### INSTALL
    npm install rating-gen

This will install jquery 2.1.4 as a dependency

Copy the css from `node_modules/rating-gen/rating.css` in you html  and adjust the fieldset font-size to change the size of stars.
The css file imports `font-awesome` , so replace the path with your local copy.

#### Usage
    var  Rating = require('rating-gen');
    var $ = require('jquery');

    var rating = new Rating({
        field: $('.rating-container'),
        defaultRating: 3,
        onSelect: function(rating) {
            alert(rating);
        }
    });

if you are not using browserify/webpack  simply copy the `rating.js` and `rating.css` files, remove
the require lines and start using. Rating will be attached to the window object.

#### Options

- readOnly: true, no hover effect and change in the ratings
- _id: provide unique id if have multple star-ratings in the same html


#### Api
- rating.get() - gives the current rating
- rating.set(2) - will set the ratings