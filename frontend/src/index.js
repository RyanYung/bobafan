import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField  } from "formik";
import * as Yup from 'yup';
import "./styles.css";

async function uploadToServer(review) {
  console.log("Uploading to server: " + review);
  const response = await fetch("/api/add", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(review) // body data type must match "Content-Type" header
  });
  let body = await response.json();
  console.log("server response: " + response);
  console.log(body);
  //setMessage(body.id ? "Data sucessfully updated" : "Data updation failed");
}



const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const RatingForm = () => {
  return (
    <>
      <h1>Submit Your Review!</h1>
      <Formik
        initialValues={{
          storeName: "",
          drinkName: "",
          rating: "",
          sugarLevel: ""
        }}
        validationSchema={Yup.object({
          storeName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
          drinkName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
          rating: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ["1", "2", "3", "4", "5"],
              "Invalid Rating"
            )
            .required("Required"),
            sugarLevel: Yup.string()
            .oneOf(
              ["100", "75", "50", "25", "0"],
              "Invalid Sugar Level"
            ).required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise(r => setTimeout(r, 500));
          uploadToServer(values);
          alert("Your review has successfully been submitted");
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            label="Store Name"
            name="storeName"
            type="text"
            placeholder="Tea Shop"
          />
          <MyTextInput
            label="Drink Name"
            name="drinkName"
            type="text"
            placeholder="Green Tea"
          />
          <MySelect label="Rating" name="rating">
            <option value="">Select your rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </MySelect>
          <MySelect label="Sugar Level" name="sugarLevel">
            <option value="">Select your sugar level</option>
            <option value="100">100%</option>
            <option value="75">75%</option>
            <option value="50">50%</option>
            <option value="25">25%</option>
            <option value="0">0%</option>
          </MySelect>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

function App() {
  return <RatingForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);