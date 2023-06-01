var words = ["api","Backend","Big Data","Client","Server","Cloud", "javascript", "programmierung", "DevOps","Scrum","SaaS","Linux","Frontend","SQL","UI","UX","Active Directory","DHCP","CPU","Byte","Bit","ASA",];
        var randomWord = words[Math.floor(Math.random() * words.length)];

        var wordElement = document.getElementById("word");
        var guessInput = document.getElementById("guessInput");
        var message = document.getElementById("message");
        var wrongGuessesElement = document.getElementById("wrongGuesses");
        var hangmanImage = document.getElementById("hangman-image");

        var guessedLetters = [];
        var wrongGuesses = 0;

        // Initialisiere das Wort mit Platzhaltern (_ _ _ _ _ _ _ _ _ _ _ _ _)
        var hiddenWord = [];
        for (var i = 0; i < randomWord.length; i++) {
            hiddenWord.push("_");
        }
        wordElement.innerHTML = hiddenWord.join(" ");

        function checkGuess() {
            var guess = guessInput.value.toLowerCase();

            if (guess.length !== 1) {
                message.innerHTML = "Bitte geben Sie nur einen Buchstaben ein.";
                return;
            }

            if (guessedLetters.includes(guess)) {
                message.innerHTML = "Du hast diesen Buchstaben bereits geraten.";
                return;
            }

            guessedLetters.push(guess);

            if (randomWord.includes(guess)) {
                for (var j = 0; j < randomWord.length; j++) {
                    if (randomWord[j] === guess) {
                        hiddenWord[j] = guess;
                    }
                }
                wordElement.innerHTML = hiddenWord.join(" ");

                if (!hiddenWord.includes("_")) {
                    message.innerHTML = "Herzlichen Glückwunsch! Du hast das Wort richtig geraten!";
                    message.style.color = "green";
                    guessInput.disabled = true;
                    guessInput.style.display = "none";
                    submitButton.disabled = true;
                } else {
                    message.innerHTML = "";
                }
            } else {
                wrongGuesses++;
                wrongGuessesElement.innerHTML = wrongGuesses;

                if (wrongGuesses === 1) {
                    hangmanImage.src = "hangman_1.png";
                } else if (wrongGuesses === 2) {
                    hangmanImage.src = "hangman_2.png";
                } else if (wrongGuesses === 3) {
                    hangmanImage.src = "hangman_3.png";
                } else if (wrongGuesses === 4) {
                    hangmanImage.src = "hangman_4.png";
                } else if (wrongGuesses === 5) {
                    hangmanImage.src = "hangman_5.png";
                } else if (wrongGuesses === 6) {
                    hangmanImage.src = "hangman_6.png";
                    message.innerHTML = "Spiel vorbei! Du hast keine Versuche mehr. Das Wort war: " + randomWord;
                    message.style.color = "red";
                    guessInput.disabled = true;
                    guessInput.style.display = "none";
                    submitButton.disabled = true;
                } else {
                    message.innerHTML = "Falscher Versuch. Versuche es erneut.";
                }
            }

            guessInput.value = "";
        }
        

        function restartGame() {
            randomWord = words[Math.floor(Math.random() * words.length)];
            hiddenWord = [];
            guessedLetters = [];
            wrongGuesses = 0;

            for (var k = 0; k < randomWord.length; k++) {
                hiddenWord.push("_");
            }

            wordElement.innerHTML = hiddenWord.join(" ");
            wrongGuessesElement.innerHTML = wrongGuesses;
            hangmanImage.src = "hangman_0.png";
            message.innerHTML = "";
            message.style.color = "green";
            guessInput.disabled = false;
            guessInput.style.display = "inline";
            submitButton.disabled = false;
            guessInput.value = "";
        }
        guessInput.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                checkGuess();
            }
        });