import styles from "./Contacto.module.css";

const Contacto = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Contacto</h1>
        
        <div className={styles.info}>
          <p><strong>Nombre:</strong> {"Matías Gallardo"}</p>
          <p><strong>Email:</strong> {"example@gmail.com"}</p>
          <p><strong>Teléfono:</strong> {"+61 00000000 "}</p>
          <p><strong>Ubicación:</strong> {"Moree, Australia"}</p>
          <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/matias-gallardo-87059b349/" target="_blank" rel="noopener noreferrer" className={styles.link}>Mi LinkedIn</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/matiasgallardo196" target="_blank" rel="noopener noreferrer" className={styles.link}>Mi GitHub</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;