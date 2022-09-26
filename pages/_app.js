import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  
  // const [isLoading, setIsLoading] = useState(true);
  // Check if the user is logged in
  // useEffect(() => {
  //   (async function isLoggedIn() {
  //     const isLogged = await magic.user.isLoggedIn();

      // if (isLogged) {
      //   await router.push("/");
      // } else {
      //   await router.push("/login");
      // }

  //   })();
  // }, []);

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
