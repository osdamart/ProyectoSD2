import { ConfigProvider } from "antd";
import esES from "antd/lib/locale/es_ES";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={esES}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
