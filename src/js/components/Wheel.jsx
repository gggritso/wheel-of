import React, { Component, Fragment } from "react";

import OPTIONS from "../data/action-movies";

export class Wheel extends Component {
  constructor(props) {
    super(props);

    this.spin = this.spin.bind(this);

    const arc = 360 / OPTIONS.length;

    this.state = {
      rotation: 0,
      arc,
      slices: [],
    };

    OPTIONS.forEach((option, index) => {
      this.state.slices.push({
        text: option,
        rotationStart: index * arc,
        rotationEnd: (index + 1) * arc,
      });
    });
  }

  spin() {
    this.setState({ rotation: 0 });

    const rotationCount = randomNumber(10, 13);
    const lastRotationDegrees = randomNumber(0, 360);

    this.setState({ rotation: 360 * rotationCount + lastRotationDegrees });
  }

  render() {
    return (
      <Fragment>
        <div className="text-center">
          <h1 className="flex items-center flex-grow-0 m-16 text-20">
            <span className="mr-auto text-white">Wheel of Action</span>
            <button className="p-2 text-black bg-white" onClick={() => this.spin()}>
              Spin →
            </button>
          </h1>
        </div>

        <div
          className="mx-auto mt-48 overflow-hidden bg-white border rounded-full"
          style={{ width: "90vw", height: "90vw" }}
        >
          <div
            className="absolute z-10 bg-black"
            style={{ left: "50%", transform: "translate3d(-50%, -50%, 0) rotate(45deg)", width: 20, height: 20 }}
          ></div>
          <div
            className="relative w-full h-full"
            style={{ transition: "8.0s all ease-out", transform: `rotate(${this.state.rotation}deg)` }}
          >
            {this.state.slices.map((slice, sliceIndex) => {
              const transform = `rotate(${slice.rotationStart}deg)`;
              return (
                <div
                  key={sliceIndex}
                  className="absolute w-1/2 pr-16 text-right border-t-2 text-11"
                  style={{ top: "50%", left: "50%", transform, transformOrigin: "top left" }}
                >
                  <p
                    className="w-3/4 ml-auto text-right"
                    style={{ transform: `rotate(${this.state.arc / 2}deg)`, transformOrigin: "top left" }}
                  >
                    {slice.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
