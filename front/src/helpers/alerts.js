import Swal from "sweetalert2";

export const successAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonColor: "#28a745",
  });
};

export const errorAlert = (text, error) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: `${text} ${
      error.response?.data?.message || error.message || "Unknown error"
    }`,
    confirmButtonColor: "#dc3545",
  });
};
