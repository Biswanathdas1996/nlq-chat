import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface TableProps {
  data: any[];
  loadingUi: boolean;
}

const Table: React.FC<TableProps> = ({ data, loadingUi }) => {
  const columns: GridColDef[] = Object.keys(data[0] || {}).map((key) => {
    if (key === "fullName") {
      return {
        field: key,
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
      };
    }
    return {
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: 130,
    };
  });

  const rows = data.map((item, index) => {
    return { id: index, ...item };
  });

  if (data.length !== 0) {
    return (
      <>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20, 50]}
          checkboxSelection
          filterModel={{
            items: columns.some((col) => col.field === "fullName")
              ? [{ field: "fullName", operator: "contains", value: "" }]
              : [],
          }}
          sx={{
            border: 0,
            "& .css-1n5bvky-MuiDataGrid-root .MuiDataGrid-container--top [role=row]":
              {
                backgroundColor: "black !important",
              },
          }}
          loading={loadingUi}
        />
      </>
    );
  }
};

const paginationModel = { page: 0, pageSize: 5 };

export default Table;
