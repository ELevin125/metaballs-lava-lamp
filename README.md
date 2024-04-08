![image](https://github.com/ELevin125/metaballs-lava-lamp/assets/123626350/7f275046-5773-4c63-8c76-6a4a0ef6180e)

# Lava Lamp Project

This project creates a mesmerizing lava lamp effect using metaballs implemented with the use p5.js. Metaballs are organic-looking n-dimensional objects used in computer graphics to model blobs of varying shapes and sizes.

## Code Structure

1. `Blob`: a singular blob / ellipse that can rnadomly move around within the specified limits.
2. `LampFluid`: a collection of blobs with a blur and threshold applied. Only the area where the blobs are, and a small padding area have the effect applied, to help optimise performance.
3. `Lamp`: the lamp object displayed on the canvas, containing the fluid.
 
## Acknowledgments
This project was written in JS using [P5.js](https://p5js.org/), a JavaScript library for creative coding and visualization.
