import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase'; // Đường dẫn đến file cấu hình Firebase

export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, 'categories'), {
        name: categoryName,
      });
      console.log('Category added with ID: ', docRef.id);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  return (
    <div>
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
