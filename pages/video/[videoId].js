import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames";
import { getYtVideoById } from "../../lib/videos";
import { Navbar } from "../../components/Navbar/Navbar";
import Like from "../../components/icons/like-icon";
import DisLike from "../../components/icons/dislike-icon";
import { useEffect, useState } from "react";

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
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  const router = useRouter();

  const { videoId } = router.query;

  useEffect(() => {
    (async function () {
      const response = await fetch(`/api/stats?videoId=${videoId}`);

      const data = await response.json();

      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDisLike(true);
        }
      }
    })();
  }, [videoId]);

  const runRatingServices = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDisLike(toggleLike);

    const favourited = val ? 1 : 0;

    const response = await runRatingServices(favourited);

    console.log("data", await response.json());
  };
  const handleToggleDislike = async () => {
    const val = !toggleDisLike;

    setToggleDisLike(val);
    setToggleLike(toggleDisLike);

    const favourited = val ? 0 : 1;

    const response = await runRatingServices(favourited);

    console.log("data", await response.json());
  };

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

        <div className={styles.likeDislikeBtnWrapper}>
          <button onClick={handleToggleLike}>
            <div className={styles.likeBtnWrapper}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </div>
          </button>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDisLike} />
            </div>
          </button>
        </div>

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
