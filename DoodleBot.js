function generate() {
    let input = document.getElementById('doodlebot-input').value;
    console.log('input:', input);
    let response;
    if (input.length === 0) {
        response = "DoodleBot coming soon!";
    } else {
        response = "DoodleBot coming soon!" + '<br/>' + input
    }
    console.log('response:', response);
    let promptLabel = document.getElementById('doodlebot-label');
    promptLabel.innerHTML = response
}
