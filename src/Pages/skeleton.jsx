 Skeleton.js
import styles from './skeleton.module.css';

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
