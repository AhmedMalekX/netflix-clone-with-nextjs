import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "../../lib/magic-client";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // retrievingEmailAddress from magic
    const retrievingEmailAddress = async () => {
      try {
        const { email, publicAddress } = await magic.user.getMetadata();
        if (email) {
          setEmail(email);
        } else {
          setEmail("Dummy@email.com");
        }
      } catch (err) {
        console.error("Error retrieving email", err);
      }
    };

    retrievingEmailAddress();
  }, []);

  const handleOnClickHome = async (e) => {
    e.preventDefault();
    await router.push("/");
  };

  const handleOnClickMyList = async (e) => {
    e.preventDefault();
    await router.push("/browse/my-list");
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      await router.push('/login')
    } catch (err) {
      console.error("Error Logging out", err);
      await router.push('/login')
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/*Logo*/}
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

        {/*Navbar items*/}
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{email}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand dropdown"
                width={24}
                height={24}
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  {/*<Link href="/Login">*/}
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                  {/*</Link>*/}

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
