import "./polyfill";
import sass from "sass";
import React from "react";
import ReactDOM from "react-dom";

// const css = sass
//   .renderSync({
//     data: ".foo { .bar{ color: red} }"
//   })
//   .css.toString();

const CompileApp = ({ scss, css, handleChange, error }) => {
  return (
    <div>
      <h1>Input SCSS</h1>
      <textarea rows={8} onChange={e => handleChange(e)} value={scss} />
      <h1>Output</h1>
      <pre>
        <code>{css}</code>
      </pre>
      <div>{error}</div>
    </div>
  );
};

const defaultScss = `
$color: #ff0000;
.foo { 
  .baz { 
    color: $color
  } 
}
`.trim();

class SassCompileContainer extends React.Component {
  constructor() {
    super();
    this.state = { scss: defaultScss, css: "", error: null };
  }
  componentDidMount() {
    this.sync();
  }
  handleChange(e) {
    const newState = {
      scss: e.target.value
    };
    this.setState(newState, () => {
      this.sync();
    });
  }
  sync() {
    try {
      const css = sass
        .renderSync({
          data: this.state.scss
        })
        .css.toString();
      this.setState({
        css
      });
    } catch (e) {
      this.setState({
        error: e
      });
    }
  }
  render() {
    return (
      <CompileApp
        handleChange={this.handleChange}
        scss={this.state.scss}
        css={this.state.css}
        error={this.state.error}
      />
    );
  }
}

function App() {
  return (
    <div className="App">
      <SassCompileContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
