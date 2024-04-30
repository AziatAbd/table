import { DataGrid } from "@mui/x-data-grid";
import "./App.css";
import { data } from "./common";
import { Modal, Typography, styled } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

function App() {
  const [characters, setCharacters] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [img, setImg] = useState(null);

  const openModalHandler = (imgUrl) => {
    setOpenModal(true);
    setImg(imgUrl);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const getCharacters = async () => {
    try {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const { results } = await res.json();
      setCharacters(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      renderCell: ({ row }) => <p>{row.id}</p>,
    },
    {
      field: "name",
      headerName: "Full name",
      width: 200,
      renderCell: ({ row }) => <FullName>{row.name}</FullName>,
    },
    {
      field: "created",
      headerName: "Created",
      width: 200,
      renderCell: ({ row }) => (
        <CreatedData>{moment(row.created).format("MMMM Do YYYY")}</CreatedData>
      ),
    },
    {
      field: "image",
      headerName: "Character",
      renderCell: ({ row }) => (
        <StyledImageContainer onClick={() => openModalHandler(row.image)}>
          <img src={row.image} alt={row.name} />
        </StyledImageContainer>
      ),
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) =>
    //     `${row.firstName || ""} ${row.lastName || ""}`,
    // },
  ];

  return (
    <div className="App">
      <StyledDataGrid
        rows={characters}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        getRowHeight={() => "auto"}
        sx={{
          [`& img`]: {
            minHeight: "100px",
            maxHeight: "300px",
            height: "100%",
          },
        }}
      />
      <StyledModal open={openModal} onClose={closeModalHandler}>
        <img src={img} alt="img" />
      </StyledModal>
    </div>
  );
}

export default App;

const StyledDataGrid = styled(DataGrid)(() => ({
  height: "600px",
}));

const StyledImageContainer = styled("div")({
  height: "auto",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const StyledModal = styled(Modal)(() => ({
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const FullName = styled(Typography)(() => ({
  color: "slategray",
  fontWeight: 700,
}));

const CreatedData = styled(Typography)(() => ({
  color: "blueviolet",
  fontWeight: 600,
}));
