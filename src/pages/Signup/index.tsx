import { Alert, AlertTitle, Button, Container, TextField, Typography } from "@mui/material"
import {useState} from 'react'
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import '@fontsource-variable/grandstander';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('')

	const { signUp } = useAuth();
	const navigate = useNavigate()

	const handleSignUp = () => {
		if (!email || !password || !passwordConfirm) {
			setError("Please, fill all the fields.")
		} 

		if (password !== passwordConfirm) {
			setError("Typed passwords don't match");

		}	else {	
		
			const result = signUp(email, password);

			if (typeof result === 'string') {
				setError(result);
				return;
			}

			navigate('/home');
		}
	}

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
					justifyContent="center"
					flexDirection="column"
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
							type="password"
							label="Password" 
							onChange={(event) => [setPassword(event?.target?.value), setError("")]}
					/>
					<TextField
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
							},
						}}
						type="password"
						label="Confirm password" 
						onChange={(event) => [setPasswordConfirm(event?.target?.value), setError("")]}
					/>
			</Box>
			<Button
					onClick={handleSignUp}
					variant="contained"
					endIcon={<LoginIcon />}
					sx={{
					backgroundColor: '#ff5722', 
					color: '#ffffff',export default SignUp

					'&:hover': {
									backgroundColor: '#e64a19',
					},
					}}
			>
					SignUp
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

export default SignUp