import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Image from  "../../images/Loader.png"
import ssLoaderIcon from  "../../images/ssLoaderIcon.png"


const StyledLoader = styled.div`

display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  position: relative;

  .ss_logo {
    position: absolute;
  }



@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.rotate {
  width: 100px;
  animation: rotation 1.5s infinite linear;
}



`;

const Loader = (props) => (
      <StyledLoader>
        <img src={Image} className="rotate" alt="logo"/>
        <img src={ssLoaderIcon} alt="logo" className='ss_logo'/>

        <Typography variant="body2"  sx={{fontSize: "16px", position: "absolute", marginTop: "150px"}}>SafalSubscriptions </Typography>
      </StyledLoader>
  )

export default Loader;