import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInAnonymously, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Auth helpers
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginAsGuest = async (name: string) => {
  const { user } = await signInAnonymously(auth);
  await updateProfile(user, {
    displayName: name,
    photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
  });
  return user;
};
export const logout = () => signOut(auth);

// Firestore helpers
export const saveResult = async (userId: string, displayName: string, photoURL: string, category: string, scores: any) => {
  const totalPoints = Object.values(scores).reduce((a: number, b: number) => a + b, 0);
  try {
    await addDoc(collection(db, 'results'), {
      userId,
      displayName,
      photoURL,
      category,
      totalPoints,
      scores,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving result:", error);
    throw error;
  }
};

export const subscribeToLeaderboard = (callback: (results: any[]) => void) => {
  const q = query(collection(db, 'results'), orderBy('totalPoints', 'desc'), limit(12));
  return onSnapshot(q, (snapshot) => {
    const results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(results);
  }, (error) => {
    console.error("Leaderboard subscription error:", error);
  });
};

// Global Chat
export const sendMessage = async (userId: string, displayName: string, photoURL: string, text: string) => {
  try {
    await addDoc(collection(db, 'messages'), {
      userId,
      displayName,
      photoURL,
      text,
      timestamp: serverTimestamp()
    });
    
    // Cleanup: keep only 34 messages
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.size > 34) {
      const docsToDelete = snapshot.docs.slice(34);
      for (const d of docsToDelete) {
        await deleteDoc(doc(db, 'messages', d.id));
      }
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const subscribeToChat = (callback: (messages: any[]) => void) => {
  const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'), limit(34));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  }, (error) => {
    console.error("Chat subscription error:", error);
  });
};
