import '@testing-library/jest-dom/extend-expect';

const mockCollection: unknown[] = [];

jest.mock('firebase/firestore', () => ({
	getFirestore: jest.fn(),
	addDoc: jest.fn().mockImplementation((doc: unknown) => {
		mockCollection.push(doc);
		return mockCollection.length;
	}), 
	getDocs: jest.fn().mockImplementation(() => ({ 
		docs: [...mockCollection],
	})),
	collection: jest.fn(),
}));

jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(), 
}));