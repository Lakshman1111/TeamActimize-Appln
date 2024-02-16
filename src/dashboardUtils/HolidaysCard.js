import { display } from "@mui/system";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import SquareBorder1 from "../assets/images/square-border1.png";
import { Box, Card, Grid, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
// const CarouselCard = ({ date, day, title, currentSlide, currentIndex, }: any) => {
// const CarouselCard = ({ date, day, title, currentSlide, currentIndex, }) => {
const CarouselCard = ({title,date}) => {
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
                    {/* <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                      <img
                          src={SquareBorder1}
                          alt="SquareBorder1"
                          style={{ objectFit: "fill", width: "100%", height: "100%" }}
                      />
                  </div> */}

                    <Card
                        style={{
                            // backgroundColor:'white',
                            padding: 20,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height:"220px",
                            width:'200px',
                            color:'blue',
                            backgroundColor:'azure',
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', fontSize: '18px',fontWeight:'bold',color:'orange' }} >{title}</Typography>
                        {/* <Typography sx={{ textAlign: 'center', fontSize: '16px',fontWeight:'bold',color:'green' }} >{day}</Typography> */}
                        <Typography sx={{ textAlign: 'center', fontSize: '14px',fontWeight:'bold',color:'blue' }} >{date}</Typography>
                       
                    </Card>
                </div>
            </animated.div>
        </>
    );
};

export default CarouselCard;