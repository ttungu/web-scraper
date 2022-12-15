import styled from "styled-components";

const StyledPostPerPageSelect = styled.select`
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 0;
`;

interface Props {
  postPerPage: number;
  setPostPerPage(n: number): void;
}

const PostPerPage: React.FC<Props> = ({ postPerPage, setPostPerPage }) => {
  const options: Array<number> = [20, 40, 60, 80, 100];
  return (
    <StyledPostPerPageSelect
      value={postPerPage}
      onChange={(e) => setPostPerPage(Number(e.target.value))}
    >
      {options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </StyledPostPerPageSelect>
  );
};

export default PostPerPage;
