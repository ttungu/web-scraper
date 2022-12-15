import styled from "styled-components";

const StyledNavDiv = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const StyledPaginationButton = styled.div`
  text-align: center;
  color: black;
  display: inline-block;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 10%;
  &:hover:not(.active) {
    background-color: lightgrey;
  }
`;

const StyledPaginationActiveButton = styled(StyledPaginationButton)`
  background-color: black;
  color: white;
`;
interface Props {
  totalPages: number | string;
  currentPage: number;
  paginate(page: number): void;
}

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  paginate,
}: any) => {
  const pageNumbers: Array<number> = [];
  let counter: number = 0;
  let paginationStart: number = 0;

  if (totalPages <= 7) {
    paginationStart = 1;
  } else if (currentPage > 3 && currentPage <= totalPages - 3) {
    paginationStart = currentPage - 3;
  } else if (currentPage >= totalPages - 3) {
    paginationStart = currentPage - (6 - (totalPages - currentPage));
  } else {
    paginationStart = 1;
  }
  //   const paginationStart = currentPage > 3 ? currentPage - 3 : 1;
  for (let i: number = paginationStart; i <= totalPages; i++) {
    if (counter === 7) {
      break;
    }
    counter++;
    pageNumbers.push(i);
  }

  return (
    <StyledNavDiv>
      <StyledPaginationButton onClick={() => paginate(1)}>
        &laquo;
      </StyledPaginationButton>
      {pageNumbers.map((number) => {
        if (number === currentPage) {
          return (
            <StyledPaginationActiveButton
              className="active"
              key={number}
              onClick={() => paginate(number)}
            >
              {number}
            </StyledPaginationActiveButton>
          );
        } else {
          return (
            <StyledPaginationButton
              key={number}
              onClick={() => paginate(number)}
            >
              {number}
            </StyledPaginationButton>
          );
        }
      })}
      <StyledPaginationButton onClick={() => paginate(totalPages)}>
        &raquo;
      </StyledPaginationButton>
    </StyledNavDiv>
  );
};

export default Pagination;
