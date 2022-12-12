import fireStore, { CollectionReference, QuerySnapshot, DocumentReference } from 'firebase/firestore';
import { getAll, saveOne } from "../firebaseStorage";
import { Collection } from '../types';



describe('firebaseStorage', () => {

	const collection = ({ name: 'mockCollection' } as unknown) as CollectionReference;
	jest.spyOn(fireStore, 'collection').mockReturnValue(collection);

	it('Can save one', async () => {
		const doc = { prop: 'abc' };
		const id = 'test';
		const documentReference = ({ ...doc, id } as unknown) as DocumentReference;
		const addDocSpy = jest.spyOn(fireStore, 'addDoc').mockResolvedValue(documentReference);
		const result = await saveOne(Collection.ENTRIES, doc);
		
		expect(addDocSpy).toHaveBeenCalledWith(collection, doc);
		expect(result).toEqual(id);
	});

	it('Can get all', async () => {
		const docs = [
			{ id: 1, value: 'one'},
			{ id: 2, value: 'two' },
		];
		const querySnapshot = ({
			docs: [
				{ id: 1, data: () => ({ value: 'one' }) },
				{ id: 2, data: () => ({ value: 'two' }) }
			]
		} as unknown) as QuerySnapshot<unknown>;
		const getDocsSpy = jest.spyOn(fireStore, 'getDocs').mockResolvedValue(querySnapshot);
		const result = await getAll(Collection.ENTRIES);
		
		expect(getDocsSpy).toHaveBeenCalledWith(collection);
		expect(result).toEqual(docs);
	});

});