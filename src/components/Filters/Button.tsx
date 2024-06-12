// Button.tsx
import { motion } from "framer-motion";
import { Category } from "../../../types";

const Button = ({
  category,
  filter,
  setFilter,
}: {
  category: Category;
  filter: string;
  setFilter: any;
}) => {
  return (
    <motion.div
      onClick={() => setFilter(category.nombre)}
      whileTap={{ scale: 1.1 }}
      className={`group ${
        category.nombre === filter
          ? "hover:bg-btnOverlay bg-cartNumBg"
          : "bg-btnOverlay hover:bg-cartNumBg"
      } w-24 min-w-[6rem] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-out`}
    >
      <div
        className={`w-10 h-10 rounded-full ${
          category.nombre === filter
            ? "group-hover:bg-cartNumBg bg-btnOverlay"
            : "bg-cartNumBg group-hover:bg-btnOverlay"
        } flex items-center justify-center`}
      >
        <img
          src={category.imagen}
          alt={category.nombre}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <p
        className={`text-base ${
          category.nombre === filter
            ? "group-hover:text-textColor text-white"
            : "text-textColor group-hover:text-white"
        }`}
      >
        {category.nombre}
      </p>
    </motion.div>
  );
};

export default Button;
