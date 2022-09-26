import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames";
import { getYtVideoById } from "../../lib/videos";
import { Navbar } from "../../components/Navbar/Navbar";

Modal.setAppElement("#__next");

export const getStaticProps = async (ctx) => {
  const videoId = ctx.params.videoId;

  const videoArray = await getYtVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const listOfVideos = ["Ruyl8_PT_y8", "rlR4PJn8b8I", "DotnJ7tTA34"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();

  const { videoId } = router.query;

  return (
    <div className={styles.container}>
      <Navbar />

      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
          className={styles.videoPlayer}
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{video.publishTime}</p>
              <p className={styles.title}>{video.title}</p>
              <p className={styles.description}>{video.description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast:</span>
                <span className={styles.channelTitle}>
                  {video.channelTitle}
                </span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count:</span>
                <span className={styles.channelTitle}>
                  {video.statistics.viewCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
