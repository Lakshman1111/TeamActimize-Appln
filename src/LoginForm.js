import * as React from 'react';
import { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUserStart } from './redux/actions/LoginActions';
import { loginUserApi } from './redux/apis/loginUserApi';
import Portalsmain from './components/Portalsmain';
import Controls from './components/Controls';
export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error message when user starts typing
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storedResult, setStoredResult] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
      const newErrors = {};
    if (!loginData.email) {
      newErrors.email = "Email is required";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const result = await loginUserApi(loginData);
      setStoredResult(result);
      dispatch(loginUserStart(loginData));
      navigate("/", { state: result.data });
    } catch (error) {
    }
  };
  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            maxWidth: 400,
            mx: 'auto',
            my: 15,
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            bgcolor: '#fff',
            color: 'orange',
          }}
          variant="outlined"
        >
          <div>
            <Controls.Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Controls.Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            value={loginData.email}
            onChange={onInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            value={loginData.password}
            onChange={onInputChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            sx={{
              mt: 1, // margin top
            }}
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </Sheet>
      </main>
      {storedResult && <Portalsmain storedResult={storedResult} />}
    </CssVarsProvider>
  );
}
