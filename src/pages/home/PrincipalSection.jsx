import React from "react";
import { Luz1, VideoAventura } from "../../images/index.js";
import styled from "styled-components";
import { mediaQuery } from "../../styles/index.js";

export const PrincipalSection = () => {
  // const videoRef = useRef(null);

  // useEffect(() => {
  //   const videoElement = videoRef.current;
  //
  //   videoElement.muted = false;
  //   videoElement.play();
  //
  //   const timeout = setTimeout(() => {
  //     if (videoElement) {
  //       videoElement.muted = true;
  //     }
  //   }, 16000);
  //
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <Container>
      <img src={Luz1} alt="aventura fondo" className="bg-luz" />
      <video
        className="video-aventura"
        poster={VideoAventura}
        autoPlay
        loop
        muted
        controls={false}
      >
        <source src="./videos/video-aventura.mp4" type="video/mp4" />
        <source src="./videos/video-aventura.webm" type="video/webm" />
      </video>
      {/*<div className="event-content">*/}
      {/*  <div>*/}
      {/*    <img src={LogoEvento} alt="aventura logo" />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <img src={LugarYFecha2b} alt="aventura lugar y fecha" />*/}
      {/*  </div>*/}
      {/*</div>*/}
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
    height: 100%;
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
