const readline = require('readline');
const os = require('os');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isYes(answer) {
    answer = answer.trim().toLowerCase();
    return (answer === '' || answer === os.EOL || answer === 'y' || answer === 'yes');
}

function generateGitIgnore(options) {
    let content = '';
    if (options['.idea'] === true) content += `.idea/${os.EOL}`;
    if (options['node_modules'] === true) content += `node_modules/${os.EOL}`;

    fs.writeFile('.gitignore', content, 'utf8', (err) => {
        if (err) console.error(err);
        console.log('The file has been saved!');
    });
}

rl.question('Do you want to generate .gitignore? (yes)', (answer) => {
    if (isYes(answer)) {
        let options = {
            '.idea': true,
            'node_modules': true
        };

        rl.question('Do you want to ignore .idea folder? (yes)', (answer) => {
            options['.idea'] = isYes(answer);

            rl.question('Do you want to ignore node_modules folder? (yes)', (answer) => {
                options['node_modules'] = isYes(answer);
                generateGitIgnore(options);
                rl.close();
            })
        })
    } else {
        console.log('Exiting...');
        rl.close();
    }
});
