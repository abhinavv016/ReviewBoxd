
import CrossIcons from "@/icons/crossIcon";
import { motion } from "framer-motion";
import SeasonsCarousal from "./seasonsCarousal";


interface SeasonProps {
    onClose: () => void;
    media_type: string;
    id: string;
}
export default function SeasonsComp({ onClose, media_type, id }: SeasonProps) {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >

            <div className="bg-[#415a77] p-6 rounded-md relative w-[1200px] h-[700px] ">
                <button
                    className="absolute top-3 right-3 text-white"
                    onClick={onClose}
                >
                    <CrossIcons />
                </button>
                <h2 className="text-white text-2xl font-bold text-center">Seasons</h2>
                <SeasonsCarousal media_type={media_type} id={id} />
            </div>
        </motion.div>
    )
}