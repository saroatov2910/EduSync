import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeMode } from '../../theme/useThemeMode';
import ChatBot from '../ChatBot';

type NavItem = { label: string; to: string };
const navItems: NavItem[] = [
  { label: 'בית', to: '/' },
  { label: 'סטודנטים', to: '/student' },
  { label: 'תורים', to: '/appointment' },
  { label: 'בקשות', to: '/request' },
  { label: 'טיפול פניות', to: '/carehandle' },
  { label: 'פניות משתמש', to: '/user/requests' },
  { label: 'עזרה', to: '/help' },
  { label: 'פידבק', to: '/feedback' },
];

export default function HeaderRoot() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate    = useNavigate();
  const location    = useLocation();
  const { toggleMode } = useThemeMode();
  const theme       = useTheme();
  const isDark      = theme.palette.mode === 'dark';

  const toggleDrawer       = () => setMobileOpen(o => !o);
  const handleNavigation   = (url: string) => { navigate(url); setMobileOpen(false); };
  const isActive           = (to: string) => location.pathname === to;

  const drawer = (
    <Box role="presentation" sx={{ width: 250, textAlign: 'right', direction: 'rtl' }}>
      <Typography variant="h6" sx={{ p: 2 }}>EduSync</Typography>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item.to} disablePadding>
            <ListItemText
              primary={item.label}
              onClick={() => handleNavigation(item.to)}
              sx={{
                textAlign: 'right',
                p: 2,
                cursor: 'pointer',
                color: isActive(item.to) ? 'primary.main' : 'text.primary'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <header>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="static" color="primary" elevation={0}>
            <Toolbar sx={{ gap: 1, direction: 'rtl' }}>
              {/* תפריט ב־mobile */}
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ ml: 1, display: { xs: 'inline-flex', sm: 'none' } }}
                aria-label="פתח תפריט ניווט"
              >
                <MenuIcon />
              </IconButton>

              {/* כותרת וחזרה לבית */}
              <Button
                onClick={() => navigate('/')}
                sx={{ textTransform: 'none', color: 'inherit' }}
                aria-label="חזור לעמוד הבית"
              >
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'inherit' }}>
                  EduSync
                </Typography>
              </Button>

              {/* קישורי ניווט ב־desktop */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flexWrap: 'wrap' }}>
                {navItems.map(item => (
                  <Button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    sx={{ fontSize: 16, color: 'inherit' }}
                    aria-label={`נווט אל ${item.label}`}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {/* כפתור החלפת מצב תצוגה */}
              <Tooltip title={isDark ? 'מצב בהיר' : 'מצב כהה'}>
                <IconButton onClick={toggleMode} color="inherit" aria-label="החלף מצב תצוגה">
                  {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>

          {/* Drawer ל־mobile */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={toggleDrawer}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            {drawer}
          </Drawer>
        </Box>
      </header>

      {/* כפתור AI צף בתחתית שמאל */}
      <Box
        sx={{
          position: 'fixed',
          left: 16,
          bottom: 16,
          zIndex: theme => theme.zIndex.drawer + 1
        }}
      >
        <ChatBot />
      </Box>
    </>
  );
}