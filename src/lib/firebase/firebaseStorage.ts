import { getFirestore, addDoc, getDocs, collection as getCollection, connectFirestoreEmulator } from 'firebase/firestore';
import { app } from './firebaseApp';
import { Collection } from './types';

const db = getFirestore(app);
if (NODE_ENV === 'development') {
	console.log('USING EMULATOR FIRESTORE');
	connectFirestoreEmulator(db, 'localhost', 8080);
} else {
	console.log('USING EXTERNAL FIRESTORE');
}

export async function saveOne<T>(collection: Collection, item: T): Promise<string> {
	const { id } = await addDoc(getCollection(db, collection), item);
	return id;
}

interface IIndexedType {
	id: string;
}

export async function getAll<T extends IIndexedType>(collection: Collection): Promise<T[]> {
	const querySnapshot = await getDocs(getCollection(db, collection));
	return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as T);
}
