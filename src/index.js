import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from './redux/store'
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root'));
 const theme = createTheme();
theme.typography.h1 = {
  fontWeight: 800,
  lineHeight: 1.3,
  fontFamily: "ADLaM Display",
  [theme.breakpoints.up("xs")]: {
    fontSize: '2.85rem',
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.up("md")]: {
    fontSize: '4.8rem',
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: '5.25rem',
  }
};
theme.typography.h2 = {
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: '-1px',
  fontFamily: "ADLaM Display",
  [theme.breakpoints.up("xs")]: {
    fontSize: '2.15rem',
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: '3.05rem',
  },
  [theme.breakpoints.up("md")]: {
    fontSize: '3.15rem',
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: '3.35rem',
  }
};
theme.typography.h3 = {
  fontWeight: 400,
  lineHeight: 1.4,
  fontFamily: "ADLaM Display",
  [theme.breakpoints.up("xs")]: {
    fontSize: '1.55rem',
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: '2.15rem',
  },
  [theme.breakpoints.up("md")]: {
    fontSize: '2.35rem',
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: '2.55rem',
  }
};
theme.typography.h4 = {
  fontWeight: 300,
  lineHeight: 1.4,
  fontFamily: "ADLaM Display",
  [theme.breakpoints.up("xs")]: {
    fontSize: '1.39rem',
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: '1.455rem',
  },
  [theme.breakpoints.up("md")]: {
    fontSize: '1.575rem',
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: '1.685rem',
  }
};
theme.typography.subtitle1 = {
  fontWeight: 500,
  lineHeight: 1.4,
  fontFamily: "Ruwudu",
  [theme.breakpoints.up("xs")]: {
    fontSize: '0.95rem',
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: '1.25rem',
  },
  [theme.breakpoints.up("md")]: {
    fontSize: '1.rem',
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: '1.50rem',
  }
};
theme.typography.caption = {
  fontWeight: 400,
  lineHeight: 1.4,
  fontFamily: "Ruwudu",
  [theme.breakpoints.up("xs")]: {
    fontSize: '0.91rem',
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: '1.01rem',
  },
  [theme.breakpoints.up("md")]: {
    fontSize: '1..20rem',
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: '1.30rem',
  }
};
theme.typography.subtitle2 = {
  fontWeight: 400,
  lineHeight: 1.7,
  color: 'grey',
  fontFamily: "Ruwudu",
  [theme.breakpoints.up("xs")]: {
    fontSize: '0.795rem',
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: '0.875rem',
  },
  [theme.breakpoints.up("md")]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: '1.125rem',
  }
};
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode> 
      <CssBaseline />
       <BrowserRouter> 
         <Provider store={store}>  
          <App />
         </Provider>
       </BrowserRouter> 
    </React.StrictMode>
 </ThemeProvider> 
);
