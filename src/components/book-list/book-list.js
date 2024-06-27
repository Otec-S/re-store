import React, { Component } from "react";
import "./book-list.css";
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { withBookstoreService } from "../hoc";
import { fetchBooks } from "../../actions";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const BookList = ({ books }) => {
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
};

class BookListContainer extends Component {
  componentDidMount() {
    // получение данных из сервиса
    // const { bookstoreService, booksLoaded, booksRequested, booksError } =
    //   this.props;
    // booksRequested(); // вызов action creator без аргументов и передача action в redux store через mapDispatchToProps (в данном случае через booksRequested) для обновления state в redux store (в данном случае обновление loading в state.loading) и перерисовки компонента (в данном случае перерисовка спиннера) с новыми данными (в данном случае с данными из сервиса)
    // bookstoreService
    //   .getBooks()
    //   .then((data) => booksLoaded(data))
    //   .catch((err) => booksError(err)); // вызов action creator с данными из сервиса (полученными в результате работы промиса) в качестве аргумента (в данном случае массив книг) и передача action в redux store через mapDispatchToProps (в данном случае через booksLoaded) для обновления state в redux store (в данном случае обновление массива книг в state.books) и перерисовки компонента (в данном случае перерисовка списка книг) с новыми данными (в данном случае с данными из сервиса)
    this.props.fetchBooks(); // заменяем код выше на этот, чтобы не дублировать код в mapDispatchToProps и в componentDidMount
  }

  render() {
    const { books, loading, error } = this.props;
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} />;
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error,
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
// const mapDispatchToProps = { booksLoaded, booksRequested, booksError }; // здесь мы используем объект вместо функции, чтобы автоматически обернуть action creator в dispatch и возвращаем объект с action creator в качестве свойств (в данном случае один action creator) и redux сам все сделает за нас (примерно как вариант 3)

// ВАРИАНТ 5

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
  };
}; // здесь мы используем функцию вместо объекта, чтобы получить доступ к ownProps (в данном случае к bookstoreService) и передать его в mapDispatchToProps

export default withBookstoreService()(
  connect(mapStateToProps, mapDispatchToProps)(BookListContainer)
);
