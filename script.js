(function(){
let containerDeQuestion = document.querySelector(".containerDeQuestions")
let ecranDeBienvenue = document.querySelector(".ecranDeBienvenue")
let ecranDeResultat = document.querySelector(".ecranDeResultat")
let imageReussite = document.getElementById("reussite");
let afficherPrenom = document.querySelector(".prenomUtilisateurs")
let afficherEmail = document.querySelector(".emailDesUtilisateurs")
let countDown = null;

function Quiz() {
    this.questions = [];
    this.reponses = {}
    this.indexQuestionRecent = 0;
    this.nombreCorrects = () => {
        let nbCorrect = 0;
        for (reponse of Object.values(this.reponses)) {
            if (reponse) nbCorrect++;
            console.log(Object.values)
        }
        return nbCorrect;
    };

    this.ecranDeResultatInitialisation = function () {
        containerDeQuestion.classList.add("hidden");
        let elNbCorrects = document.querySelector(".nombreCorrects");
        console.log(elNbCorrects);
        elNbCorrects.textContent = quiz.nombreCorrects();
        ecranDeResultat.style.display = "flex";
    }

    //affiche mes questions recents 0 à l'infinie
    this.afficherQuestionRecent = function () {
        if (this.indexQuestionRecent < this.questions.length) {
            this.questions[this.indexQuestionRecent].getElement(this.indexQuestionRecent + 1, this.questions.length);
        }
        else {
            this.ecranDeResultatInitialisation();
        }
    }

    this.obtenirResultat = function () {
        this.ecranDeResultatInitialisation();
        this.afficheResultatQuitter();
    }

    this.afficheResultatQuitter = function () {
        this.printResult();
        if ((quiz.nombreCorrects() / quiz.questions.length) >= 0.5) {
            console.log("Success");
            imageReussite.src = "reussite.png";
        }
        else {
            console.log("Fail");
            imageReussite.src = "echec.png";
        }

    }
    this.getResultSuccessOrFailled = function () {
        if (quiz.indexQuestionRecent == quiz.questions.length) {
            ("Cheking...");
            this.afficheResultatQuitter();
        }
    }
    this.printResult = function () {

        formulaireDeQuestions.innerHTML = '';
        quiz.indexQuestionRecent++;
        quiz.afficherQuestionRecent();

        afficherPrenom.textContent = username.value
        afficherEmail.textContent = email.value
        afficherPrenom.classList.add("centerPrenom")
    }
    this.addQuestion = function (question) {
        this.questions.push(question)
    };
}


function Question(title, answers, answersCorrect, questionIndex) {
    this.title = title;
    this.answers = answers;
    this.answersCorrect = answersCorrect;
    // pour tous mes objet question il y'auras cette affichage
    this.getElement = function (indexQuestion, nombreQuestions) {
        let questionTitle = document.createElement("h2")
        questionTitle.classList.add("titreQuestion")
        questionTitle.textContent = this.title
        formulaireDeQuestions.prepend(questionTitle)
        containerDeQuestion.append(formulaireDeQuestions)
        let flexMesLabel = document.createElement("div")
        flexMesLabel.classList.add("divFlexLabel")
        questionTitle.after(flexMesLabel)
        let spanQuestion = document.createElement("span")
        flexMesLabel.appendChild(spanQuestion)
        spanQuestion.classList.add("labelQuestion")
        spanQuestion.textContent = "Question " + indexQuestion + "/" + nombreQuestions;

        let spanTimer = document.createElement("span")
        flexMesLabel.appendChild(spanTimer)
        spanTimer.classList.add("labelTimer")
        spanTimer.textContent = "🕖 60s"
        let progress = document.createElement('div')
        progress.classList.add("progress")

        let progressInner = document.createElement("div")
        progressInner.classList.add("progressInner")
        progress.style.borderRadius = "49px"
        progressInner.style.borderRadius = "49px"
        formulaireDeQuestions.appendChild(progress)
        progress.appendChild(progressInner)
        let interval = 60
        if (countDown) {
            clearInterval(countDown);
        }
        countDown = setInterval(() => {
            interval--
            let progressWidth = interval / 60 * 100

            if (interval > 0) {
                document.querySelector(".progressInner").style.width = progressWidth + "%"
                document.querySelector(".labelTimer").innerHTML = interval + " s"
            }
            else {
                clearInterval(countDown)
                document.querySelector(".progressInner").style.width = "0%"

                document.querySelector(".progress").style.border = "none"
                document.querySelector(".labelTimer").innerHTML = "Désolé Le temps est Ecoulé"
                document.querySelector(".labelTimer").style.color = "red"
                document.querySelector(".progress").border = "none"
                quiz.printResult()
            }
        }, 1000)

        let inputsContainer = document.createElement("div")

        // affiche toutes mes  reponses ainsi que leurs indices
        this.answers.forEach((answer, index) => {
            formulaireDeQuestions.append(inputsContainer)


            let inputContainer = document.createElement("div")
            inputContainer.classList.add("reponseQuestion")
            inputsContainer.append(inputContainer)
            let elementInputRadio = document.createElement('input')
            elementInputRadio.setAttribute("type", "radio");
            elementInputRadio.setAttribute("name", "choix")
            elementInputRadio.setAttribute("id", "formulaireQuestionRadio")
            let elementLabelDeInputRadio = document.createElement("label")
            elementLabelDeInputRadio.setAttribute("for", "formulaireQuestionRadio")
            elementLabelDeInputRadio.setAttribute("name", "choix")
            elementLabelDeInputRadio.textContent = answer
            console.log(index);
            elementInputRadio.id = `id${index + 1}`;// index comme parametre recupere les indices du tableau answer 
            inputContainer.append(elementInputRadio)
            inputContainer.append(elementLabelDeInputRadio)
            //si tu clique sur le reponseQuestion

            elementInputRadio.addEventListener("change", (event) => {

                const reponse = this.checkAnswer(event);
                console.log("Est la reponse correcte ", reponse);

                buttonSuivant.disabled = false;
                if(quiz.indexQuestionRecent == quiz.questions.length-1){
                    buttonSuivant.textContent="terminer"
                }
                buttonSuivant.style.opacity = "1"

                if (document.querySelector('.brGreen')) {
                    document.querySelector('.brGreen').classList.remove('brGreen');
                }

                inputContainer.classList.add('brGreen');
            });


        });

        let buttonsContainer = document.createElement("div")
        buttonsContainer.classList.add("flexButton")
        formulaireDeQuestions.append(buttonsContainer)

        let buttonQuitter = document.createElement("button")
        buttonQuitter.classList.add("exitButton")
        buttonQuitter.textContent = "quitter"
        buttonsContainer.append(buttonQuitter)
        let buttonSuivant = document.createElement("button")
        buttonSuivant.classList.add("suivantButton")
        buttonSuivant.textContent = "suivant"
        buttonsContainer.append(buttonSuivant)
        buttonSuivant.disabled = true;
        buttonSuivant.style.opacity = "0.6"
        buttonAccueil = document.getElementById("accueilButton")

        buttonQuitter.addEventListener('click', () => {
            quiz.obtenirResultat()
            containerDeQuestion.style.display = 'none'
        });
        buttonAccueil.addEventListener('click', () => {
            window.location.reload()
        });
        buttonSuivant.addEventListener('click', () => {
            quiz.printResult()
            if (quiz.indexQuestionRecent === quiz.questions.length) {
                buttonSuivant.textContent="Terminer"
                quiz.afficheResultatQuitter();
            }
        })
    }
    this.addAnswer = function (answer) {
        this.answers.push(answer)
    };
    // e.target recupere mon cible que j'ai choisit et test si id de ma reponse cliquez egale à la valeurs de answerCorrect alors nombreCorrect s'incremente +1
    this.checkAnswer = (e) => {
        let answerSelected = e.target;
        console.log("Avant", quiz.reponses, " Nb bon: ", quiz.nombreCorrects());
        if (this.isCorrectAnswer
            (answerSelected.id)) {
            quiz.reponses[questionIndex] = true;
            console.log();

            console.log("Après", quiz.reponses, " Nb bon: ", quiz.nombreCorrects());
            return true;
        }
        quiz.reponses[questionIndex] = false;
        console.log("Après", quiz.reponses, " Nb bon: ", quiz.nombreCorrects());
        return false;
    }
    this.isCorrectAnswer = function (answerUser) {
        return answerUser == this.answersCorrect;
    }
};
let quiz = new Quiz()

const questionsObject = [
    {
        question: "quel est le type du fichier javas script ",
        reponses: [".js", ".jxs", ".jp", "jj"],
        reponseId: "id1"
    },
    {
        question: "quel est le créateur du java script? ",
        reponses: ["brendan", "simon kimbangu volé par le blanc", "gracius", "bill gate"],
        reponseId: "id1"
    },
    {
        question: "ce quoi java script ",
        reponses: ["c'est un langage orienté objet il rend l'html dynamique(dhtml)", "c'est langage compilé pour concevoir les application desktop ", "c'est ne pas un langage juste un frame work java", "abr"],
        reponseId: "id1"
    },
    {
        question: "JavaScript est-il un langage sensible à la casse? ",
        reponses: ["abr", "non ", "oui", "pas vraiment"],
        reponseId: "id3"
    },
    {
        question: " À quoi sert la fonction isNaN? ",
        reponses: ["renvoie true si l'argument est un nombre", "renvoie true si l'argument n'est pas un nombre ", "abr", "renvoie false si l'argument est n'est pas un nombre"],
        reponseId: "id2"
    },
    {
        question: " comment declarer une variable avec une portée local? ",
        reponses: ["let a", "var a ", "a", "const a"],
        reponseId: "id2"
        
    },
    {
        question: "  Qui est le plus rapide, JavaScript ou ASP,node js? ",
        reponses: ["ASP", "javascript", "sont pareil", "node js"],
        reponseId: "id2"
        
    },
    {
        question: " comment declarer une variable avec une portée global? ",
        reponses: ["let a", "var a ", "a", "const a"],
        reponseId: "id3"
        
    },
    {
        question: " parmis ce declaration des fonction le quel l'hosting n'est pas appliqué? ",
        reponses: [" function nomFonction(){}", " function()=>{} ", "var speak=function(){}", "abr"],
        reponseId: "id3"
        
    },
    {
        question: "  Quelle est la différence entre « undefined » et « null » en JavaScript? ",
        reponses: ["pas different", "abr"," undefined et null sont deux types distincts: undefined est un type indéfini tandis que null est un objet.","parfois"],
        reponseId: "id2"
        
    },
    {
        question: "  Quelle entreprise a développé JavaScript? ",
        reponses: ["microsoft", "apple","google","netscape"],
        reponseId: "id4"
        
    },
    {
        question: " De combien de façons un code JavaScript peut-il être intégré dans un fichier HTML?",
        reponses: ["2 façons", "4 façons","trois façons","abr"],
        reponseId: "id4"
        
    },
    {
        question: "   A quoi sert le mot-clé « this » en JavaScript? ",
        reponses: ["sert à rien", "il fait reference à l'objet actuel","pointer une variable","abr"],
        reponseId: "id2"
        
    },
    {
        question: "  C'est quoi un prototype ",
        reponses: ["c'est quand un objet herite des proprietés et methode d'un autre objet "," Une propriété est une caractéristique d'un objet qui décrit souvent des attributs associés à une structure de données. ","abr"],
        reponseId: "id1"
        
    },
    {
        question: "Que renvoie l’ex´ecution du code alert(4 >= 4 && (2 > 3 || (6%3 < 1))) ; ? ",
        reponses: ["erreur "," Undefined ","false","true"],
        reponseId: "id4"    
    }, 

];
for (let i = 0; i < questionsObject.length; i++) {
    const elementQuestion = questionsObject[i];
    const q = new Question(elementQuestion.question, elementQuestion.reponses, elementQuestion.reponseId, i);
    quiz.addQuestion(q);
}

// dynamisation des mes elements variables
let reponse = document.querySelectorAll(".reponse")
console.log(reponse);
let elNombreCorrects = document.querySelectorAll(".nombreCorrects")
console.log(elNombreCorrects)
elNombreCorrects.forEach(function (nombreCorrect) {
    nombreCorrect.textContent = quiz.nombreCorrects();
})
let elNombreQuestions = document.querySelectorAll(".nombreQuestions")
console.log(elNombreQuestions);
elNombreQuestions.forEach(function (nombreQuestion) {
    nombreQuestion.textContent = quiz.questions.length;
})
const formulairePrincipal = document.getElementById('formulairePrincipal');
const username = document.getElementById('username');
const email = document.getElementById
    ('email');
const formulaireDeQuestions = document.getElementById("formulaireDeQuestions")
const container2 = document.getElementsByClassName("containerDeQuesrtion")
const beginButton = document.getElementById("beginButton")
const ring = () => {
    const audio = new Audio()
    audio.src = "./suspect.mp3"
    audio.play()
}
formulairePrincipal.addEventListener('submit', e => {
    e.preventDefault();
    const name = formulairePrincipal.elements[0].value;
    const email = formulairePrincipal.elements[1].value;
    validateInputs()
})
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    if (usernameValue === '') {
        setError(username, "N'oublie pas de renseigner ce champs");
    } else {
        setSuccess(username);
    }
    if (emailValue === '') {
        setError(email, "N'oublie pas de rensigner ce champs avant e commencer le quiz");
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'veuillez entrer un adresse mail valide');
    } else {
        setSuccess(email);
    }
    if ((usernameValue !== '') && (emailValue !== '') && (isValidEmail(emailValue))) {
        ecranDeBienvenue.style.display = "none"
        containerDeQuestion.style.display = "block"
        console.log(ecranDeResultat)
        console.log(containerDeQuestion);
        console.log(ecranDeBienvenue);
        quiz.afficherQuestionRecent()

    }
}
})()

