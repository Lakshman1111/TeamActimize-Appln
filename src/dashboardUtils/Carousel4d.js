import React, { useState, useEffect } from "react";
import { config } from "react-spring";
import { Carousel } from "react-carousel-card-3d";

const Carousel4d = ({
    cards,
    offset,
    autorotation = true,
    rotationInterval = 2000,
}) => {
    // const table = cards.map((element: any, index: number) => {
    const table = cards?.map((element,index) => {
        return { ...element, index, onClick: () => setGoToSlide(index) };
    });

    const [offsetRadius, setOffsetRadius] = useState(2);
    const [goToSlide, setGoToSlide] = useState(0);
    const [slides] = useState(table);

    useEffect(() => {
        setOffsetRadius(offset);
    }, [offset]);

    useEffect(() => {
        // let interval: 2000 | null = null;
        let interval = 1;
        if (autorotation) {
            interval = setInterval(() => {
                setGoToSlide((prevState) =>
                    prevState + 1 >= cards.length ? 0 : prevState + 1
                );
            }, rotationInterval);
        }

        return () => {
            if (autorotation && interval) {
                clearInterval(interval);
            }
        };
    }, [cards, autorotation, rotationInterval]);
    return (
        <>
            <Carousel
                slides={slides}
                goToSlide={goToSlide}
                offsetRadius={offsetRadius}
                animationConfig={config.gentle}
            />
        </>
    );
};

export default Carousel4d;