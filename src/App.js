import { useState } from 'react';
import { useSelector } from 'react-redux';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      {/* <BaseOptionChartStyle /> */}
      <Router />
    </ThemeProvider>
  );
}
