import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../theme/useThemeMode';

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
    <header>
      <Box role="presentation" sx={{ width: 250, textAlign: 'right', direction: 'rtl' }} aria-label="תפריט צד ניווט">
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
                sx={{
                  textAlign: 'right',
                  p: 2,
                  cursor: 'pointer',
                  color: isActive(item.to) ? 'primary.main' : 'text.primary'
                }}
                aria-label={`נווט אל ${item.label}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </header>
  );

  const { toggleMode } = useThemeMode();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <header>
      <Box sx={{ display: 'flex' }}>
        {/* שינוי כאן: color="primary" כדי שהבר יהיה ירוק המותג */}
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar sx={{ gap: 1, direction: 'rtl' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ ml: 1, display: { xs: 'inline-flex', sm: 'none' } }}
              aria-label="פתח תפריט ניווט"
            >
              <MenuIcon />
            </IconButton>

            <Button onClick={() => navigate('/')} sx={{ textTransform: 'none', color: 'inherit' }} aria-label="חזור לעמוד הבית">
              <Typography variant="h6" sx={{ flexGrow: 1, color: 'inherit' }}>
                EduSync
              </Typography>
            </Button>

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

            <Tooltip title={isDark ? 'מצב בהיר' : 'מצב כהה'}>
              <IconButton onClick={toggleMode} aria-label="החלף מצב תצוגה" color="inherit">
                {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer} sx={{ display: { xs: 'block', sm: 'none' } }} aria-label="מגירת ניווט">
          {drawer}
        </Drawer>
      </Box>
    </header>
  );
}
