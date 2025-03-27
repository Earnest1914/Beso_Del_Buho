import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  height: 100vh; // Set the height to viewport height
  overflow: hidden; // Hide the overflow content
`;


export const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  font-size: 20px;
  font-weight: 200;
  padding: 4px 25px;
  color: ${(props) => (props.active ? "white" : "#aaaaaa57")};
  border-bottom: ${(props) => (props.active ? "1px solid white" : "none")};
  transition: border-bottom 0.3s ease-in-out, transform 0.2s;
  &:hover {
    color: white;
    transform: scale(1.05);
  }
`;

export const ScheduleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;  // Change from a fixed height to auto
  width: 100%;
  overflow: hidden;  // Ensure that any overflow does not cause scroll
`;

export const ScheduleCarousel = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  overflow-x: auto;  // Make sure horizontal scrolling is allowed if necessary
  scroll-behavior: smooth;
  width: 100%;
  justify-content: center;
  &::-webkit-scrollbar {
    display: none;  // This line will hide the scrollbar completely in WebKit browsers
  }
  -ms-overflow-style: none;  // This is for Internet Explorer and Edge
  scrollbar-width: none;  // For Firefox
`;

export const MovieCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  color: white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    border-radius: 10px;
    margin-bottom: 8px;
  }
`;

export const MovieTitle = styled.h2`
  font-size: 18px;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 200px;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  
  margin: 20px 0;
`;

export const MovieInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  color: white;
  border-radius: 10px;
  max-width: 440px;
  text-align: left;
  overflow-y: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 14px;
  line-height: 1.5;
  width: 45%;
  color: #e3e0e0;
`;

export const MovieSynopsis = styled.div`
  width: 50%;
  font-size: 18px;
  line-height: 1.5;
  text-align: left;
  font-weight: 500;
  padding-left: 20px;
  margin-left: 20px;
  color: #FFFFFF; // Changed from #e3e0e0 to pure white for better readability
`;


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #222;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  text-align: center;
  color: white;
  position: relative;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

export const MovieTimesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const MoviewTimewrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
  color: white;
  background-color: gray;
`;

const seatStyle = {
  width: '50px',
  height: '50px',
  backgroundColor: 'gray',
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'background-color 0.3s' 
};


const hoverStyle = {
  backgroundColor: '#bbb' 
};
