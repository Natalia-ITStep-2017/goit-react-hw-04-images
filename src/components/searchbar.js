import { useState } from 'react';
import PropTypes from "prop-types";
import css from './styles.module.css';
import { BsSearch } from 'react-icons/bs';


const Searchbar = ({ onSubmit }) => {

  const [searchText, setSearchText] = useState('')

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setSearchText(value)
  }

  const handleAddContact = (event) => {
    event.preventDefault();

    onSubmit(searchText)
  }

  return (
    <header className={css.Searchbar} >
      <form className={css.SearchForm}
        onSubmit={handleAddContact}>
        <button type="submit" className={css.SearchFormButton}>
          <BsSearch />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchText}
          onChange={handleChange}
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar
