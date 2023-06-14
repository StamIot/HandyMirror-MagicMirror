Module.register("MMM-MedicationReminder", {
    defaults: {
      medications: [
        { name: "Aspirin", dosage: "100mg" },
        { name: "Lisinopril", dosage: "10mg" },
        { name: "Metformin", dosage: "500mg" },
      ],
      reminders: [
        { medication: "Aspirin", time: "13:21" },
        { medication: "Lisinopril", time: "13:22" },
        { medication: "Metformin", time: "18:00" },
      ],
    },
  
    start: function() {
      this.scheduleReminders();
    },
  
    getStyles: function() {
        return [        "MMM-MedicationReminder.css"    ];
      },

    getScripts: function() {
      return ["moment.js"];
    },
  
    scheduleReminders: function() {
        const now = moment();
        const reminders = this.config.reminders.filter((reminder) => {
          return moment(reminder.time, "HH:mm").isSameOrAfter(now);
        });
      
        if (reminders.length > 0) {
          reminders.forEach((reminder) => {
            const medication = this.config.medications.find((med) => {
              return med.name === reminder.medication;
            });
      
            const medicationTime = moment(reminder.time, "HH:mm");
            const timeDiff = medicationTime.diff(now);
      
            const notification = {
              title: "Rappel de médicament",
              message: `Il est l'heure de prendre ${medication.name} (${medication.dosage})`,
              timer: timeDiff,
            };
            
            if (timeDiff > 0) {
                setTimeout(() => {
                    this.sendNotification("SHOW_ALERT", notification);
                }, timeDiff);
            } else {
                this.sendNotification("SHOW_ALERT", notification);
            }
        });
    }

    setTimeout(() => {
        this.scheduleReminders();
    }, 60000);
    },
});