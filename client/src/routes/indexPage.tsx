import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import PostPerPage from "../components/PostPerPage";

const StyledOuterDiv = styled.div`
  width: 40%;
  margin: 0 auto;
  position: relative;
  @media (max-width: 1280px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;
interface Data {
  id: string;
  title: string;
  loc: string;
  urls: string;
}

interface Results {
  totalPages: number;
  currentPage: number;
  totalRowsInDB: string;
  rowCount: number;
  results: Array<Data>;
}

const fetchPosts = async ({ queryKey }: any): Promise<Results> => {
  try {
    // eslint-disable-next-line
    const [_, limit, offset] = queryKey;
    const res = await fetch(
      `http://localhost:4000/data?limit=${limit}&offset=${offset}`
    );
    return res.json();
  } catch (e: any) {
    throw e;
  }
};

const IndexPage: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const { data, isLoading } = useQuery(["posts", limit, offset], fetchPosts);

  const paginate = (page: number): void => {
    setCurrentPage(page);
    setOffset(limit * (page - 1));
  };

  const setPostPerPage = (n: number): void => {
    setLimit(n);
  };

  if (isLoading) {
    return <div>Loading Data</div>;
  }
  if (data) {
    return (
      <StyledOuterDiv>
        <h2>Sreality.cz</h2>
        <div>
          {data.results.map((post: any) => {
            return <Post key={post.id} post={post}></Post>;
          })}
        </div>
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          paginate={paginate}
        ></Pagination>
        <PostPerPage
          postPerPage={limit}
          setPostPerPage={setPostPerPage}
        ></PostPerPage>
      </StyledOuterDiv>
    );
  } else {
    return <div>Something went wrong while fetching data. </div>;
  }
};

export default IndexPage;
