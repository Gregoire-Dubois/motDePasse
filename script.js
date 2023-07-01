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
               // console.log(this.progressNumber);
                this.randomLetters();
                resolve();
            });
        });
    }

    monitoringChoice() {
        let nbCriteria = 0;
        const compositionCheckboxes = document.querySelectorAll('input[name="composition"]');

        compositionCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    console.log('La case à cocher avec la valeur ' + checkbox.id + ' est cochée.');
                    nbCriteria++;
                    console.log(checkbox.id);
                    console.log(nbCriteria);
                } else {
                    console.log('La case à cocher avec la valeur ' + checkbox.id + ' est décochée.');
                    nbCriteria--;
                    console.log(nbCriteria);
                }
            });
        });
    }

    randomLetters() {
//        const x = this.progressNumber;

        const p = document.createElement("p");
        const maxCar = this.progressNumber;

        let tableauCar = [];
        let min = 65;
        let max = 90;

        for (let i= 0; i < maxCar; i++){
            let randomNombre = Math.floor(Math.random()*(max -min)+min);
            let carAlea = String.fromCharCode((randomNombre));
            tableauCar.push(carAlea);
        }
        //console.log(tableauCar);
    //        const li = document.createElement("li");
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
