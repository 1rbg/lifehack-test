import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Item } from '../types';

interface ItemListProps {
  onEdit: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ onEdit }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Item[];
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'items', id));
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Box>
      <Typography variant="h6">Items</Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={item.description} />
            <IconButton edge="end" onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ItemList;
