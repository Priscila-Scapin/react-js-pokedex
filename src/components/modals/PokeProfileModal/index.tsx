import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

// interface Ability {
//     id: number;
//     name: string;
//     effect_entries: Array<{
//       effect: string;
//       language: {
//         name: string;
//         url: string;
//       };
//     }>;
//   }

interface PokeProfileModalProps {
    open: boolean;
    onClose: (event: React.MouseEvent) => void; 
    pokemonMainInfos: any,
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function PokeProfileModal({ open, onClose, pokemonMainInfos }: PokeProfileModalProps) {
    
    // const fetchPokeAbility = async (id: number | string): Promise<Ability> => {
    //     const url = `https://pokeapi.co/api/v2/ability/${id}/`;
      
    //     try {
    //       const response = await fetch(url);
      
    //       if (!response.ok) {
    //         throw new Error(`Failed to fetch: ${response.statusText}`);
    //       }
      
    //       const data: Ability = await response.json();
    //       return data;
    //     } catch (error) {
    //       console.error('Error fetching ability:', error);
    //       throw error;
    //     }
    //   };    


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseIcon
          onClick={onClose}
          sx={{ cursor: 'pointer', position: 'absolute', top: 8, right: 8 }}
        />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}
