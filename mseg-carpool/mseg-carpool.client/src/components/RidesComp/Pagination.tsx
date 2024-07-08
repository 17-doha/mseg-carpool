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
            <button onClick={() => onPageChange(currentPage - 1)}>
                <ChevronLeft />
            </button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)}>
                <ChevronRight />
            </button>
            <button>
                <MoreHorizontal />
            </button>
        </div>
    );
};

export default Pagination;
