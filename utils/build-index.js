function buildIndexComics(obj) {
  console.log('Building Comics Line index...')
  let comicsDiv = document.getElementById("comics-index");

  for (let site of DATA_comics) {
    // comicsDiv.innerHTML += "<div class='tile'>";
    // comicsDiv.innerHTML += "<p>Title: " + site.title + "</p>";
    // comicsDiv.innerHTML += "<p>Owner: " + site.owner + "</p>";
    // comicsDiv.innerHTML += "<p>URL: " + site.url + "</p>";
    // comicsDiv.innerHTML += "</div>";
    comicsDiv.innerHTML += `
      <div class='tile'>
        <p>Title: ` + site.title + `</p>
        <p>Owner: ` + site.owner + `</p>
        <p>URL: <a href=https://` + site.url + ` target=_blank>` + site.url + `</a>
      </div>
      </br>
    `;
  }
}

buildIndexComics(DATA_comics);