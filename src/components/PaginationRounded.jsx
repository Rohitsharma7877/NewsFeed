import * as React from "react";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/material";

export default function PaginationRounded() {
  return (
    <div className="flex justify-center items-center p-4">
      <Stack spacing={2} className="w-full sm:w-1/2 md:w-1/3">
        <Pagination count={10} shape="rounded" />
      </Stack>
    </div>
  );
}
