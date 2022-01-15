import React, { useState } from "react";
import { getContactos } from "../api/contactos";
import ContactosTable from "../components/contactos/table";
import Layout from "../components/layout";
import Error from "../components/error";
import { dataContactos } from "../utils/constants";
import { baseURL } from "../utils/constants";
import useSWR from "swr";
import Pagination from "../components/pagination";
import _ from "lodash";

export async function getStaticProps() {
  const contactos = await getContactos();
  return {
    revalidate: 1,
    props: { contactos: (contactos || dataContactos) ?? null }
  };
}

const Contactos = ({ contactos }) => {
  const url = `${baseURL}contact`;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const { data } = useSWR(url, getContactos, {
    initialData: contactos,
    revalidateOnFocus: false
  });

  const uname =
    typeof window !== "undefined" ? localStorage.getItem("name") : null;

  //get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = _.isEmpty(data)
    ? []
    : _.slice(data, indexOfFirstRow, indexOfLastRow);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (uname === "admin") {
    return (
      <Layout pageTitle="Contactos">
        <ContactosTable contactos={currentRows} url={url} />
        <Pagination
          postsPerPage={rowsPerPage}
          totalPosts={data.length}
          paginate={paginate}
        />
      </Layout>
    );
  } else {
    return <Error></Error>;
  }
};

export default Contactos;
