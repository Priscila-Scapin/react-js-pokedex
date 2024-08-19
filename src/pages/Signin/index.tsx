import { Alert, AlertTitle, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useState } from 'react'
import Box from '@mui/material/Box';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from '@mui/icons-material/Login';
import '@fontsource-variable/grandstander';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');

	const { signIn } = useAuth();
	const navigate = useNavigate()

	const handleLogin = () => {
		if (!email || !password) {
			setError("Please, fill all the fields.");
			return;
		}

		const result = signIn(email, password);
		if (typeof result === 'string') {
			setError(result);
			return;
		}

		navigate('/home');
	}

	const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Box
      sx={{
        width: '100vw',
					height: '100vh',
					maxWidth: '100%',
					overflow: 'scroll',
					justifyContent: 'center',
					backgroundColor: '#FFEEB4', 
      }}
    >         
			<Box
				gap={6}
				height="100vh"
				width="100vw"
				display="flex"
				alignItems="center"
				flexDirection="column"
				justifyContent="center"
			>        
			<Typography
				variant="h2"
				align="center"
			>
					React Pokédex
			</Typography>
			<img 
				width="150rem"
				height="150rem"
				src="pokedex.png"
				alt="Pokemon Logo"
			/>
			<Box
				gap={2}                
				display="flex"
				alignItems="center"
				flexDirection="column"
				justifyContent="center"
			>        
				<TextField
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
						},
					}}
					label="Email" 
					onChange={(event) => [setEmail(event?.target?.value), setError("")]}
				/>
				<TextField
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
						},
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end" sx={{ position: 'absolute', right: '1rem' }}>
								<IconButton
									onClick={handleShowPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
					type={showPassword ? 'text' : 'password'}
					label="Password" 
					onChange={(event) => [setPassword(event?.target?.value), setError("")]}
				/>
			</Box>
			<Button
				variant="contained"
				onClick={handleLogin}
				endIcon={<LoginIcon />}
				sx={{
				backgroundColor: '#B43030', 
				color: '#ffffff',
				'&:hover': {
						backgroundColor: '#e64a19',
				},
				}}
			>
				SignIn
			</Button>
			{error?.length > 0 && (
				 <Alert
				 	severity="error"

				 	icon={
					 <img
						 src="rocket-team-error-icon.png"
						 alt="Custom icon"
						 style={{ width: '24px', height: '24px' }}
					 />
				 	}
			 >
				 <AlertTitle>Error</AlertTitle>
				 {error}
			 </Alert>
			)}
			</Box>
    </Box>
  )
}

export default SignIn