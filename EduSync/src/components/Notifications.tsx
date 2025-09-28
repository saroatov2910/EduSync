import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface Props {
  handlerId: string;
}

export default function Notifications({ handlerId }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!handlerId) return;

    const q = query(
      collection(db, 'notifications'),
      where('handlerId', '==', handlerId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs: Notification[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, [handlerId]);

  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  };

  if (notifications.length === 0) return null;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">Notifications</Typography>
      <List>
        {notifications.map(n => (
          <ListItem key={n.id} button onClick={() => markAsRead(n.id)}>
            <ListItemText
              primary={n.message}
              secondary={n.read ? 'Read' : 'New'}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
