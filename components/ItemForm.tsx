import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Item } from '../types';

interface ItemFormProps {
  item: Item | null;
  onSave: () => void;
}

export default function ItemForm({ item, onSave }: ItemFormProps) {
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [item]);

  const handleSubmit = async () => {
    if (item) {
      const docRef = doc(db, 'items', item.id);
      await updateDoc(docRef, { name, description });
    } else {
      await addDoc(collection(db, 'items'), { name, description });
    }
    onSave();
  };

  return (
    <Box>
      <Typography variant="h6">{item ? 'Edit Item' : 'Add Item'}</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {item ? 'Update' : 'Add'}
      </Button>
    </Box>
  );
}
