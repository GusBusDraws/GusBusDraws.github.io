function onClick($this) {
    let input = document.getElementById('doodlebot-input').value;
    console.log(input);
    // promptLabel.innerHTML = input.value;
    if (input.length == 0) {
        repsonse = "DoodleBot coming soon!";
    } else {
        response = input
    }
    console.log(response);
    let promptLabel = document.getElementById('doodlebot-label');
    promptLabel.innerHTML = response
}
