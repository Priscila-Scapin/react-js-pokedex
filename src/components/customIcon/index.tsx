import React from 'react';

interface CustomIconProps {
  type: string;
  color?: string; 
}

const CustomIcon = ({ type }: CustomIconProps)  => {
  const iconPath = `./assets/${type}.svg`;


  const getColorForType = (type: string): string => {
    switch (type) {
      case 'fire':
        return '#FF450080';
      case 'water':
        return '#00BFFF80';
      case 'grass':
        return '#228B2280';
      case 'electric':
        return '#FFFF0080';
      case 'ice':
        return '#ADD8E680';
      case 'fighting':
        return '#8B000080';
      case 'poison':
        return '#80008080';
      case 'ground':
        return '#8B451380';
      case 'flying':
        return '#87CEFA80';
      case 'psychic':
        return '#FF69B480';
      case 'bug':
        return '#00FF0080';
      case 'rock':
        return '#80800080'; 
      case 'ghost':
        return '#80008080'; 
      case 'dragon':
        return '#0000FF80'; 
      case 'dark':
        return '#00000080'; 
      case 'steel':
        return '#C0C0C080'; 
      case 'fairy':
        return '#FFB6C180';
      default:
        return '#FFB6C180';
    }
  };

  const bgTypeColor= getColorForType(type)
    
  return (
    <div style={{backgroundColor: `${bgTypeColor}`, borderRadius: '100%', padding: '10px', margin: '2px'}}>
    <img 
      src={iconPath} 
      alt={`${type} icon`} 
      style={{
        width: '20px',
        height: '20px',
        filter: `invert(1) sepia(1) saturate(5) hue-rotate(${bgTypeColor})`,
      }}
    />
    </div>
  );
};

export default CustomIcon;
