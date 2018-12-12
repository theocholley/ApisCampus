#Documentation API :
**Partie Swarms (essaims)**
* addSwarm : `/addSwarm/:latitude/:longitude/:date/:hour/:feature/:height/:description/:county/:numberObs/:size/:insectType/:pic`
_Permet d'ajouter un essaim dans la base de données_

* getSwarms : `/getSwarms`
_Permet de récupérer la liste de tous les essaims déclarés depuis la création de l'application_


* getAvailableSwarms : `/getAvailableSwarms`
_Permet de récupérer laliste des essaims disponibles_


* getMySwarms : `/getMySwarms/:numberObs`
_Permet de récupérer les essaims qu'un observateur a saisi (grâce à son numéro de téléphone qui est unique pour chaque observateur)_


* retrieve : `/retrieve/:idSwarm`
_Permet de déclarer un essaim comme récupéré_

**Partie Beekeepers (apiculteurs)**

* createBeekeeper : `/createBeekeeper/:name/:surname/:latCentre/:longCentre/:ray/:passcode/:phone/:mail`
_Permet de créer un apiculteur_


*  login : `/login/:mail/:passcode`
_Permet de se connecter via son mail et son mdp_


* getBeekeepers : `/getBeekeepers`
_Permet de récupérer la liste des apiculteurs_


**Partie réservations**

* treat : `/treat/:idApi/:idSwarm`
_Permet de réserver un essaim pendant 15h_


* getReservation : `/getReservation/:idApi`
_Permet de récupérer un objet Reservation associé à un apiculteur_
