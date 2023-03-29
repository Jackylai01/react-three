import {
  BakeShadows,
  CubeCamera,
  Environment,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import { applyProps, Canvas } from '@react-three/fiber';
import { Tween } from '@tweenjs/tween.js';
import { useLayoutEffect } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

//建立空間-球場
function Court(props) {
  // 使用useGLTF函式來取得scene與nodes
  const { scene, nodes } = useGLTF('/court-transformed.glb'); //檔案放在public

  // 使用useLayoutEffect函式，當元件第一次渲染時，就會執行函式中的程式碼。//備:這裡使用useEffect 畫面會閃一下。故使用useLayoutEffect
  //Scene.traverse 會將 scene 中的所有子物件，並對每個子物件依序執行一個提供的函數
  useLayoutEffect(() => {
    scene.traverse((o) => {
      //如果該物件是網格則將其從其父物件中移除
      if (o.isMesh) {
        if (o === nodes.GymFloor_ParquetShader_0) o.parent.remove(o);
        else
          applyProps(o, {
            castShadow: true, // 可以發出陰影
            receiveShadow: true, // 可以接收陰影
            'material-envMapIntensity': 0.1, // 材質環境地圖強度
          });
      }
    });
  }, [nodes.GymFloor_ParquetShader_0, scene]);
  // 將scene當作primitive物件傳入到props，並回傳此component
  return <primitive object={scene} {...props} />;
}

function Floor(props) {
  // useGLTF 用來加載一個包含 3D場景的 glTF 文件
  const { nodes, materials } = useGLTF('/court-transformed.glb');
  const { camera } = useThree();

  //取得相機當前的位置
  const position = camera.position.clone();

  //點擊floor地板，改變攝影機位置
  const handleClick = (e) => {
    // 取得目標位置
    const target = new THREE.Vector3(e.point.x, e.point.y, e.point.z);

    //使用Tween建立動畫滑動的效果
    new Tween(position)
      .to(target, 1000) //動畫持續的時間
      .onUpdate(() => {
        camera.position.copy(position); //更新相機位置
      })
      .start(); //開始動畫
  };

  return (
    <CubeCamera
      frames={1} //反射和環境貼圖的渲染次數
      position={[0, 0.5, 1]} // 相機在場景中的位置
      rotation={[0, 0, 0]} //相機的旋轉角度
      resolution={2048} //反射和環境貼圖的分辨率
      near={1} //相機的近端面
      far={1000} // 相機的遠端面
      {...props}
    >
      {(texture) => (
        <mesh
          receiveShadow //若為 true，表示該幾何體將接收陰影
          position={[-13.68, -0.467, 17.52]}
          scale={0.02} // 該幾何體的縮放比例
          geometry={nodes.GymFloor_ParquetShader_0.geometry} // 該幾何體使用的幾何形狀，這裡引入外部模型
          dispose={null} //該幾何體在被從場景中移除時不應該被自動銷毀
          onClick={(e) => handleClick(e)}
        >
          <meshStandardMaterial
            map={materials.ParquetShader.map} //漫反射-來自外部模型
            normalMap={materials.ParquetShader.normalMap} //指定材質的法線貼圖-來自外部模型
            normalMap-encoding={THREE.LinearEncoding} //指定法線貼圖的編碼方式
            envMap={texture} //指定反射和環境貼
            metalness={0.0} //指定物體的金屬度-{0,0}表示非金屬
            color='#aaa'
          />
        </mesh>
      )}
    </CubeCamera>
  );
}

//minPolarAngle={Math.PI / 2}屬性指定了相機在旋轉時的最小極角，設定為 Math.PI / 2（即90度），代表相機的上方向限制在垂直向上
//指定了相機在旋轉時的最大極角，這裡也是設定為 Math.PI / 2（即90度），代表相機的上方向限制在垂直向上。
//BakeShadows 預先計算並儲存到貼圖中，以提高場景渲染的性能
//Environment環境貼圖可以模擬日光、夜光、城市、山區等不同的環境光照效果

export default function App3() {
  // //滑鼠移動的軌跡
  // const [mousePos, setMousePos] = useState([0, 0, 0]);
  // const camera = useRef();

  // const onPointerMove = useCallback((e) => {
  //   const mouse = {
  //     x: (e.clientX / window.innerWidth) * 2 - 1,
  //     y: -(e.clientY / window.innerHeight) * 2 + 1,
  //   };

  //   setMousePos(mouse);
  // }, []);

  return (
    <Canvas
      frameloop='demand' //渲染循環-會在需要時自動啟動
      dpr={[1, 1.5]} //Canvas的裝置像素比，寬高會根據螢幕的DPR值而有所調整。
      shadows //物體可以投下陰影
      style={{ height: '100vh' }}
    >
      <fog attach='fog' args={['purple', 0, 130]} />
      <ambientLight intensity={0.1} />

      <group position={[0, -1, 0]}>
        <spotLight //group 可以將多個物體組成一個群組。燈、地板、建物模型等。
          castShadow //指定了聚光燈可以產生陰影
          intensity={10} //控制聚光燈的亮度大小
          angle={0.1} //聚光燈的照射角度為 0.1 弧度
          position={[-200, 220, -100]} //聚光燈的位置
          shadow-mapSize={[2048, 2048]} //聚光燈產生陰影的大小
          shadow-bias={-0.000001} //陰影的偏移量，避免產生陰影失真的情況
        />
        <spotLight
          angle={0.1}
          position={[-250, 120, -200]}
          intensity={1}
          castShadow
          shadow-mapSize={[50, 50]}
          shadow-bias={-0.000001}
        />
        <spotLight
          angle={0.1}
          position={[250, 120, 200]}
          intensity={1}
          castShadow
          shadow-mapSize={[50, 50]}
          shadow-bias={-0.000001}
        />
        <Court />
        <Floor />
      </group>

      <OrbitControls
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        enableDamping={false}
        enablePan={false}
      />
      <Environment
        files='https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/noon-grass/noon_grass_1k.hdr'
        background
      />

      <BakeShadows />
    </Canvas>
  );
}
