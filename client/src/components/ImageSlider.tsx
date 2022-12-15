import { useState } from "react";
import styled from "styled-components";

const StyledImageDiv = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.theme});
`;
const StyledImageSliderDiv = styled.div`
  height: 100%;
  position: relative;
`;
const StyledArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  ${(props) => props.theme};
  font-size: 60px;
  color: black;
  z-index: 1;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    text-shadow: #0275d8 1px 0 10px;
  }
`;

interface Props {
  imgUrls: Array<string>;
}

const ImageSlider: React.FC<Props> = ({ imgUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const urls = imgUrls;
  const goToPrevious = () => {
    const len = Object.keys(urls).length;
    const isFirstImage: boolean = currentIndex === 0;
    const newIndex: number = isFirstImage ? len - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const len: number = Object.keys(urls).length;
    const isLastImage: boolean = currentIndex === len - 1;
    const newIndex: number = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <StyledImageSliderDiv>
      <StyledArrow theme={"left: 20px"} onClick={goToPrevious}>
        &lt;
      </StyledArrow>
      <StyledArrow theme={"right: 20px"} onClick={goToNext}>
        &gt;
      </StyledArrow>
      <StyledImageDiv theme={urls[currentIndex]}></StyledImageDiv>
    </StyledImageSliderDiv>
  );
};

export default ImageSlider;
