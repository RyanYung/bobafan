import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import "./styles.css";

const RankingForm = () => {
  const formik = useFormik({
    initialValues: { 
        storeName: "",
        drinkName: "",
        rating: ""
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="storeName">Store Name</label>
      <input
        id="storeName"
        name="storeName"
        type="storeName"
        onChange={formik.handleChange}
        value={formik.values.storeName}
      />

      <label htmlFor="drinkName">Drink Name</label>
      <input
        id="drinkName"
        name="drinkName"
        type="drinkName"
        onChange={formik.handleChange}
        value={formik.values.drinkName}
      />


      <div> </div>
      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  return <RankingForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
