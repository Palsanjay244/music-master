import React, { Component } from 'react';
import './index.css';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {

  state = {artistQuery : '',artist : null, tracks : [] };

  updateQuery = event => {
    this.setState({artistQuery:event.target.value});
  }

  searchArtist=()=>{
   fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
   .then(response=>response.json())
   .then(json=>{
     if (json.artists.total > 0) {
       const artist = json.artists.items[0];
       this.setState({artist});

       fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
         .then(response => response.json())
         .then(json =>this.setState({tracks:json.tracks}))
         .catch(error => alert(error.message));
   }
  })
  .catch(error=>alert(error.message));
  }

  keyPress=event=>{
   if(event.key === 'Enter')
   {
      this.searchArtist();
   }
  }

  render() {
    console.log('this.state',this.state);
    return (
      <div>
        <h3>Music Master</h3>
        <input placeholder='Search'
               onChange={this.updateQuery}
               onKeyPress={this.keyPress}
        />
        <button onClick={this.searchArtist}
                variant = "dark" 
        >
          Search</button>
      </div>
    );
  }
}

export default App;
