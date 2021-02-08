import React from 'react';

class SearchBar extends React.Component {
  handleUpdate = (event) => {
    this.props.searchFunction(event.target.value);
  }

  render() {
    return (
        <>
            <div className="ui search">
                <div className="ui icon input" >
                    <input className="prompt" type="text" placeholder="Search GIFs" onChange={this.handleUpdate} />
                    <i className="search icon"></i>
                </div>
            </div>
        </>
    );
  }
}

export default SearchBar;