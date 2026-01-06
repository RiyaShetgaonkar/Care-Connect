import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, 
  updateDoc, deleteDoc, doc,
  query, orderBy, onSnapshot 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Reference to queue collection
export const queueRef = collection(db, "queue");

// Average consultation time (minutes)
export const AVG_TIME = 10;
