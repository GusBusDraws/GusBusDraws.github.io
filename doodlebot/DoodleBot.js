const KEYWORDS_DATA_URL = 'https://gusbus.space/DoodleBot.py/keywords.json'
let data = {};
loadJSON(KEYWORDS_DATA_URL);

function loadJSON(url) {
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
  } else if (args[0] === '!help' && args.length === 1) {
    response = getHelp();
  } else if (args[0] === '!keywords' && args.length === 1) {
    response = getKeywords();
  } else if (args[0] === '!prompt' && args.length === 1) {
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
    one of the following keywords marked with a leading "%": <br/> <br/>` +
    Object.keys(data).join(', ')
  return helpMsg
}

function getKeywords() {
  return Object.keys(data).join(', ')
}

function getRandomPrompt() {
  let promptBank = [
    'a %adjective %crustacean who is half %fantasy-creature and delves into dungeons as a %fantasy-class with a %scifi-item',
    'A %adjective %color %fantasy-creature that is a %fantasy-class with a %fantasy-item',
    'a %adjective %scifi-creature half %fantasy-creature that is a %job',
    '%adjective %scifi-creature %scifi-class who has a %material %scifi-item in their collection',
    'a %scifi-creature %fantasy-class with a %fantasy-item and a %any-item who has a %accessory',
    '%emotion %fantasy-creature working as a %job on the moon base',
    'a %adjective %fantasy-creature that is a %fantasy-class',
    'a %adjective half %fantasy-creature half %fantasy-creature with a %fantasy-item that is a %scifi-class',
    'A %animal %fantasy-class from %scifi-location',
    'A half %animal half %fantasy-creature from %adjective %any-location with a %scifi-item and a %any-item',
    'A %fantasy-creature with the head of a %bug and the arms of a %animal they have a %fantasy-item, a %fantasy-item, and a %fantasy-item and are a %fantasy-class',
    'A %fantasy-creature half %animal with the arms of a %bug they have a %fantasy-item, a %fantasy-item, and a %fantasy-item and are a %fantasy-class',
    'A %fantasy-creature with the head of a %bug, they are a %fantasy-class and have a %any-item, %any-item, and %fantasy-item',
    'a %bug that is a %fantasy-class with a %fantasy-item, a %fantasy-item, and a %fantasy-item',
    'a %scifi-creature %scifi-class that studies %field-of-study, they perform experiments involving %material and %scifi-item',
    'a %fish with a %any-item and a %any-item, they are a %fantasy-class',
    'A %fantasy-class %fantasy-creature with %bug features, they wield a %fantasy-item. %color %color %color',
    'A %fantasy-creature with %crustacean features. They are a %fantasy-class %field-of-study with a %fantasy-item. %color %color %color',
    'a %emotion %animal in %any-location holding a %inanimate-object',
    'A %fantasy-creature with %animal features. They are a %fantasy-class %job with a %any-item. %color %color %color',
    'A %fantasy-item that is also a %material %scifi-item.',
    'A %adjective %fantasy-creature from %any-location, their possessions are %fantasy-item, %fantasy-item, and %fantasy-item. They are %color.',
    'A %fantasy-item made of %material from %any-location',
    'A %animal with a %accessory %active-ing-verb',
    'A %fantasy-creature with a %fantasy-item, %color %color',
    'A %cryptid %fantasy-class with a %scifi-item',
    'A %any-creature %any-class with a %any-item',
  ];
  let prompt = promptBank[Math.floor(Math.random() * promptBank.length)];
  document.getElementById("doodlebot-input").value = prompt;
  generate()
  return
}

function checkGrammar(prompt) {
  let words = prompt.split(' ');
  let i = 0;
  for (let word of words) {
    if (word === 'a' || word === 'A') {
      // If the next word in words starts with a vowel:
      if ('aeiou'.includes(words[i + 1].slice(0, 1))) {
        // Replace the item at this position in prompt_list (word)
        // with 'an' instead of 'a'
        words[i] = 'an'
      }
    } else if (word === 'an' || word === 'An') {
      // If the next word in words does NOT start with a vowel:
      if (!'aeiou'.includes(words[i + 1].slice(0, 1))) {
        // Replace the item at this position in prompt_list (word)
        // with 'an' instead of 'a'
        words[i] = 'a'
      }
    }
    i ++
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ')
}

