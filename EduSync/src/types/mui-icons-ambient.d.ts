// src/types/mui-icons-ambient.d.ts
// Ambients to silence TS7016 for @mui/icons-material in strict setups / custom moduleResolution
declare module '@mui/icons-material/*' {
    import * as React from 'react';
    const Component: React.ComponentType<any>;
    export default Component;
}
