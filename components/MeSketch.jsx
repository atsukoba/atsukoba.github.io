import React, { Component } from "react";

class MeSketch extends Component {
  constructor() {
    super();
    this.state = {
      dom: <p>Now Rendering...</p>,
    };
  }

  componentDidMount() {
    const Sketch = require("react-p5");
    let x = 0;
    let y = 0;

    const setup = (p5, canvasParentRef) => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      p5.createCanvas(this.props.width || 500, this.props.height || 500).parent(
        canvasParentRef
      );
    };

    const draw = (p5) => {
      p5.background(255);
      p5.ellipse(x, y, 70, 70);
      // NOTE: Do not use setState in the draw function or in functions that are executed
      // in the draw function...
      // please use normal variables or class properties for these purposes
      x++;
    };

    this.setState({ dom: <Sketch setup={setup} draw={draw} /> });
  }

  render() {
    return <div>{this.state.dom}</div>;
  }
}

export default MeSketch;
