import {Box, Grid} from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import filterQueryParamAtom from '../../../atoms/filterQueryParam';
import filterTypeAtom from '../../../atoms/filterType';
import { useFilterByGenOrRegion, useFilterByType } from '../../../helpers/filterFunctions'
import { useEffect } from 'react';

interface FiltersPannelProps {
    filterParams: string[];
	filterType: string;
}
 
const FiltersPannel = ({ filterParams }: FiltersPannelProps) => {
	const [filterQueryParam, setFilterQueryParam] = useRecoilState(filterQueryParamAtom);
	const filterTypeFromFilterSelector = useRecoilValue(filterTypeAtom)

	const filterByGenAndRegion = useFilterByGenOrRegion()
	const filterByType = useFilterByType()
	
console.log("filterTypeFromFilterSelector", filterTypeFromFilterSelector)
console.log("filterQueryParam", filterQueryParam)
	const colors = [
		'rgba(238, 131, 131, 0.5)',  
		'rgba(230, 123, 148, 0.5)',  
		'rgba(246, 230, 82, 0.5)', 
		'rgba(115, 156, 246, 0.5)',  
		'rgba(80, 153, 80, 0.5)',    
		'rgba(223, 79, 79, 0.5)'   
	];

	const getRandomColor = (index: number) => {
		return colors[index % colors.length];
	};
	
	const isSelected = (item: string) => {
		return filterQueryParam === item;
};



useEffect(() => {
	switch (filterTypeFromFilterSelector) {
    case 'gen':
    case 'region':
      filterByGenAndRegion(filterQueryParam);
      break;
    case 'type':
	case filterQueryParam:
      filterByType(filterQueryParam);
      break;
    default:
      console.log('Unknown filterType');
  }
	
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [filterQueryParam, filterTypeFromFilterSelector])

  return (	
		<Grid container spacing={2} sx={{
			width: "90%",
			height: '10rem',
			padding: '1px', 
			overflow: 'scroll', 
			justifyContent: 'center',
			backgroundColor: '#FFEEB4', 
		}}
		>
			{filterParams?.map((item, index) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ backgroundColor: '#FFEEB4'}}>
						<Box 
							sx={{ 
								padding: '5px', 
								display: 'flex', 
								color:"#44403C",
								cursor: 'pointer',
								borderRadius: '8px', 
								justifyContent: "center",
								border: isSelected(item) ? '2px solid #FFFFFF' : 'none',
								backgroundColor: isSelected(item) ? '#F6E652' : getRandomColor(index),
								transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
									'&:hover': {
										transform: 'scale(1.05)',
										boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
									}
								}}
							onClick={() => setFilterQueryParam(item)}
						>
						{item}
					</Box>		
				</Grid>
			))}
		</Grid>    
  )
}

export default FiltersPannel

