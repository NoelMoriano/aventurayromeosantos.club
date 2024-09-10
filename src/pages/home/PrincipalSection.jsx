import React, { useEffect, useRef } from "react";
import { VideoAventura } from "../../images/index.js";
import styled from "styled-components";

export const PrincipalSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef?.current && videoRef.current.play();

    // setTimeout(() => {
    //   console.log("RUN!!!");
    //   videoRef.current.muted = true;
    // }, 1600);
  }, []);

  return (
    <Container>
      <video
        ref={videoRef}
        className="video-aventura"
        poster={VideoAventura}
        autoPlay
        controls={false}
      >
        <source src="./videos/video-aventura.mp4" type="video/mp4" />
        <source src="./videos/video-aventura.webm" type="video/webm" />
      </video>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: auto;
  height: auto;
  .video-aventura {
    width: 100%;
    height: 100%;
  }
`;
