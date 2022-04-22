![example workflow](https://github.com/sha-kil/kabschjs/actions/workflows/build.yml/badge.svg?branch=master)<br>
# kabschjs

A simple library to compute rigid transformation matrix between two point sets.
Implements kabsch algorithm as explained in https://en.wikipedia.org/wiki/Kabsch_algorithm to compute rotation matrix. By default, utilizes gpu if webgl
is supported.

## usage
```
import { getRigidTransformation } from 'kabschjs';

const setA = [ [1,2,3], [4,5,6] ];
const setB = [ [11,12,13], [14,15,16] ];

const [R, T] = getRigidTransformation(setA, setB);
```
<br>
getRigidTransformation returns rigid transformation between two points sets
setA and setB (from setA to setB).<br><br>
SetA and SetB are two dimensional arrays. As the expected point dimension is 3, each element of a set must be array and of length 3.<br><br>
The output is also a two dimension array of size: 4x3 which represents the rigid transformation matrix. First element is the rotation matrix and the second one is the translation vector.
<br><br>

## installation
`npm install kabschjs`