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

function generate() {
    console.log('data:', data)
    // let input = document.getElementById('doodlebot-input').value;
    let input = '!prompt An %adjective %animal with an %any-item';
    console.log('input:', input);
    let response;
    let args = input.split(' ');
    if (input.length === 0) {
        response = "DoodleBot coming soon!"
    } else if (args[0] === '!prompt' && args.length === 1) {
        response = "DoodleBot coming soon!" + '<br/>' + getHelp();
    } else if (args[0] === '!prompt' && args.length > 1) {
        let prompt = getPrompt(args.slice(1));
        response = "DoodleBot coming soon!" + '<br/>' + prompt;
    }
    console.log('response:', response);
    let promptLabel = document.getElementById('doodlebot-label');
    promptLabel.innerHTML = response
}

function getHelp() {
    helpMsg = `Send a message beginning with "!prompt" that includes at least
        one keyword marked with a leading "%"`
    return helpMsg
}
function getPrompt(args) {
    let kws = []
    for (let arg of args) {
        if (arg.includes('%')) {
            kws.push(arg.slice(1))
        }
    }
    response = kws
    return response
}

// Python version:
// def get_prompt(self, args):
//     prompt_list = []
//     for arg in args:
//         if '%' in arg:
//             # Typically keyword will be directly after "%"
//             if arg[1:] in self.valid_keys:
//                 replaced = self.get_random_entry(arg[1:])
//                 prompt_list.append(replaced)
//             else:
//                 found = False
//                 i = 0
//                 while not found and i <= len(self.valid_keys):
//                     key = self.valid_keys[i]
//                     if key in arg:
//                         start = arg.find('%')
//                         sub = arg[start+1 : len(key)+start+1]
//                         # If a faulty substituted keyword passes through,
//                         # catch the KeyError exception
//                         try:
//                             replaced = self.get_random_entry(sub)
//                         except KeyError:
//                             replaced = sub
//                         full = (
//                             arg[:start] + replaced + arg[len(key)+start+1:])
//                         prompt_list.append(full)
//                         found = True
//                     i += 1
//                 if not found:
//                     print(f'{arg} not replaced.')
//         else:
//             prompt_list.append(arg)
//     prompt_list = self.check_grammar(prompt_list)
//     prompt = ' '.join(prompt_list)
//     return prompt
//
// def get_random_entry(self, col):
//     rand_entry = random.choice(self.df[col])
//     if pd.isnull(rand_entry):
//         rand_entry = self.get_random_entry(col)
//     elif rand_entry in self.df.columns.values:
//         rand_entry = self.get_random_entry(rand_entry)
//     return rand_entry
//
// def check_grammar(self, prompt_list):
//     for i, word in enumerate(prompt_list):
//         if word == 'a':
//             # If the next word in prompt_list starts with a vowel:
//             if prompt_list[i + 1][0] in 'aeiou':
//                 # Replace the item at this position in prompt_list (word)
//                 # with 'an' instead of 'a'
//                 prompt_list[i] = 'an'
//         elif word == 'an':
//             # If the next word in prompt_list does not start with a vowel:
//             if prompt_list[i + 1][0] not in 'aeiou':
//                 # Replace the item at this position in prompt_list (word)
//                 # with 'a' instead of 'an'
//                 prompt_list[i] = 'a'
//     prompt_list[0] = prompt_list[0].capitalize()
//     return prompt_list


