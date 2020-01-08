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
    $(".articleDisplay").empty();
    $.ajax({
      method: "GET",
      url: articleURL,
      data: {
        "api-key": apiKey
      }
    }).done(function(data) {
      console.log(data);
      console.log(data.results);
      //To filter out articles with no images, create an if statement to check if multimedia array is empty.

      // for loop to iterate through top 12 articles
      let withImg = 0;
      for (let i = 0; withImg < 12; i++) {
        let cssID = 0;
        console.log(data.results[i]);
        console.log(data.results[i].abstract);
        console.log(data.results[i].multimedia[0] === undefined);

        if (data.results[i].multimedia[0] === undefined) {
          withImg = withImg;
        } else {
          let cssID = `article${withImg}`;
          let imgURL = data.results[i].multimedia[3].url;
          let redirectUrl = data.results[i].url;
          console.log(imgURL);
          console.log(cssID);
          $(".articleDisplay").append(`<div class = article> 
          <a href = "${redirectUrl}"><img id = articleImages src=${imgURL}></a>
          <p class = ${cssID} id = articleAbstracts>${data.results[i].abstract}</p>
            <div>`);
          //   $(`.${cssID}`).append(`<img id = articleImages src=${imgURL}>`);
          //   $(`.${cssID}`).append(
          //     `<p class = ${cssID} id = articleAbstracts>${data.results[i].abstract}</p>`
          //   );
          withImg = withImg + 1;
        }
        // $(".articleDisplay").append(``);
      }
    });
  });
});
