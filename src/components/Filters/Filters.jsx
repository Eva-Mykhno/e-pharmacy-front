import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { fetchProducts } from "../../redux/products/operations";
import { setFilters } from "../../redux/products/slice";
import { selectFilters } from "../../redux/products/selectors";
import s from "./Filters.module.css";

const categories = [
  "Head",
  "Leg",
  "Heart",
  "Medicine",
  "Dental Care",
  "Hand",
  "Skin Care",
];

const Filters = ({ perPage }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const initialValuesFilters = {
    name: filters.name,
    category: filters.category,
  };

  const handleSubmit = (values, actions) => {
    dispatch(setFilters(values));
    dispatch(fetchProducts({ page: 1, perPage }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValuesFilters}
      onSubmit={handleSubmit}
      enableReinitialize>
      {({ values, handleChange }) => (
        <Form className={s.filters}>
          <Field
            type="text"
            name="name"
            placeholder="Search medicine"
            className={s.input}
            value={values.name}
            onChange={handleChange}
          />

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

          <button className={s.button} type="submit">
            Filter
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
