import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// Define an interface for the props
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div>
            <button className="button-class" onClick={() => onPageChange(currentPage - 1)}>
                <ChevronLeft />
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button className="button-class"  onClick={() => onPageChange(currentPage + 1)}>
                <ChevronRight />
            </button>
            <button className="button-class">
                <MoreHorizontal />
            </button>
        </div>
    );
};

export default Pagination;
