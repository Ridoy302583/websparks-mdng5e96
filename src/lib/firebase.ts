import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Subscriber {
  id?: string;
  email: string;
  subscribedAt?: any;
  source?: string;
  status?: 'active' | 'unsubscribed';
  createdAt?: any;
  updatedAt?: any;
}

export const subscribeEmail = async (email: string, source: string = 'email'): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if email already exists
    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data() as Subscriber;
      
      if (existingData.status === 'active') {
        return { success: false, error: 'This email is already subscribed to our newsletter.' };
      } else {
        // Reactivate subscription
        await updateDoc(doc(db, 'subscribers', existingDoc.id), {
          status: 'active',
          subscribedAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return { success: true };
      }
    }

    // Add new subscriber
    await addDoc(collection(db, 'subscribers'), {
      email,
      source,
      status: 'active',
      subscribedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error subscribing email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to subscribe. Please try again.' 
    };
  }
};

export const getSubscriberCount = async (): Promise<number> => {
  try {
    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('status', '==', 'active'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    return 0;
  }
};
