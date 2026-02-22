import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // Added to store names, etc.
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      setLoading(true);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        
        try {
          const userDoc = await getDoc(doc(db, "users", authenticatedUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data); // SAVE EVERYTHING (firstName, lastName, etc.)
            setRole(data.role);
            console.log("Context loaded user:", data.firstName, data.lastName);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
        setRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Pass userData in the value so other screens can use it
  return (
    <GoalsContext.Provider value={{ user, userData, loading, role }}>
      {children}
    </GoalsContext.Provider>
  );
};