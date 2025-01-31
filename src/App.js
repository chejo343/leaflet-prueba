import React, { useState, useEffect } from 'react';
import './App.css';

const colores = ['blue','red','green','yellow'];

function App() {
  const [matriz, setMatriz] = useState(Array(10).fill().map(() => Array(10).fill({value: 0, color: 'blue'})));
  const [color, setColor] = useState('blue');
  const handleChange = (i1, i2) => {
    let matrizTmp = [...matriz]
    const cambiarColor = (i1, i2, m) => {
      const newMatriz = m.map((row, i) => row.map((cell, j) => {
        if (i === i1 && j === i2 && cell.color !== color) {
          return {
            value: cell.value,
            color: color
          }
        }
        return cell;
      }));
      return newMatriz;
    }
    const tieneVecinos = (i1, i2, m) => {
      const vecinos = [
        [i1-1, i2],
        [i1+1, i2],
        [i1, i2-1],
        [i1, i2+1]
      ];
      return vecinos.filter(([i, j]) => i >= 0 && i < m.length && j >= 0 && j < m[0].length);
    }
    matrizTmp = cambiarColor(i1, i2, matrizTmp);
    while (tieneVecinos(i1, i2, matrizTmp).length > 0) {
      tieneVecinos(i1, i2, matrizTmp).forEach(([i, j]) => {
        if (matrizTmp[i][j].color !== color) {
          matrizTmp = cambiarColor(i, j, matrizTmp);
        }
      });
    }
    setMatriz(matrizTmp);
  }
  useEffect(() => {

  }, [matriz]);
  return (
    <div className="App">
    <div className="container">
      <div className="board">
      {
        matriz.map((row, i1) =>
          row.map((cell, i2) =>
            (<button
              key={i1 + i2}
              className={`cuadrito cuadrito_${cell.color}`}
              onClick={() => handleChange(i1, i2)}
            >
              {i1} {i2}
            </button>)))
      }
      </div>
    </div>
    <div className='paleta'>
      {
        colores.map((color, i) =>
        (<button
            key={i}
            className={`cuadrito_${color}`}
            onClick={() => setColor(color)}
          >
          {color.color}
        </button>))
      }
      </div>
    </div>
  );
}

export default App;
