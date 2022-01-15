import { ContactsOutlined, SmileOutlined } from "@ant-design/icons";
import { Layout, Menu, PageHeader } from "antd";
import "antd/dist/antd.css";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => setCollapsed(!collapsed);

  const router = useRouter();
  const { pathname } = router;

  return (
    <Layout style={{ minHeight: "100vh", marginTop: "0" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <img
          src={require("../assets/img/LOGO-removebg-preview.png")}
          alt="Logo de ACACIG"
          style={{ width: "25px" }}
        />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <SmileOutlined />{" "}
            <Link href="/miembros">
              <span>
                <a>Miembros</a>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <ContactsOutlined />{" "}
            <Link href="/contactos">
              <span>
                <a>Contactos</a>
              </span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <PageHeader
          className="site-page-header"
          title={_.startCase(pathname)}
          subTitle={`Formulario de ${_.lowerCase(pathname)}`}
        />
        <Content style={{ margin: "0 50px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>ACACIG @2021</Footer>
      </Layout>
    </Layout>
  );
}
