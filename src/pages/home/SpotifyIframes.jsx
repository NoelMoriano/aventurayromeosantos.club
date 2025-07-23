import React from "react";
import styled from "styled-components";

export const SpotifyIframes = () => {
  return (
    <Container>
      <div className="wrapper-iframe">
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/artist/1qto4hHid1P71emI6Fd8xi?utm_source=generator"
          width="100%"
          height="452"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/3fAlCCVNWkDWb56sgElUFM?utm_source=generator"
          width="100%"
          height="452"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/5sfHyerz9kB7VQahuQQcQf?utm_source=generator"
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
    max-width: 80em;
    width: 100%;
    margin: auto;
    display: flex;
    gap: 1em;
  }
`;
