import styled from "styled-components";

export const StyledDisplay = styled.div`
box-sizing: border-box;
display: flex;
align-items; center;
margin: 0 0 20px 0;
padding: 20px;
border: 4px solid #307274;
min-height: 30px;
width: 100%;
border-radius: 20px;
color:${(props) => (props.gameOver ? "red" : "#35d8dd")};
background: #10;
font-family: Pixel, Arial, Helvetica, sans-serif;
font-size: 1.8rem;
text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;
