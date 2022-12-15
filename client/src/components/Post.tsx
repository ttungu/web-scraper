import ImageSlider from "./ImageSlider";
import styled from "styled-components";

const StyledSliderWrapperDiv = styled.div`
  height: 300px;
  margin: 0 auto;
  padding-bottom: 10px;
  border-bottom: 2px solid lightgrey;
`;

const StyledHeading = styled.h3`
  margin-bottom: 4px;
`;

const StyledPara = styled.p`
  margin-top: -0px;
`;

interface PostInterface {
  title: string;
  loc: string;
  urls: string;
}

interface Props {
  post: PostInterface;
}

const Post: React.FC<Props> = ({ post }) => {
  let urls = post.urls.split(";");
  return (
    <div>
      <StyledHeading>{post.title}</StyledHeading>
      <StyledPara>{post.loc}</StyledPara>
      <StyledSliderWrapperDiv>
        <ImageSlider imgUrls={urls}></ImageSlider>
      </StyledSliderWrapperDiv>
    </div>
  );
};

export default Post;
