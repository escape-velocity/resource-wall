$(() => {

  function callData(){
     $.ajax({
      method: "GET",
      url: "/allUrls",
      dataType:"json",
      success:function(result){
        console.log(result.result);
        for(var c=0; c<result.result.length; c++){
          renderUrls(result.result[c]);
          //console.log(result.result[c]);
        }
      },
      error: function(error){

      }
    }); //ajax call ends here
  }
  callData();

  function createUrlElement(url){

    const html = `
        <div class="col-lg-4">
        <a href="https://${url.url}">
          <div class="card" style="width: 30rem">
            <img class="card-img-top" src=${url.image} alt="Card image cap">
            <div class="card-block">
              </a>
              <h4 class="card-title">${url.title}</h4>
              <p class="card-text">${url.url}</p>
              <p class="card-text">${url.description}</p>

              <div class="footer">
              <fieldset class="rating">
                  <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
                  <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                  <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
                  <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                  <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
                  <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                  <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
                  <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                  <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
                  <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                </fieldset>
              </div>

            </div>
            <p class="category">#${url.category}</p>
          </div>
        </div>`;

    return html;
  }

  function renderUrls(url){
    //create URL and add it on the div container
    var $testcontainer = $('#testcontainer');
    $testcontainer.prepend(createUrlElement(url));
  }
});
