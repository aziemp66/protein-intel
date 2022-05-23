import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import axios from "axios";

const Register = () => {
  const [isError, setIsError] = useState(null);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: e.target.name.value,
        nim: e.target.nim.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      });
    } catch (error) {
      console.log(error);
      setIsError(error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.forms}>
          <div className={`${styles.form} ${styles.login}`}>
            <span className={styles.title}>Registrasi</span>

            <form onSubmit={onSubmitHandler}>
              <div className={styles["input-field"]}>
                <input
                  type="text"
                  placeholder="Masukkan Nama"
                  required
                  name="name"
                />
              </div>

              <div className={styles["input-field"]}>
                <input
                  type="text"
                  placeholder="Masukkan Email"
                  required
                  name="email"
                />
              </div>

              <div className={styles["input-field"]}>
                <input
                  type="text"
                  placeholder="Masukkan 
									NIM"
                  required
                  name="nim"
                />
              </div>

              <div className={styles["input-field"]}>
                <input
                  type="password"
                  placeholder="Masukkan Password"
                  required
                  name="password"
                />
              </div>

              <div className={styles["input-field"]}>
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  required
                  name="confirmPassword"
                />
              </div>

              <button
                type="submit"
                className={`${styles["input-field"]} ${styles.button}`}
              >
                Registrasi
              </button>
            </form>

            <div></div>

            <div className={styles["login-signup"]}>
              <span className={styles.text}>
                Sudah daftar?
                <Link
                  to={"/login"}
                  className={` ${styles.text} ${styles["signup-text"]} `}
                >
                  Login sekarang
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;