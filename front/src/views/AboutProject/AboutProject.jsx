import styles from "./AboutProject.module.css";

const AboutProject = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sobre el Proyecto</h1>

        <p className={styles.description}>
          This project is an online appointment management platform that allows
          users to book appointments quickly and efficiently. It provides an
          authentication system, user management, and an admin panel to
          facilitate the organization of appointments for different services.
        </p>

        <h2 className={styles.subtitle}>Tecnologías Utilizadas</h2>
        <ul className={styles.techList}>
          <li>React.js</li>
          <li>Express.js</li>
          <li>PostgreSQL</li>
          <li>Node.js</li>
          <li>Styled Components</li>
          <li>JWT para autenticación</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutProject;
