import React, { useState } from "react";
import Error from "../components/error";
import Layout from "../components/layout";
import MiembrosTable from "../components/miembros/table";
import { getMiembros } from "../api/miembros";
import { baseURL } from "../utils/constants";
import useSWR from "swr";
import { dataMiembros } from "../utils/constants";
import Pagination from "../components/pagination";
import _ from "lodash";

export async function getStaticProps() {
  const miembros = await getMiembros();
  return {
    revalidate: 1,
    props: { miembros: (miembros || dataMiembros) ?? null }
  };
}

const Miembros = ({ miembros }) => {
  const url = `${baseURL}form`;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const { data } = useSWR(url, getMiembros, {
    initialData: miembros,
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
        <MiembrosTable
          miembros={_.sortBy(currentRows, (row) => {
            let fecha = row._id.toString().substring(0, 8);
            fecha = new Date(parseInt(fecha, 16) * 1000);
            return fecha;
          }).reverse()}
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

export default Miembros;
