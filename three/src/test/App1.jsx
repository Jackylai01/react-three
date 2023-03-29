import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

const Box = (props) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false); //建立滑鼠滑到物件的state
  const [active, setActive] = useState(false); //建立放大的state

  //useFrame是一個Fiber 掛鉤，可用於更新渲染器狀態，可讓在Fiber 渲染循環的每一幀上執行程式碼
  //下行為 mesh 物件的 x 軸旋轉的程式碼，delta 是每一個 frame 的時間差，讓 mesh 的 x 軸每一個 frame 會有一點旋轉的變化
  useFrame((state, delta) => (mesh.current.rotation.x += delta));

  //建立一個立方體，其顏色會隨著使用者滑鼠游標的滑入或滑出而改變。當使用者按下物件時，物件的尺寸會放大1.5倍
  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(e) => setActive(!active)} //常見toogle 的用法
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    </>
  );
};

/**Canvas 的用法:
camera：定義視點位置和角度
mesh：定義3D網格的形狀和材質
light：定義燈光的類型和位置
geometry：定義形狀的點和面
material：定義對應材質的紋理和顏色 */

const App1 = () => {
  return (
    <>
      <Canvas>
        <Box />
      </Canvas>
    </>
  );
};

export default App1;
