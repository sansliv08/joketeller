const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    // console.log('tell me: ', joke);

    VoiceRSS.speech({
        key: '134146eb996648da98fb6e27ef10bfca',
        src: joke,
        hl: 'en-US',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
            // joke = data.setup + ' ... ' + data.delivery; // it's the same
        } else {
            joke = data.joke;
        }

        // Text to Speech
        tellMe(joke);  // console.log(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        //Catch Errors Here
        console.log('Whooooppps!', error);
    }
};

// Event Listeners
button.addEventListener('click', getJokes);

audioElement.addEventListener('ended', toggleButton);