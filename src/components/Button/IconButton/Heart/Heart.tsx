import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useDeleteHeart from "hooks/queries/heart/useDeleteHeart";
import usePostHeart from "hooks/queries/heart/usePostHeart";
import Icon from "components/Icon";

interface HeartProps {
  size?: number;
  id: number;
  isMarked?: boolean;
}

const Heart = ({ size, id, isMarked }: HeartProps) => {
  const [mark, setMark] = useState(isMarked);
  const [markAni, setMarkAni] = useState(false);
  const { mutate: deleteHeartMutate } = useDeleteHeart();
  const { mutate: postHeartMutate } = usePostHeart();

  const handleClickMark = async (e: any) => {
    e.stopPropagation();
    setMark(!mark);
    setMarkAni(true);
    setTimeout(() => {
      if (mark) {
        deleteHeartMutate({ id });
      } else {
        postHeartMutate({ id });
      }
      setMarkAni(false);
    }, 200);
  };

  useEffect(() => {
    setMark(isMarked);
  }, [isMarked]);

  return (
    <>
      {markAni ? (
        <>
          {/* <Icon
            icon="Heart"
            width={size}
            height={size}
            color="undefined"
            fill="undefined"
            style={{
              position: "absolute",
            }}
          /> */}
          <motion.div
            animate={mark ? "open" : "closed"}
            variants={{
              open: { scale: [0, 1] },
              closed: { scale: [1, 0] },
            }}
            onClick={handleClickMark}
          >
            <Icon
              icon="Heart"
              width={size}
              height={size}
              color="Red"
              fill="Red"
            />
          </motion.div>
        </>
      ) : (
        <Icon
          icon="Heart"
          width={size}
          height={size}
          color={mark ? "Red" : "undefined"}
          fill={mark ? "Red" : "undefined"}
          onClick={handleClickMark}
        />
      )}
    </>
  );
};

export default Heart;
