import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type NavItem = { label: string; to: string };

const navItems: NavItem[] = [
  { label: 'בית', to: '/' },
  { label: 'סטודנטים', to: '/student' },
  { label: 'תורים', to: '/appointment' },
  { label: 'בקשות', to: '/request' },
  { label: 'טיפול פניות', to: '/carehandle' },
  { label: 'צור קשר', to: '/contactmsg' },
  { label: 'עזרה', to: '/help' },
  { label: 'פידבק', to: '/feedback' },
];

export default function HeaderRoot() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setMobileOpen(prev => !prev);
  const isActive = (to: string) => location.pathname === to;

  const handleNavigation = (url: string) => {
    navigate(url);
    setMobileOpen(false);
  };

  const drawer = (
    <Box role="presentation" sx={{ width: 250, textAlign: 'right', direction: 'rtl' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        EduSync
      </Typography>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item.to} disablePadding>
            <ListItemText
              primary={item.label}
              onClick={() => handleNavigation(item.to)}
              sx={{ textAlign: 'right', p: 2, cursor: 'pointer', color: isActive(item.to) ? 'primary.main' : 'text.primary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 1, direction: 'rtl' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ ml: 1, display: { xs: 'inline-flex', sm: 'none' } }}
            aria-label="פתח תפריט"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EduSync
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flexWrap: 'wrap' }}>
            {navItems.map(item => (
              <Button
                key={item.to}
                onClick={() => navigate(item.to)}
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

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"             
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}