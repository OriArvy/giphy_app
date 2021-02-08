import '../App.css'
import React from 'react';
import giphy from 'giphy-api';
import Modal from 'react-modal';

import SearchBar from './SearchBar';
import Gif from './Gif';
import GifList from './GifList';

const GIPHY_API_KEY = 'kq5n8Zqqda7uRu59qZJZT56pZq8xqJ5I';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-45%, -45%)',
    padding               : '0'
  }
};

const closeModal = {
  position: 'absolute',
  top: 6,
  right: 6,
}
Modal.setAppElement('#root')
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      selectedGifId: null,
      showModal: false,
      gifsOffset: 0
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.infiniteScroll = this.infiniteScroll.bind(this);
  }

  componentWillMount() {
    // Loading Giphs' feed
    this.loadFeed();
}

componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll);
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
}


scrollFeed() {
  this.setState({
      gifsOffset: this.state.gifsOffset + 12,
  });
  this.loadFeed();
}

loadFeed() {
  giphy({ apiKey: GIPHY_API_KEY, https: true })
  .trending({
     offset: this.state.gifsOffset,
     limit: 12
     }).then((response) => {
      response.data.forEach((gif) => {
          let newArray = this.state.gifs.slice();
          newArray.push(gif);
          console.log(newArray.length)
          this.setState({
              gifs: newArray
            });
          })
      })
      .catch((err) => {
          // Maybe Alert Danger
      })
}

infiniteScroll() {
  // Check if close to the end of the page
  if ((window.innerHeight + window.scrollY) < (document.body.scrollHeight - 600))
      return;
      this.scrollFeed();
}

  search = (query) => {
    giphy({ apiKey: GIPHY_API_KEY, https: true })
      .search({
        q: query,
        rating: 'g',
        limit: 12,
      }, (err, result) => {
        console.log(result.data)
        this.setState({
          gifs: [],
          gifs: result.data
        });
      });
  }

  selectGif = (id) => {
    this.setState({
      selectedGifId: id
    });
  }

  handleOpenModal () {
    this.setState({ showModal: true});
  }

  handleCloseModal () {
    this.setState({ showModal: false});
  }

  render() {
    return (
      <>  
            <SearchBar className="search-bar" searchFunction={this.search} />
            <div className="container">
              <Modal 
                isOpen={this.state.showModal}
                onRequestClose={this.handleCloseModal}
                style={customStyles}
              >
                <button onClick={this.handleCloseModal} style={closeModal}>X</button>
                <Gif id={this.state.selectedGifId} className="gif" />
              </Modal>
                <div onClick={this.handleOpenModal}> <GifList gifs={this.state.gifs} selectGif={this.selectGif} /> </div>
          </div>
      </>
    );
  }
}

export default App;