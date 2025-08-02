import styles from "./Contacto.module.css";

const Contacto = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Contact</h1>

        <div className={styles.info}>
          <p>
            <strong>Name:</strong> {"Matías Gallardo"}
          </p>
          <p>
            <strong>Email:</strong> {"example@gmail.com"}
          </p>
          <p>
            <strong>Phone:</strong> {"+61 00000000 "}
          </p>
          <p>
            <strong>Location:</strong> {"Moree, Australia"}
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/matias-gallardo-87059b349/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              My LinkedIn
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/matiasgallardo196"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              My GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
