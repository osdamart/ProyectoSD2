import React,{useState} from "react";
import Error from "../components/error";
import Layout from "../components/layout";
import ActividadesTable from "../components/actividades/table";
import { getActividades } from "../api/actividades";
import { baseURL } from "../utils/constants";
import useSWR from "swr";
import Pagination from '../components/pagination';
import _ from "lodash";

export async function getStaticProps() {
  const actividades = await getActividades();
  return {
    revalidate: 1,
    props: { actividades: actividades ?? null }
  };
}

const Actividades = ({ actividades }) => {
  const url = `${baseURL}activity`;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const { data } = useSWR(url, getActividades, {
    initialData: actividades,
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
        <ActividadesTable
          actividades={currentRows}
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

export default Actividades;
