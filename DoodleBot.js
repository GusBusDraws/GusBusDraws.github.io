let data = {};
loadJSON()

function loadJSON() {
  url = 'https://gusbus.space/DoodleBot/keywords.json'
  fetch(url)
    .then(response => response.json())
    .then((json) => {dataReady(json)});
}

function dataReady(json) {
  data = json;
}

function getRandomEntry(kw) {
  let vals = data[kw];
  let entry = vals[Math.floor(Math.random() * vals.length)];
  if (Object.keys(data).includes(entry)) {
    entry = getRandomEntry(entry)
  }
  return entry
}

function getPrompt(args) {
  console.log('Getting prompt...')
  console.log(args)
  let words = [];
  // For each arg, if it contains a "%", iterate through keywords looking for a
  // match withing the arg
  for (let arg of args) {
    if (arg.includes('%')) {
      let found = false;
      let i = 0;
      // When a matching keyword is found, exit the loop
      while (found != true && i < Object.keys(data).length) {
        // Ge the ith keyword from the JSON keys
        let kw = Object.keys(data)[i];
        if (arg.includes(kw)) {
          console.log(kw + ' found in ' + arg)
          let word = getRandomEntry(kw);
          let subbed = arg.replace('%' + kw, word);
          console.log('Substituted ' + subbed + ' for ' + arg)
          words.push(subbed);
          found = true;
        } else {
          i ++
        }
      }
      if (found === false) {
        console.log('Keyword not found:', arg)
        // If keyword not found, keep the %-containing substring in the
        // prompt as an indicator
        words.push(arg);
      }
    } else {
      // If arg doesn't include "%", add it to the list of words
      words.push(arg)
    }
  }
  let prompt = words.join(' ')
  prompt = checkGrammar(prompt);
  return prompt
}

function generate() {
  console.log('data:', data)
  let input = document.getElementById('doodlebot-input').value;
  // let input = '!prompt An %adjective %animal with an %any-item';
  console.log('input:', input);
  let response;
  let args = input.split(' ');
  if (input.length === 0) {
    response = getHelp();
  } else if (args[0] === '!prompt' && args.length === 1) {
    response = getHelp();
  } else if (args[0] === '!help' && args.length === 1) {
    response = getHelp();
  } else if (args[0] === '!prompt' && args.length > 1) {
    let prompt = getPrompt(args.slice(1));
    response = prompt;
  } else if (args.length > 0) {
    let prompt = getPrompt(args);
    response = prompt;
  }
  console.log('response:', response);
  let promptLabel = document.getElementById('doodlebot-label');
  promptLabel.innerHTML = response
}

function getHelp() {
  helpMsg = `To generate a prompt, type a message that includes at least
    one of the following keywords marked with a leading "%": <br/>` +
    Object.keys(data).join(', ')
  return helpMsg
}

function checkGrammar(prompt) {
  let words = prompt.split(' ');
  let i = 0;
  for (let word of words) {
    if (word === 'a') {
      // If the next word in words starts with a vowel:
      if ('aeiou'.includes(words[i + 1].slice(0, 1))) {
        // Replace the item at this position in prompt_list (word)
        // with 'an' instead of 'a'
        words[i] = 'an'
      }
    } else if (word === 'an') {
      // If the next word in words does NOT start with a vowel:
      if (!'aeiou'.includes(words[i + 1].slice(0, 1))) {
        // Replace the item at this position in prompt_list (word)
        // with 'an' instead of 'a'
        words[i] = 'a'
      }
    }
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ')
}

