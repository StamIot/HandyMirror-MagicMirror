Module.register("MMM-Tda", {
	// Définition des propriétés du module
	defaults: {
		taches: [
			{ nom: "Tâche 1", duree: 120 },
			{ nom: "Tâche 2", duree: 20 },
			{ nom: "Tâche 3", duree: 30 }
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
			item.addEventListener(
				"click",
				function (tache) {
					return function () {
						this.startTimer(tache);
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
		timerWrapper.classList.add("timer-wrapper"); // Ajout de la classe timer-wrapper
		timerWrapper.innerHTML = "Minuteur : " + tache.duree + " secondes";
		this.currentTimer = setInterval(
			function () {
				tache.duree--;
				timerWrapper.innerHTML = "Minuteur : " + tache.duree + " secondes";
				if (tache.duree == 0) {
					this.endTimer(timerWrapper, tache);
				}
			}.bind(this),
			1000
		);

		this.sendNotification("SHOW_ALERT", {
			type: "notification",
			message: "Minuteur démarré pour la tâche : " + tache.nom,
			timer: tache.duree * 1000
		});

		var wrapper = document.querySelector(".region.middle.center");
		wrapper.appendChild(timerWrapper);
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
	removeTask: function (tache) {
		var list = document.querySelector("ul");
		var items = list.getElementsByTagName("li");
		for (var i = 0; i < items.length; ++i) {
			if (items[i].innerHTML === tache.nom) {
				list.removeChild(items[i]);
				break;
			}
		}
	}
});
