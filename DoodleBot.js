function onClick($this) {
    let input = document.getElementById('doodlebot-input').value;
    console.log(input);
    let promptLabel = document.getElementById('doodlebot-label');
    // promptLabel.innerHTML = input.value;
    promptLabel.innerHTML = "DoodleBot coming soon!";
}