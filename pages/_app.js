import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChange);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
