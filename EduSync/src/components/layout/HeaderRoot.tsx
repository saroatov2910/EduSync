// src/components/layout/Header.tsx
import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type NavItem = { label: string; to: string };

// כאן תתאים את הרשימה למסכים שלך
const navItems: NavItem[] = [
  { label: 'בית', to: '/' },
  { label: 'סטודנטים', to: '/students' },        // Student.tsx
  { label: 'תורים', to: '/appointments' },        // Appointment.tsx
  { label: 'בקשות', to: '/requests' },            // Request.tsx
  { label: 'טיפול פניות', to: '/care' },          // CareHandle.tsx
  { label: 'צור קשר', to: '/contact' },           // ContactMsg.tsx
  { label: 'עזרה', to: '/help' },                 // Help page (אם יש)
  // תוכל להוסיף כאן Management / Forms לפי התכנון
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const toggleDrawer = () => setMobileOpen((prev) => !prev);
  const isActive = (to: string) => location.pathname === to;

  // Drawer למובייל
  const drawer = (
    <Box
      role="presentation"
      onClick={toggleDrawer}
      sx={{ width: 280, textAlign: 'right', direction: 'rtl' }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        EduSync
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              selected={isActive(item.to)}
              sx={{ textAlign: 'right' }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Toolbar sx={{ gap: 1, direction: 'rtl' }}>
          {/* המבורגר למובייל */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ ml: 1, display: { xs: 'inline-flex', sm: 'none' } }}
            aria-label="פתח תפריט"
          >
            <MenuIcon />
          </IconButton>

          {/* לוגו/כותרת */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EduSync
          </Typography>

          {/* קישורי טופ-בר לדסקטופ */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flexWrap: 'wrap' }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                sx={{
                  fontSize: 16,
                  color: isActive(item.to) ? 'primary.main' : 'text.primary',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer למובייל */}
      <Drawer
        anchor="right"             // נוח ל‑RTL
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}