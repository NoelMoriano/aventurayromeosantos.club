import React from "react";
import styled from "styled-components";

export const SpotifyIframe = () => {
  return (
    <Container>
      <div className="wrapper-iframe">
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/artist/1qto4hHid1P71emI6Fd8xi?utm_source=generator&theme=0"
          width="100%"
          height="452"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1em;
  .wrapper-iframe {
    max-width: 30em;
    width: 100%;
    margin: auto;
  }
`;
