import React,{useEffect, useState} from "react";
import NoticiasTable from "../components/noticias/table";
import Error from "../components/error";
import { getNoticias } from "../api/noticias";
import Layout from "../components/layout";
import { baseURL } from "../utils/constants";
import useSWR from "swr";
import _ from "lodash";

import Pagination from '../components/pagination';

export async function getStaticProps() {
  const noticias = await getNoticias();
  return {
    revalidate: 1,
    props: { noticias: noticias ?? null }
  };
}

const Noticias = ({ noticias }) => {
  const url = `${baseURL}news`;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const { data } = useSWR(url, getNoticias, {
    initialData: noticias,
    revalidateOnFocus: false
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = _.isEmpty(data)
    ? []
    : _.slice(data, indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uname =
    typeof window !== "undefined" ? localStorage.getItem("name") : null;

  if (uname === "admin") {
    return (
      <Layout>
        <NoticiasTable
          noticias={currentRows}
          url={url}
          Pagination={() => (
            <Pagination
              postsPerPage={rowsPerPage}
              totalPosts={data.length}
              paginate={paginate}
            />
          )}
        />
      </Layout>
    );
  } else {
    return <Error></Error>;
  }
};

export default Noticias;
