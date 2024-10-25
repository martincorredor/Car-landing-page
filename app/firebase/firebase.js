import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCnPFeH_LKfTUOUuTSxEBUj50DA-3Isv9o',
  authDomain: 'car-app-8ce47.firebaseapp.com',
  projectId: 'car-app-8ce47',
  storageBucket: 'car-app-8ce47.appspot.com',
  messagingSenderId: '9657181403',
  appId: '1:9657181403:web:5f7697d4fc4060a2ae58fe',
  measurementId: 'G-SYM3Z0BYS1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Agregar un nuevo usuario
export const addUser = async ({
  firstName,
  lastName,
  document,
  department,
  city,
  phone,
  email,
  habeasData,
  userCode,
}) => {
  try {
    await addDoc(collection(db, 'users'), {
      firstName,
      lastName,
      document,
      department,
      city,
      phone,
      email,
      habeasData,
      userCode,
    });
    console.log('Usuario añadido correctamente');
  } catch (error) {
    console.error('Error añadiendo el documento: ', error);
  }
};

// Buscar un usuario por documento
export const getUserByDocument = async (document) => {
  const q = query(collection(db, 'users'), where('document', '==', document));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data(); // Retorna los datos del primer documento encontrado
  } else {
    return null; // Si no se encontró ningún documento
  }
};
