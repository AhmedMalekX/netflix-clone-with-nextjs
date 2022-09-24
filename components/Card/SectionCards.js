import styles from "./SectionCards.module.css";
import { Card } from "./Card";

export const SectionCards = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => (
          <Card id={idx} imgUrl={video.imgUrl} key={video} size={size} />
        ))}
      </div>
    </section>
  );
};
