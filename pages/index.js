import { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import styles from "../styles/Home.module.css";

const size = 200;
const colors = ["#AD1EC2", "#D36EA6", "#D0BDD1", "#83BD16", "#16BDB1"];

export default function Home() {
  const container = useRef();
  const [box, setBox] = useState({
    color: 0,
    top: 0,
    left: 0,
    topDir: 1,
    leftDir: 1,
  });
  const { color, top, left, topDir, leftDir } = box;

  useEffect(() => {
    if (!container.current) return;

    window.requestAnimationFrame(() => {
      const width = container.current.offsetWidth;
      const height = container.current.offsetHeight;

      if (
        (leftDir === 1 && left + size >= width) ||
        (leftDir === -1 && left <= 0)
      ) {
        setBox((val) => ({ ...val, color: color + 1, leftDir: leftDir * -1 }));
      } else if (
        (topDir === 1 && top + size >= height) ||
        (topDir === -1 && top <= 0)
      ) {
        setBox((val) => ({ ...val, color: color + 1, topDir: topDir * -1 }));
      } else {
        setBox((val) => ({ ...val, top: top + topDir, left: left + leftDir }));
      }
    });
  }, [color, top, left, topDir, leftDir]);

  return (
    <div className={styles.container} ref={container}>
      <div style={{ top, left }}>
        <QRCode
          value="https://next.leighhalliday.com"
          bgColor={colors[color % colors.length]}
          size={size}
        />
      </div>
    </div>
  );
}
