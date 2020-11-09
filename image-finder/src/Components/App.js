import React, { Component } from "react";

import request from "../helpers/Request";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: "",
    page: 1,
    largeImgUrl: "",
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    request
      .fetchArticlesBYQuery(searchQuery, page)
      .then((images) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = (query) => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  toggleModal = () => {
    this.setState((state) => ({ showModal: !state.showModal }));
  };

  itemClick = e => {
    this.setState({largeImgUrl: e.target.id})
    this.toggleModal()
  }

  render() {
    const { images, loading, error, showModal, largeImgUrl } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {error && <p>Oops, somesing wrong: {error.message}</p>}
        {images.length > 0 && <ImageGallery images={images} itemClick={this.itemClick}/>}
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button loadMore={this.fetchArticles}/>
        )}
        {showModal && (
          <Modal closeModal={this.toggleModal} src={largeImgUrl}></Modal>
        )}
      </div>
    );
  }
}

export default App;
