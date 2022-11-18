import classes from "./Pagination.module.scss";
import usersClasses from "../Users.module.scss";
import React from "react";
import clsx from "clsx";
import Select from "src/components/Select/Select";
import { TOption } from "src/components/Select/Select.types";
import { usePagination } from "src/features/Users/Pagination/Pagination.utils";

type TPaginationProps = {
  totalCount: number;
  totalPages: number;
  page: number;
  bunchCount: number;
  limit: number;
  limitOptions: TOption[];
  onIncrementPage: () => void;
  onDecrementPage: () => void;
  onPageChange: (newPage: number) => void;
  onLimitChange: (value: number) => void;
};

const Pagination: React.FC<TPaginationProps> = ({
  totalCount,
  totalPages,
  page,
  bunchCount,
  limit,
  limitOptions,
  onIncrementPage,
  onDecrementPage,
  onPageChange,
  onLimitChange,
}) => {
  const pageButtons = usePagination(page, totalPages);
  const itemsOffset = (page - 1) * limit;
  return (
    <div className={usersClasses.footer}>
      <div className={clsx(classes["items-per-page"], classes.item)}>
        <p className={usersClasses.text}>Show:</p>
        <Select
          value={limit}
          options={limitOptions}
          onChange={(value: string) => onLimitChange(parseInt(value))}
          direction="up"
        />
      </div>
      <div className={classes.pagination}>
        <button
          className={classes.arrow}
          onClick={onDecrementPage}
          disabled={page === 1}
        >
          ❮
        </button>
        {pageButtons.map((pageButton, index) =>
          pageButton ? (
            <button
              key={index}
              className={clsx({
                [classes.button_highlighted]: pageButton === page,
              })}
              disabled={pageButton === page}
              onClick={() => onPageChange(pageButton)}
            >
              {pageButton}
            </button>
          ) : (
            <p key={index}>...</p>
          )
        )}
        <button
          className={classes.arrow}
          onClick={onIncrementPage}
          disabled={page === totalPages}
        >
          ❯
        </button>
      </div>
      <p className={clsx(usersClasses.text, classes.item)}>
        Results: {itemsOffset + 1}-{itemsOffset + bunchCount} of {totalCount}
      </p>
    </div>
  );
};

export default Pagination;
