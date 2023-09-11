import React from 'react';
import axios from 'axios';

const colors = [
  '#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c',
  '#9b59b6', '#FB6964', '#342224', '#472E32', '#BDBB99',
  '#77B1A9', '#73A857'
];

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      color: ''
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    this.getQuotes();
  }

  getQuotes() {
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(res => {
        const quotes = res.data.quotes;
        this.setState({ quotes }, this.getNewQuote);
      });
  }

  getNewQuote() {
    const quotes = this.state.quotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.setState({
      quote: randomQuote.quote,
      author: randomQuote.author,
      color: color
    });
    document.body.style.backgroundColor = color;
  }

  render() {
    return (
      <div id="quote-box" style={{color: this.state.color}}>
        <div id="text">{this.state.quote}</div>
        <div id="author">{this.state.author}</div>
        <button id="new-quote" style={{backgroundColor: this.state.color}} onClick={this.getNewQuote}>New Quote</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${this.state.quote} - ${this.state.author}`} target="_blank" rel="noopener noreferrer">Tweet Quote</a>
      </div>
    );
  }
}

export default QuoteBox;
