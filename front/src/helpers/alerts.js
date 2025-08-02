import Swal from "sweetalert2";

export const successAlert = (titulo, texto) => {
  Swal.fire({
    icon: "success",
    title: titulo,
    ...(texto && { text: texto }),
    confirmButtonColor: "#6c63ff",
  });
};

export const errorAlert = (texto, error) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: `${texto}  ${
      error.response?.data?.message || error.message || "Unknown error"
    }`,
    confirmButtonColor: "#6c63ff",
  });
};
