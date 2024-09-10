import React, { useEffect, useRef } from "react";
import { Luz1, VideoAventura } from "../../images/index.js";
import styled from "styled-components";

export const PrincipalSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    videoElement.muted = false;
    videoElement.play();

    const timeout = setTimeout(() => {
      if (videoElement) {
        videoElement.muted = true;
      }
    }, 16000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container>
      <img src={Luz1} alt="aventura fondo" className="bg-luz" />
      <video
        ref={videoRef}
        className="video-aventura"
        poster={VideoAventura}
        autoPlay
        loop
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
  position: relative;
  .bg-luz {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .video-aventura {
    width: 100%;
    height: 100%;
  }
`;
