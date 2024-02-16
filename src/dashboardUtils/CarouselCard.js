import { display } from "@mui/system";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import SquareBorder1 from "../assets/images/square-border1.png";
import { Box, Card, Grid, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
// const CarouselCard = ({designation,age,title, image, currentSlide, currentIndex }: any) => {
const CarouselCard = ({designation,age,title, image, currentSlide, currentIndex }) => {
    const [show, setShown] = useState(false);

    const styles = useSpring({
        
        transform: show ? "scale(1.03)" : "scale(1)",
        boxShadow: show
            ? "0 20px 25px rgb(0 0 0 / 25%)"
            : "0 2px 10px rgb(0 0 0 / 8%)"
    });

  return (
    <>
    <animated.div
      style={{ ...styles, height: "fit-content" }}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(22px)",
          position: "relative",
        }}
      >
        {/* ... Other card content ... */}

        <Card
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: '5px'
          }}
        >
          <div
            style={{
              overflow: "hidden",
              position: "relative"
            }}
          >
            <Avatar
              src={image}
              alt="title"
              style={{ objectFit: 'fill', width: "150px", height: "150px" }}
            />
          </div>

          {title && designation && age && (
            <CardContent
              style={{
                marginTop: 5,
              }}
            >
              <Typography variant="h7" sx={{ textAlign: 'center', marginBottom: 2 }}>
              {title}
             </Typography>
             <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 1 }}>
              {age}
            </Typography>
              
              <Typography sx={{ textAlign: 'center' }} variant="h7">{designation}</Typography>
            </CardContent>
        //     <CardContent style={{ marginTop: 5 }}>
        //     <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
        //       {title}
        //     </Typography>
        //     <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 1 }}>
        //       Age: {age}
        //     </Typography>
        //     <Typography variant="body1" sx={{ textAlign: 'center' }}>
        //       Designation: {designation}
        //     </Typography>
        //   </CardContent>
          )}
        </Card>
      </div>
    </animated.div>
  </>
  );
};

export default CarouselCard;