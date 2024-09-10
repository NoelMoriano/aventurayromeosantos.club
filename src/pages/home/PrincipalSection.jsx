import React, { useEffect, useRef } from "react";
import { VideoAventura } from "../../images/index.js";
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
  .video-aventura {
    width: 100%;
    height: 100%;
  }
`;
