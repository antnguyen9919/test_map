import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <Script
        src='https://code.jquery.com/jquery-3.6.3.min.js'
        integrity='sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU='
        crossorigin='anonymous'
      />
      {/* <Script src='../../lib/jquery1.9.1.js' /> */}
      {/* <Script src='../../lib/jquery-ui/jquery-ui.js' /> */}

      {/* <Script src='./lib/leaflet/leaflet.js' /> */}

      {/* <Script src='../dist/control.trackplayback.js' /> */}

      {/* <Script src='../dist/leaflet.trackplayback.js' /> */}
      <Component {...pageProps} />
    </>
  );
}
