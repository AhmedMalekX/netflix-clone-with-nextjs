import styles from "./card.module.css";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";

export const Card = ({ imgUrl, size = "medium" }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    console.log("error");
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div className={cls(classMap[size], styles.imgMotionWrapper)} whileHover={{ scale: 1.2 }}>
        <Image
          src={imgSrc}
          alt="Dummy Image"
          className={styles.cardImg}
          layout="fill"
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};
