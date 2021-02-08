import React from 'react';

class Gif extends React.Component {
  handleClick = () => {
    if (this.props.selectGif) {
      this.props.selectGif(this.props.id);
    }
  }

  render() {
    const src = `https://media2.giphy.com/media/${this.props.id}/200.gif`;
    return (
        <div className="blup">
            <img src={src} onClick={this.handleClick} />
        </div>
    );
  }
}

export default Gif;