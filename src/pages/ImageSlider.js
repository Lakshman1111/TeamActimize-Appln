import React from 'react';
import Carousel3d from "../dashboardUtils/Carousel3d";
import CarouselCard from "../dashboardUtils/CarouselCard";
import user from "../assets/images/user.png";
import user1 from "../assets/images/user1.jpg";
import user2 from "../assets/images/user2.png";
import user3 from "../assets/images/user3.png";
import user4 from "../assets/images/user4.jpg";
import user5 from "../assets/images/user5.jpg";
import user6 from "../assets/images/user6.jpg";
import user7 from "../assets/images/user7.jpeg";
import user8 from "../assets/images/user8.jpg";
import user9 from "../assets/images/user9.jpg";
import user10 from "../assets/images/user10.jpg";
import Controls from "../components/Controls";
const ImageSlider = () => {
  return (
      <Controls.Box
      
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)'
          }}
      >
          <Controls.Box style={{ width: '100%', maxWidth: '60%', height: "23rem",}}>
              <Carousel3d
                  cards={[
                      {
                          key: 1,
                          content: <CarouselCard age="Mar  27" designation="Manager" title="Defense" image={user} />
                      },
                      {
                          key: 2,
                          content: <CarouselCard age="Apr  27" designation="CEO" title="Heroes" image={user1} />
                      },
                      {
                          key: 3,
                          content: <CarouselCard age="May  27" designation="Team Lead" title="Defense" image={user2} />
                      },
                      {
                          key: 4,
                          content: <CarouselCard age="Jun  30" designation="Devloper" title="Srinivas" image={user3} />
                      },
                      {
                          key: 5,
                          content: <CarouselCard age="Jul  27" designation="Tester" title="Sameer" image={user4} />
                      },
                      {
                          key: 6,
                          content: <CarouselCard age="Aug  27" designation="Quality " title="suresh Roy" image={user5} />
                      },
                      {
                          key: 7,
                          content: <CarouselCard age="Sep 27" designation="Devops" title="Samy" image={user6} />
                      },
                      {
                          key: 8,
                          content: <CarouselCard age="Oct 27" designation="Developer" title="Sravan" image={user7} />
                      },
                      {
                          key: 9,
                          content: <CarouselCard age="Nov 27" designation="Developer" title="Samuel" image={user8} />
                      },
                      {
                          key: 10,
                          content: <CarouselCard age="Dec 27" designation="Developer" title="Santoshi" image={user9} />
                      },
                      {
                          key: 11,
                          content: <CarouselCard age="Jan 27" designation="Manager" title="Sameera" image={user10} />
                      },
                     
                  ]}
                  offset={2}
              />
          </Controls.Box>
      </Controls.Box>
  );
};
export default ImageSlider;