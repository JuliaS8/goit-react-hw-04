import React from 'react'
import css from "./SearchBar.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      query: ''
    },
    validationSchema: Yup.object({
      query: Yup.string().trim().required('Please enter a search term.')
    }),
    onSubmit: (values) => {
      if (values.query.trim()) {
        onSubmit(values.query);
      } else {
        toast.error('Please enter a search term.');
      }
    }
  });

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search images and photos"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.query}
        />
        <button
          className={css.button}
          type="submit"
        >
          Search
        </button>
        </div>
            {formik.touched.query && formik.errors.query ? (
          <div className={css.error}>{formik.errors.query}</div>
        ) : null}
      </form>
    </header>
  );
};

export default SearchBar;
