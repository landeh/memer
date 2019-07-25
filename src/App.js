import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';

class App extends React.Component {

  state={
    memes:[],
    loading:false,
    text:'',
  }

  getMemes = async (e) => {
    e.preventDefault()
    this.setState({loading: true, memes:[]})
    var key = 'jhQazp87aPuMIRIZoFu2kaI2Uk5GjZRJ'
    var url = `https://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({memes: json.data, loading:false, text:''})
  }

  render() {
    var {memes, loading, text} = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getMemes}>
          <TextField value={text}
            autoFocus
            variant="outlined"
            label="Search for Memes"
            onChange={e=> this.setState({text: e.target.value})}
            style={{width:'100%',marginLeft:8}}
          />
          <Button variant="contained"
            color="primary"
            disabled={loading || !text} 
            type="submit"
            style={{width:150, margin:'0 10px', height:75}}>
            <SearchIcon style={{marginRight:8}} />
            Search
          </Button>
        </form>
        {loading && <LinearProgress />}
        <main>
          {memes.map(meme=>{
            return <Meme key={meme.id} meme={meme} />
          })}
        </main>
      </div>
    );
  }
}

function Meme(props){
  const {meme} = props
  const url = meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
    <img height="200" alt="meme" src={url} />
  </div>)
}

export default App;
