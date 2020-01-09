$(function() {
  console.log("running");
  $(".dropDownMenu").change(function() {
    console.log("change");
    let category = $(".dropDownMenu option:selected").val();
    console.log(category);
    let apiKey = "pR4oaaq9r9vj4EQf8bq2nDh5Og3nhG5A";
    let articleURL = `https://api.nytimes.com/svc/topstories/v2/${category}.json`;
    //https://api.nytimes.com/svc/topstories/v2/{section}.json
    console.log(articleURL);

    // Clears article area
    $(".articleDisplay").empty();

    // code for changing header classes & css settings
    $("header").addClass("headerLoading");

    // $(".logoImage")
    //   .addClass("logoImageSmall")
    //   .removeClass("logoImage");
    $(".loadingGIF").css("display", "flex");

    // API & Data display functions
    $.ajax({
      method: "GET",
      url: articleURL,
      data: {
        "api-key": apiKey
      }
    }).done(function(data) {
      console.log(data);
      console.log(data.results);
      $(".articleDisplay").css("display", "grid");
      $("header")
        .addClass("headerSmall")
        .removeClass("headerBig");
      //To filter out articles with no images, create an if statement to check if multimedia array is empty.

      // for loop to iterate through top 12 articles
      let withImg = 0;
      for (let i = 0; withImg < 12; i++) {
        // console.log(data.results[i]);
        // console.log(data.results[i].abstract);
        // console.log(data.results[i].multimedia[0] === undefined);

        if (data.results[i].multimedia[0] !== undefined) {
          let imgURL = data.results[i].multimedia[4].url;
          let redirectUrl = data.results[i].url;
          console.log(imgURL);
          $(".articleDisplay").append(`<div class = article> 
          <a href = "${redirectUrl}"><img class = articleImages src=${imgURL}></a>
          <p class = articleAbstracts>${data.results[i].abstract}</p>
            </div>`);
          withImg++;
          console.log(withImg);
        }
      }
      $(".loadingGIF").css("display", "none");
      $("header").removeClass("headerLoading");
    });
  });

  $(".article").hover(function() {
    console.log("article Display Hover");
  });

  $(".articleImages").hover(
    function() {
      console.log("hoverin");
    },
    function() {
      console.log("hoverout");
    }
  );
  // on click for css class not working. Same thing for hover
});
