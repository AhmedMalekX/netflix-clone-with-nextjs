import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loaderWrapper}>
      <p className={styles.loader}>Loading...</p>
    </div>
  );
};

export default Loading;