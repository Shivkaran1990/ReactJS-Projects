import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TYSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';
import _ from 'lodash';

const API_KEY = 'AIzaSyAGZEHEnDKxoewB0NP0ftB0MwwYpJGYaa0';



class App extends Component {

constructor(props)
{
    super(props);
    this.state = { 
        videos: [],
        selectedVideo:null
     };

  this.videoSearch("Irom Man");
}

    videoSearch(term) {
        TYSearch({ key: API_KEY, term:term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {

        const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300)
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetails video={this.state.selectedVideo} />
                <VideoList
                onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
                 videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));

//