import React, { useState } from 'react';
import Layout from '../components/Layout';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';
import { Item } from '../types';

export default function Dashboard() {
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  return (
    <Layout>
      <ItemForm item={editingItem} onSave={() => setEditingItem(null)} />
      <ItemList onEdit={setEditingItem} />
    </Layout>
  );
}
