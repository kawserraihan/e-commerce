"use client"
import React from "react";
import FormElements from "@/components/FormElements";
// import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const FormElementsPage = () => {

  const notify = () => toast("Wow so easy!");
  return (
    <div>
        <button onClick={notify}>Notify!</button>
        {/* <ToastContainer /> */}
      </div>
  );
};

export default FormElementsPage;
