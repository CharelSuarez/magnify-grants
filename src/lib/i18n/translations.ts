export const translations: { [locale: string]: { [key: string]: string } } = {
	'en': {
		'homepage.title': 'Hello, World!',
		'homepage.welcome': 'Hi <strong>{{name}}</strong>, how are you?',
		'homepage.time': 'The current time is: {{time}}',
		'analytics.title': 'Analytics',
		'analytics.organization': '{{organizationName}}',
		'card.users.title': 'Users',
		'card.users.description': 'In the last month',
		'card.users.content': 'applicants',
		'card.grants.title': 'Grants Posted',
		'card.grants.description': 'In the last month',
		'card.grants.content': '37',
		'card.funding.title': 'Funding',
		'card.funding.description': 'Allocated / Total',
		'card.funding.content': '$5,530 / $15,000',
		'card.sectors.title': 'Grants per sector',
		'card.sectors.agriculture': 'Agriculture',
		'card.sectors.arts': 'Arts',
		'card.sectors.business': 'Business',
		'card.sectors.education': 'Education',
		'card.sectors.environment': 'Environment',
		'card.sectors.health': 'Health',
		'card.sectors.sciencetechnology': 'Science & Technology',
		'card.acceptanceRate.title': 'Acceptance rate',
		'card.acceptanceRate.content': '93%',
		'card.grantsPerSector.empty': 'No grants posted',
		'emailVerification.title': 'Confirm your email',
		'emailVerification.description': 'Enter the code you received in your email',
		'emailVerification.resendButton': 'Resend Code',
		'form.saveButton': 'Save',
		'form.options': 'Options',
		'form.editButton': 'Edit',
		'form.createButton': 'Create',
		'fieldType.ShortAnswer': 'Short Answer',
		'fieldType.Paragraph': 'Paragraph',
		'fieldType.MultipleChoice': 'Multiple Choice',
		'fieldType.Checkbox': 'Checkbox',
		'fieldType.Dropdown': 'Dropdown',
		'fieldType.FileUpload': 'File Upload',
		'fieldType.LinearScale': 'Linear Scale',
		'fieldType.Date': 'Date',
		'fieldType.Time': 'Time',
		'form.placeholder.name': 'Form name',
		'form.placeholder.description': 'Form description',
		'form.placeholder.question': 'Question...',
		'form.field.prompt': '{{fieldType}} Prompt',
		'form.field.options': '{{fieldType}} Options',
		'form.error': 'Error',
		'table.header.description': 'Description',
		'table.header.name': 'Name',
		'table.header.created': 'Created',
		'common.none': 'None',
		'action.delete': 'Delete',
		'table.searchPlaceholder': 'Search names or descriptions',
		'table.pagination.selectedCount': '{{count}} of {{total}} rows selected',
		'table.pagination.previous': 'Previous',
		'table.pagination.next': 'Next',
		'table.header.grant': 'Grant',
		'table.header.age': 'Age',
		'table.header.email': 'Email',
		'table.header.complete': 'Complete',
		'table.header.status': 'Status',
		'search.placeholder': 'Search anything...',
		'button.deleteAll': 'Delete All Selected',
		'pagination.selectedCount': '{{count}} of {{total}} rows selected',
		'pagination.previous': 'Previous',
		'pagination.next': 'Next',
		'table.header.title': 'Title',
		'table.header.acceptingApplications': 'Accepting Applications',
		'table.header.published': 'Published',
		'table.header.range': 'Range',
		'nav.home': 'Home',
		'body.organization': 'Organization',
		'body.grants': 'Grants',
		'body.search.grants': 'Search for Grants',
		'body.search.organizations': 'Search for Organizations',
		'body.organizations.notfound': 'No organizations found',
		'body.grants.notfound': 'No grants found',

		'nav.magnifyAccess': 'MagnifyAccess',
		'nav.logOut': 'Log out',
		'nav.login': 'Login',
		'nav.signUp': 'Sign up',
		'home.title.first': 'Grant',
		'home.title.second': 'Service',
		'home.subtitle': 'Empowering The Community',
		'home.learnMore': 'Learn More',
		'home.sectionTitle': 'Striving To Provide Equal Opportunities For All',
		'home.sectionDescription': 'We are dedicated to leveling the playing field for individuals with disabilities by providing comprehensive grant application services tailored to their unique needs. We understand the challenges that people with disabilities face in accessing resources and opportunities, and we are committed to empowering them to achieve their goals and aspirations.',
		'home.missionStatement': 'Our Mission is Simple:',
		'home.missionGoal': 'To bridge the gap between individuals with disabilities and the funding they need to thrive.',
		'footer.association': 'In Association with MagnifyAccess',
		'footer.developedBy': 'Developed by Group 17',
		'signup.title': 'Create an account',
		'signup.description': 'Fill in your details to create your account',
		'signup.terms': 'By clicking continue, you agree to our Terms of Service and Privacy Policy',
		'signup.loginInstead': 'Log in instead',
		'signup.termsOfService': 'Terms of Service',
		'signup.privacyPolicy': 'Privacy Policy',
		'form.email': 'Email',
		'form.password': 'Password',
		'form.confirmPassword': 'Confirm Password',
		'form.signup': 'Sign up',
		'profile.createTitle': 'Create your profile',
		'profile.instruction': 'Please fill in your information',
		'form.firstName': 'First name',
		'form.lastName': 'Last name',
		'form.createProfile': 'Create profile',
		'form.placeholder.firstName': 'Jane',
		'form.placeholder.lastName': 'Doe',
		'organizations.noGrantsFoundTitle': 'No Grants Found',
		'organizations.noGrantsFoundDesc': 'There are no grants posted at the moment. Please check back later.',
		'organizations.grants': 'Grants',
		'organizations.applyToday': 'Apply today!',
		'grantManagement.title': 'Grant Management',
		'grantManagement.description': 'View, filter, and action applications here!',
		'organizations.title': 'Organizations',
		'organizations.subtitle': 'View grants and apply today!',
		'organizations.viewGrants': 'View Grants',
		'logout.success': 'Logged out successfully',
		'login.title': 'Log in to your account',
		'login.signupInstead': 'Sign up instead',
		'form.login': 'Log in',
		'button.favorite': 'Favorite',
		'button.apply': 'Apply',
		'adminPanel.title': 'Admin Panel',
		'adminPanel.subtitle': 'All posted grants',
		'card.grantTitle': 'Grant Title',
		'card.organization': 'Organization',
		'card.organizationName': 'Organization Name',
		'card.shortAnswer': 'Short Answer',
		'card.question1': 'Question 1',
		'card.paragraph': 'Paragraph',
		'card.writeAnything': 'Write anything',
		'card.multipleChoice': 'Multiple Choice',
		'card.question2': 'Question 2',
		'card.question3': 'Question 3',
		'card.goBack': 'Go back',
		'card.edit': 'Edit',
		'menu.open': 'Open menu',
		'menu.actions': 'Actions',
		'menu.viewApplicants': 'View applicants',
		'menu.deleteGrant': 'Delete grant',
		'menu.editGrant': 'Edit grant',
		'menu.publishGrant': 'Publish grant',
		'menu.unpublishGrant': 'Un-publish grant',
		'menu.viewDocument': 'View Document',
		'menu.editDocument': 'Edit Document',
		'alert.title': 'Are you absolutely sure?',
		'alert.description': 'This action cannot be undone. This will permanently delete this form and remove its data from our servers.',
		'alert.cancel': 'Cancel',
		'alert.delete': 'Delete',
		'applications.filter.title': 'Filter Applications',
		'applications.filter.description': 'Populate the table with applicants that match the given criteria.',
		'applications.filter': 'Filter',
		'application.status.inProgress': 'In Progress',
		'application.status.accepted': 'Accepted',
		'application.status.rejected': 'Rejected'
	},
	'fr': {
		'homepage.title': '¡Hola Mundo!',
		'homepage.welcome': 'Hola, <strong>{{name}}</strong>, ¿cómo estás?',
		'homepage.time': 'La hora actual es: {{time}}',
		'analytics.title': 'Analytique',
		'analytics.organization': '{{organizationName}}',
		'card.users.title': 'Utilisateurs',
		'card.users.description': 'Le mois dernier',
		'card.users.content': 'candidats',
		'card.grants.title': 'Subventions publiées',
		'card.grants.description': 'Le mois dernier',
		'card.grants.content': '37',
		'card.funding.title': 'Financement',
		'card.funding.description': 'Alloué / Total',
		'card.funding.content': '5 530 $ / 15 000 $',
		'card.sectors.title': 'Subventions par secteur',
		'card.sectors.agriculture': 'Agriculture',
		'card.sectors.arts': 'Arts',
		'card.sectors.business': 'Entreprise',
		'card.sectors.education': 'Éducation',
		'card.sectors.environment': 'Environnement',
		'card.sectors.health': 'Sante',
		'card.sectors.sciencetechnology': 'Science et Technologie',
		'card.grantsPerSector.empty': 'Aucun subventions publiées',
		'card.acceptanceRate.title': 'Taux d\'acceptation',
		'card.acceptanceRate.content': '93 %',
		'emailVerification.title': 'Confirmez votre email',
		'emailVerification.description': 'Entrez le code que vous avez reçu dans votre email',
		'emailVerification.resendButton': 'Renvoyer le code',
		'form.saveButton': 'Enregistrer',
		'form.options': 'Options',
		'form.editButton': 'Modifier',
		'form.createButton': 'Créer',
		'fieldType.ShortAnswer': 'Réponse courte',
		'fieldType.Paragraph': 'Paragraphe',
		'fieldType.MultipleChoice': 'Choix multiple',
		'fieldType.Checkbox': 'Case à cocher',
		'fieldType.Dropdown': 'Menu déroulant',
		'fieldType.FileUpload': 'Téléversement de fichier',
		'fieldType.LinearScale': 'Échelle linéaire',
		'fieldType.Date': 'Date',
		'fieldType.Time': 'Heure',
		'form.placeholder.name': 'Nom du formulaire',
		'form.placeholder.description': 'Description du formulaire',
		'form.placeholder.question': 'Interrogation...',
		'form.field.prompt': 'Invite pour {{fieldType}}',
		'form.field.options': 'Options pour {{fieldType}}',
		'form.error': 'Erreur',
		'table.header.description': 'Description',
		'table.header.name': 'Nom',
		'table.header.created': 'Créé',
		'common.none': 'Aucun',
		'action.delete': 'Supprimer',
		'table.searchPlaceholder': 'Rechercher des noms ou des descriptions',
		'table.pagination.selectedCount': '{{count}} sur {{total}} lignes sélectionnées',
		'table.pagination.previous': 'Précédent',
		'table.pagination.next': 'Suivant',
		'table.header.grant': 'Subvention',
		'table.header.age': 'Âge',
		'table.header.email': 'E-mail',
		'table.header.complete': 'Complète',
		'table.header.status': 'Statut',
		'search.placeholder': 'Rechercher n\'importe quoi...',
		'button.deleteAll': 'Supprimer tous les éléments sélectionnés',
		'pagination.selectedCount': '{count} sur {total} lignes sélectionnées',
		'pagination.previous': 'Précédent',
		'pagination.next': 'Suivant',
		'table.header.title': 'Titre',
		'table.header.acceptingApplications': 'Acceptation des candidatures',
		'table.header.published': 'Publié',
		'table.header.range': 'Gamme',
		'nav.home': 'Maison',
		'body.organization': 'Organisation',
		'body.grants': 'Subventions',
		'body.search.grants': 'Rechercher des subventions',
		'body.search.organizations': 'Rechercher des organisations',
		'body.organizations.notfound': 'Aucune organisation trouvée',
		'body.grants.notfound': 'Aucune subvention trouvée',
		'nav.magnifyAccess': 'MagnifyAccess',
		'nav.logOut': 'Déconnexion',
		'nav.login': 'Connexion',
		'nav.signUp': 'Inscription',
		'home.title.first': 'Service de',
		'home.title.second': 'Subvention',
		'home.subtitle': 'Valoriser la Communauté',
		'home.learnMore': 'En savoir plus',
		'home.sectionTitle': 'S\'efforcer de Fournir des Opportunités Égales pour Tous',
		'home.sectionDescription': 'Nous nous engageons à égaliser les chances pour les personnes handicapées en fournissant des services complets de demande de subvention adaptés à leurs besoins uniques. Nous comprenons les défis auxquels les personnes handicapées sont confrontées pour accéder aux ressources et opportunités, et nous nous engageons à les autonomiser pour atteindre leurs objectifs et aspirations.',
		'home.missionStatement': 'Notre mission est simple :',
		'home.missionGoal': 'Combler le fossé entre les personnes handicapées et le financement dont elles ont besoin pour prospérer.',
		'footer.association': 'En association avec MagnifyAccess',
		'footer.developedBy': 'Développé par le Groupe 17',
		'signup.title': 'Créer un compte',
		'signup.description': 'Remplissez vos coordonnées pour créer votre compte',
		'signup.terms': 'En cliquant sur continuer, vous acceptez nos Conditions d\'utilisation et la Politique de confidentialité',
		'signup.loginInstead': 'Se connecter à la place',
		'signup.termsOfService': 'Conditions d\'utilisation',
		'signup.privacyPolicy': 'Politique de confidentialité',
		'form.email': 'E-mail',
		'form.password': 'Mot de passe',
		'form.confirmPassword': 'Confirmer le mot de passe',
		'form.signup': 'S\'inscrire',
		'profile.createTitle': 'Créez votre profil',
		'profile.instruction': 'Veuillez remplir vos informations',
		'form.firstName': 'Prénom',
		'form.lastName': 'Nom',
		'form.createProfile': 'Créer le profil',
		'form.placeholder.firstName': 'Jane',
		'form.placeholder.lastName': 'Doe',
		'organizations.noGrantsFoundTitle': 'Aucun subventions trouvé',
		'organizations.noGrantsFoundDesc': 'Il n\'y a aucun subventions publiées pour le moment. Veuillez revenez plus tard.',
		'organizations.grants': 'Subventions',
		'organizations.applyToday': 'Postulez dès aujourd\'hui !',
		'organizations.subtitle': 'Consultez les subventions et postulez dès aujourd\'hui !',
		'organizations.viewGrants': 'Voir les subventions',
		'grantManagement.title': 'Gestion des Subventions',
		'grantManagement.description': 'Consultez, filtrez et gérez les demandes ici !',
		'logout.success': 'Déconnexion réussie',
		'login.title': 'Connectez-vous à votre compte',
		'login.signupInstead': 'S\'inscrire à la place',
		'form.login': 'Connexion',
		'button.favorite': 'Favori',
		'button.apply': 'Postuler',
		'adminPanel.title': 'Panneau d\'Administration',
		'adminPanel.subtitle': 'Toutes les subventions publiées',
		'card.grantTitle': 'Titre de la subvention',
		'card.organization': 'Organisation',
		'card.organizationName': 'Nom de l\'organisation',
		'card.shortAnswer': 'Réponse courte',
		'card.question1': 'Question 1',
		'card.paragraph': 'Paragraphe',
		'card.writeAnything': 'Écrivez quelque chose',
		'card.multipleChoice': 'Choix multiple',
		'card.question2': 'Question 2',
		'card.question3': 'Question 3',
		'card.goBack': 'Retour',
		'card.edit': 'Éditer',
		'menu.open': 'Ouvrir le menu',
		'menu.actions': 'Actions',
		'menu.viewApplicants': 'Voir les candidats',
		'menu.deleteGrant': 'Supprimer la subvention',
		'menu.editGrant': 'Modifier la subvention',
		'menu.publishGrant': 'Publier la subvention',
		'menu.unpublishGrant': 'Retirer la publication',
		'menu.viewDocument': 'Voir le document',
		'menu.editDocument': 'Modifier le document',
		'alert.title': 'Êtes-vous absolument sûr ?',
		'alert.description': 'Cette action est irréversible. Cela supprimera définitivement ce formulaire et retirera ses données de nos serveurs.',
		'alert.cancel': 'Annuler',
		'alert.delete': 'Supprimer',
		'applications.filter.title': 'Filtrer les candidatures',
		'applications.filter.description': 'Remplissez le tableau avec les candidats qui correspondent aux critères donnés.',
		'applications.filter': 'Filtrer',
		'application.status.inProgress': 'En cours',
		'application.status.accepted': 'Accepté',
		'application.status.rejected': 'Rejeté'
	}
};

