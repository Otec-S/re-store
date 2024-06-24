import React, { Component } from "react";
import "./book-list.css";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { withBookstoreService } from "../hoc";
import { booksLoaded } from "../../actions";

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();
    console.log(data); // мы получили данные из сервиса и можем их использовать в приложении

    this.props.booksLoaded(data);
  }

  render() {
    const { books } = this.props;
    return (
      <ul className="book-list">
        {books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem book={book} />
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

// ВАРИАНТ 1
// const mapDispatchToProps = (dispatch) => {
//   return {
//     booksLoaded: (newBooks) => {
//       dispatch({
//         type: "BOOKS_LOADED", // здесь мы руками делаем action
//         payload: newBooks,
//       });
//     },
//   };
// };

// ВАРИАНТ 2
// const mapDispatchToProps = (dispatch) => {
//   return {
//     booksLoaded: (newBooks) => {
//       dispatch(booksLoaded(newBooks)); // здесь мы используем импортированный action creator
//     },
//   };
// };

// ВАРИАНТ 3
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ booksLoaded }, dispatch); // здесь мы используем bindActionCreators для автоматической обертки action creator в dispatch и возвращаем объект с action creator в качестве свойств (в данном случае один action creator)
// };

// ВАРИАНТ 4
const mapDispatchToProps = { booksLoaded }; // здесь мы используем объект вместо функции, чтобы автоматически обернуть action creator в dispatch и возвращаем объект с action creator в качестве свойств (в данном случае один action creator) и redux сам все сделает за нас (примерно как вариант 3)

export default withBookstoreService()(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
);
