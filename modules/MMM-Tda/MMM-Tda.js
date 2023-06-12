Module.register("MMM-Tda", {
  // Définition des propriétés du module
  defaults: {
    taches: [
      { nom: "Tâche 1", duree: 120, dureeInitiale: 120 },
      { nom: "Tâche 2", duree: 20, dureeInitiale: 20 },
      { nom: "Tâche 3", duree: 30, dureeInitiale: 30 }
    ]
  },

  // Fonction appelée lors du démarrage du module
  start: function () {
    Log.info("Module tache démarré");
  },

  getStyles: function () {
    return ["MMM-Tda.css"];
  },

  // Fonction appelée lors de la génération du DOM pour le module
  getDom: function () {
    var wrapper = document.createElement("div");

    // Génération de la liste de tâches
    var list = document.createElement("ul");
    for (var i = 0; i < this.config.taches.length; i++) {
      var tache = this.config.taches[i];
      var item = document.createElement("li");
      item.innerHTML = tache.nom;

      // Ajouter l'attribut data-tache
      item.setAttribute("data-tache", tache.nom);

      item.addEventListener(
        "click",
        function (tache) {
          return function () {
            this.startTimer(tache);
            this.removeTaskElement(tache);
          }.bind(this);
        }.bind(this)(tache)
      );
      list.appendChild(item);
    }
    wrapper.appendChild(list);

    return wrapper;
  },

  // Fonction appelée lors du démarrage d'un minuteur pour une tâche
  startTimer: function (tache) {
    Log.info("Démarrage du minuteur pour la tâche : " + tache.nom);

    var timerWrapper = document.createElement("div");
    timerWrapper.classList.add("timer-wrapper");

    var timerCircle = document.createElement("div");
    timerCircle.classList.add("timer-circle");

    var timerText = document.createElement("div");
    timerText.classList.add("timer-text");

    timerWrapper.appendChild(timerCircle);
    timerWrapper.appendChild(timerText);

    this.currentTimer = setInterval(
      function () {
        tache.duree--;

        // Afficher le temps restant au format "m:s"
        timerText.innerHTML = this.formatTime(tache.duree);

        var percent = (tache.duree / tache.dureeInitiale) * 100;
        timerCircle.style.strokeDashoffset = (251 - (251 * percent) / 100).toFixed(2);

        if (tache.duree == 0) {
          this.endTimer(timerWrapper, tache);
        }
      }.bind(this),
      1000
    );

    var wrapper = document.querySelector(".region.middle.center");
    wrapper.appendChild(timerWrapper);

    // Supprimer la tâche du tableau this.config.taches
    var index = this.config.taches.indexOf(tache);
    if (index !== -1) {
      this.config.taches.splice(index, 1);
    }
  },

  // Fonction pour formater le temps en minutes:secondes
  formatTime: function (seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;

    return m + ":" + this.padZero(s);
  },

  // Fonction pour ajouter un zéro devant les chiffres inférieurs à 10
  padZero: function (num) {
    return num < 10 ? "0" + num : num;
  },

  // Fonction appelée à la fin du minuteur pour une tâche
  endTimer: function (timerWrapper, tache) {
    clearInterval(this.currentTimer);
    this.currentTimer = null;
    timerWrapper.parentNode.removeChild(timerWrapper);
    this.sendNotification("SHOW_ALERT", {
      type: "notification",
      message: "Minuteur terminé pour la tâche : " + tache.nom
    });
    this.removeTask(tache); // Appel de la fonction removeTask avec la tâche comme argument
    timerWrapper.classList.add("finished"); // Ajout de la classe finished
  },

  // Fonction appelée pour effacer une tâche terminée de la liste de tâches
  removeTaskElement: function (tache) {
    var list = document.querySelector("ul");
    var items = list.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      var tacheName = item.getAttribute("data-tache");
      if (tacheName === tache.nom) {
        list.removeChild(item);
        break;
      }
    }
  }
});
