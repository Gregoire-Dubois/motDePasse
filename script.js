class PassWordGenerator {
    constructor(progressBar, progress) {
        this.progressBar = document.querySelector(progressBar);
        this.progress = document.querySelector(progress);
        this.lengthPassWord = 0;
        this.choiceUpperCase = false;
        this.choiceLowerCase = false;
        this.choiceNumber = false;
        this.choiceSpecialsCar = false;
        this.progressNumber = 0;
        this.validateCheckBox = 0;
        this.resultPass = [];

        this.progressBarValue().then(() => {
            this.monitoringChoice();
            this.randomLetters();
        });

    }

    progressBarValue() {
        return new Promise((resolve, reject) => {
            this.progressBar.addEventListener('click', (event) => {
                const progressBarWidth = this.progressBar.offsetWidth;
                const clickX = event.offsetX;
                const progressWidth = (clickX / progressBarWidth) * 100;
                this.progress.style.width = progressWidth + '%';
                this.progressNumber = Math.round(progressWidth);
                this.randomLetters();
                resolve();
            });
        });
    }

    monitoringChoice() {
        let nbCriteria = 0;
        const compositionCheckboxes = document.querySelectorAll('input[name="composition"]');

        compositionCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    console.log('La case à cocher avec la valeur ' + checkbox.id + ' est cochée.');
                    nbCriteria++;

                    if (checkbox.id === "lower") {
                        this.choiceLowerCase = true;
                        this.randomLetters(97, 122);
                    }

                    if (checkbox.id === "upper") {
                        this.choiceUpperCase = true;
                        console.log(this.choiceUpperCase);
                        this.randomLetters(65, 90);

                    }

                    if (checkbox.id === "numbers") {
                        this.choiceNumber = true;
                        console.log(this.choiceNumber);

                        this.randomLetters(48, 57);

                    }

                    if (checkbox.id === "special") {
                        this.choiceSpecialsCar = true;
                        console.log(this.choiceSpecialsCar);
                        this.randomLetters(33, 47);

                    }
                    console.log("-->",nbCriteria);



                } else {
                    console.log('La case à cocher avec la valeur ' + checkbox.id + ' est décochée.');
                    nbCriteria--;
                    console.log("-->",nbCriteria);

                }
            });
            console.log("-->",nbCriteria);

        });
    }

    randomLetters(rangeMin, rangeMax) {
//        const x = this.progressNumber;

        const p = document.createElement("p");
        const maxCar = this.progressNumber;

        let tableauCar = [];
        let min = rangeMin;
        let max = rangeMax;

        for (let i= 0; i < maxCar; i++){
            let randomNombre = Math.floor(Math.random()*(max -min)+min);
            let carAlea = String.fromCharCode((randomNombre));
            tableauCar.push(carAlea);
        }
        document.getElementById("pass").innerText = tableauCar.join("").toString();
    }
}

const pass = new PassWordGenerator('.progress-bar', '.progress');


/*
-----------------------------------------------------------------------------------------------------------

surveiller la valeur des checkbox cochés

surveiller le valeur de la progress-bar
    récupérer la valeur de la progress-bar
        cette valeur devient le nombre max de caractères pour le password

générer le mot de passe
    déterminer sa longueur (issue de progress-bar)
    utiliser window.crypto.getRandomValues() pour chiffrer de façon poussée
    créer un tableau de longueur égale à progress-bar
    a chaque itération dans le tableau créeer alatoirement un nombre pour le convertir avec table ascii
    inserer lettre dans le tableau

    convertir tableau en string
    afficher la string en console puis la renvoyer vers ihm
 */
