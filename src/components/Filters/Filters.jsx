import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { fetchProducts } from "../../redux/products/operations";
import {
  setCurrentPage,
  setFilters,
  setProductsPerPage,
} from "../../redux/products/slice";
import { selectFilters } from "../../redux/products/selectors";
import s from "./Filters.module.css";

const sprite = "/sprite.svg";

const categories = [
  "Head",
  "Leg",
  "Heart",
  "Medicine",
  "Dental Care",
  "Hand",
  "Skin Care",
];

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const initialValuesFilters = {
    name: filters.name,
    category: filters.category,
  };

  const handleSubmit = (values, actions) => {
    dispatch(setFilters(values));
    dispatch(setCurrentPage(1));

    const width = window.innerWidth;
    let productsPerPage = 8;

    if (width >= 1440) {
      productsPerPage = 12;
    } else if (width >= 768) {
      productsPerPage = 9;
    }

    dispatch(setProductsPerPage(productsPerPage));

    dispatch(fetchProducts({ page: 1, perPage: productsPerPage }));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValuesFilters}
      onSubmit={handleSubmit}
      enableReinitialize>
      {({ values, handleChange }) => (
        <Form className={s.form}>
          <label className={s.label}>
            <Field
              as="select"
              name="category"
              className={s.option}
              value={values.category}
              onChange={handleChange}>
              <option value="">Product category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Field>
            <svg
              className={s.icon}
              onClick={() => document.getElementById("categorySelect").focus()}>
              <use href={`${sprite}#icon-chevron-down`} />
            </svg>
          </label>

          <label className={s.label}>
            <Field
              type="text"
              name="name"
              placeholder="Search medicine"
              className={s.input}
              value={values.name}
              onChange={handleChange}
            />
            <svg className={s.icon}>
              <use href={`${sprite}#icon-search`} />
            </svg>
          </label>

          <button className={s.button} type="submit">
            <svg className={s.filter}>
              <use href={`${sprite}#icon-filter`} />
            </svg>
            <p className={s.text}>Filter</p>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
