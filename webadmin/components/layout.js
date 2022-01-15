import {
  ContactsOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  SmileOutlined
} from "@ant-design/icons";
import { Button, Layout as AntdLayout, Menu, PageHeader } from "antd";
import "antd/dist/antd.css";
import _ from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

const { Content, Footer, Sider } = AntdLayout;

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => setCollapsed(!collapsed);

  const router = useRouter();
  const { pathname } = router;

  const uname =
    typeof window !== "undefined" ? localStorage.getItem("name") : null;

  const cerrarSesion = () => {
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
          lang="es"
        />
        <title>{_.startCase(pathname)}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AntdLayout
        style={{ minHeight: "100vh", marginTop: "0" }}
        title={pathname}
      >
        <Sider>
          <Menu theme="dark" mode="inline">
            <Menu.Item
              key="1"
              icon={<SmileOutlined aria-hidden="true" />}
              role={null}
            >
              <Link href="/miembros">
                <a>
                  <span>Miembros</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<ContactsOutlined aria-hidden="true" />}
              role={null}
            >
              <Link href="/contactos">
                <a>
                  <span>Contactos</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<NotificationOutlined aria-hidden="true" />}
              role={null}
            >
              <Link href="/noticias">
                <a>
                  <span>Noticias</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<FileDoneOutlined aria-hidden="true" />}
              role={null}
            >
              <Link href="/actividades">
                <a>
                  <span>Actividades</span>
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <AntdLayout>
          <PageHeader
            title={
              <h1 style={{ fontSize: "28px" }}>{_.startCase(pathname)}</h1>
            }
            subTitle={`Formulario de ${_.lowerCase(pathname)}`}
            extra={[
              <Button type="text" key="5" danger onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            ]}
          />

          <Content style={{ margin: "0 50px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>ACACIG @2021</Footer>
        </AntdLayout>
      </AntdLayout>
    </Fragment>
  );
}
