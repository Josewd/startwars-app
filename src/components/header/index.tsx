import { Public } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <Box textAlign="center" py={2}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
          <Public sx={{ fontSize: 32, color: 'white' }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold',  fontFamily: 'Orbitron',
            color: 'black',
             '-webkit-text-stroke': '2px white',
             textShadow: '0 0 10px white'
          }}>
            {title.toUpperCase()}
          </Typography>
          <Public sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Typography variant="h5" sx={{ color: 'yellow',
           maxWidth: '95%', mx: 'auto', fontFamily: 'Orbitron', }}>
          {description}
        </Typography>
      </Box>
  );
}
