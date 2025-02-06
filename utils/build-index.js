function buildIndex(insertDivID, obj) {
  // let comicsDiv = document.getElementById("comics-index");
  let divID = document.getElementById(insertDivID);

  for (let site of obj) {
    divID.innerHTML += `
      <div class='tile'>
        <p>Title: ` + site.title + `</p>
        <p>Owner: ` + site.owner + `</p>
        <p>URL: <a href=https://` + site.url + ` target=_blank>` + site.url + `</a>
      </div>
      </br>
    `;
  }
}
