const mockCollection: unknown[] = [];

jest.mock('firebase/firestore', () => ({
	getFirestore: jest.fn(),
	addDoc: jest.fn().mockImplementation((doc: unknown) => {
		mockCollection.push(doc);
		return mockCollection.length;
	}), 
	getDocs: jest.fn().mockImplementation(() => [...mockCollection]),
	collection: 'mock',
}));

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(), 
}));