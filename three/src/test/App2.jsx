import React from 'react';
import { Canvas } from 'react-three-fiber';
import '../App.css';

/*使用 boxBufferGeometry 和 meshPhongMaterial 創建立方體網格，並應用 meshPhongMaterial 物質屬性*/
/**ambientLight-定義環境光源，設定燈光的顏色為 0xff0000，強度為 0.1 */
/**directionalLight-定義定向光源，設定光源位置為 [0, 0, 5]，強度為 0.5 */
export default function App() {
  return (
    <div className='App'>
      <Canvas>
        <mesh>
          <boxBufferGeometry />
          <meshPhongMaterial />
          <ambientLight args={[0xff0000]} intensity={0.1} />
          <directionalLight position={[0, 0, 5]} intensity={0.5} />
        </mesh>
      </Canvas>
    </div>
  );
}
