import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

const analytics = firebase.analytics()
analytics.logEvent('notification_received')

export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const firebaseAuth = firebase.auth()