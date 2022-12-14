import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "../../lib/magic-client";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const applyUsernameInNav = async () => {
        try {
          const { email, issuer } = await magic.user.getMetadata();
          const didToken = await magic.user.getIdToken();
          if (email) {
            setUsername(email);
            setDidToken(didToken);
          }
        } catch (error) {
          console.error("Error retrieving email", error);
        }
      };
      await applyUsernameInNav();
    })();
  }, []);

  const handleOnClickHome = async (e) => {
    e.preventDefault();
    await router.push("/");
  };

  const handleOnClickMyList = async (e) => {
    e.preventDefault();
    await router.push("/browse/my-list");
  };

  const handleShowDropdown = async (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error("Error logging out", error);
      await router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <a>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              {/** Expand more icon */}
              <Image
                src={"/static/expand_more.svg"}
                alt="Expand dropdown"
                width="24px"
                height="24px"
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
