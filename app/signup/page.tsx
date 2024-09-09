'use client';

import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface Form {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|int|co|io)$/i;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  // Example: Password must be at least 6 characters long
  return password.length >= 6;
};

const SignUp = () => {
  const [formState, setFormState] = useState<Form>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    } else if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordError('Password must be at least 6 characters long');
      } else {
        setPasswordError('');
      }
    }
  };

  useEffect(() => {
    const isValid =
      formState.firstName.trim() !== '' &&
      formState.lastName.trim() !== '' &&
      validateEmail(formState.email) &&
      validatePassword(formState.password);

    setIsFormValid(isValid);
  }, [formState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'Email already exists') {
          // Show an alert indicating the user should sign in
          alert('Email already exists. Please sign in instead.');
        } else {
          throw new Error(result.error || 'Registration failed. Please try again.');
        }
      } else {
        console.log('Registration successful:', result);
        alert('Registration successful!');
        // Optionally handle further actions or redirection
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                autoComplete="given-name"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur} // Handle blur event
                error={!!emailError} // Display error style
                helperText={emailError} // Display error message
                aria-describedby={emailError ? "email-error-text" : undefined} // For screen readers
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                onBlur={handleBlur} // Handle blur event
                error={!!passwordError} // Display error style
                helperText={passwordError} // Display error message
              />
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isFormValid} // Button is disabled if form is not valid
            aria-disabled={!isFormValid} // Provide additional context for screen readers
          >
            Sign Up
          </Button>
          <Grid2 container justifyContent="flex-end">
            <Grid2>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;



