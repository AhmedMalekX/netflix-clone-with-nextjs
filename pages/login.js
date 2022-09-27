import Head from "next/head";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

const Login = () => {
  const [useMsg, setUseMsg] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const handleLoginInWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      // Login with magic and redirect user to dashboard

      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            await router.push("/");
          } else {
            setIsLoading(false);
            setUseMsg("Something went wrong logging in");
          }
        }
      } catch (err) {
        console.error("Something went wrong", err);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setUseMsg("Enter a valid email address.");
    }
  };

  const handleOnChangeEmail = (e) => {
    setUseMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix - SignIn</title>
      </Head>

      <header className={styles.header}>
        {/*Logo*/}
        <div className={styles.headerWrapper}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            className={styles.emailInput}
            placeholder="Email Address"
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{useMsg}</p>

          <button className={styles.loginBtn} onClick={handleLoginInWithEmail}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
