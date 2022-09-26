import styles from "./SectionCards.module.css";
import { Card } from "./Card";
import Link from "next/link";

export const SectionCards = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => (
          <Link key={idx} href={`/video/${encodeURIComponent(video.id)}`}>
            <a>
              <Card id={idx} imgUrl={video.imgUrl} size={size} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};
