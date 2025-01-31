
import React from "react";
import "swiper/css/pagination";

interface CustomPaginationProps {
  pagination: any;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ pagination }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: pagination.renderBullet(0, "swiper-pagination-bullet"),
      }}
    />
  );
};

export default CustomPagination;
