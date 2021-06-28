import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: "",
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};


class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.database()
	}

	getAuth(){
		console.log('auth:')
		console.log(this.auth)
		return this.auth
	}
	
	getDb(){
		console.log('db:')
		console.log(this.db)
		return this.db
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	// TODO "auth/email-already-in-use"
	async registrar({ dadosUsuario }) {
		let hoje = new Date()
		console.log('firebase registrar - dadosUsuario')
		console.log(dadosUsuario)
		this.auth.createUserWithEmailAndPassword(dadosUsuario.email, dadosUsuario.senha)
		.then((resp) => {
			this.db.ref('/usuarios/' + this.auth.currentUser.uid,).set({
				name: dadosUsuario.nome,
				lastName: dadosUsuario.sobrenome,
				email: dadosUsuario.email,
				createdAt: hoje,
			})
		})
		.then((resp) => {
			this.auth.currentUser.updateProfile({
				displayName: dadosUsuario.nome,
			})
		})
		.catch((e) => {
			console.error(e)
		})
		//this.login(email, password)
		console.log('Registrar - this.auth.currentUser')
		console.log(this.auth.currentUser)
		return this.auth.currentUser
	}
   
	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	
	getCurrentUser() {
		return this.auth.currentUser/*  && this.auth.currentUser.displayName */
	}
	
	async resetPassword(email){
		return this.auth.sendPasswordResetEmail(email)
	}
}

export default new Firebase()
