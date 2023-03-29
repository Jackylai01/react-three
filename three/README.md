@react-three/drei:

1.BakeShadows：BakeShadows 可以將陰影效果儲存到網格中，以減少動態陰影的計算複雜度。它可以用於處理陰影投射，以更加真實地顯示實體物體的形狀，而不會影響渲染性能。

2.CubeCamera：CubeCamera 是用於創建立方体環境貼圖的工具，可以用來將環境光源貼到多個面上，以進行全球光照計算。

3.Environment：Environment 可以用於創建真實環境效果，包括景深，光照，環境貼圖，天空盒等。它也可以用於在模型之間添加假光源，以增加模型的細節度和外觀效果。

4.OrbitControls：OrbitControls 可以用於控制 3D 模型的旋轉和縮放，以及移動摄像機的角度和方向。這是一個非常方便的工具，可以讓您更輕鬆地探索 3D 模型的內部細節。

5.useBoxProjectedEnv：useBoxProjectedEnv 可以用於將環境貼圖投射到物體上，以更加真實地顯示光線的影響。

6.useGLTF：useGLTF 可以用於載入 GLTF 模型，以在 3D 空間中渲染。它可以用於載入 3D 模型，以及載入和渲染材質，形狀和光照。

@react-three/fiber:

1. useResource(): 讓你在 React 中創建原生 Three.js 資源，如網格，材質等。

2. useThree(): 提供 React Three.js 的基本上下文，讓你可以訪問 Three.js 內建的物件，如相機，光源，環境等。

3. useUpdate(): 讓你在更新 Three.js 資源時使用類似 React useState 的邏輯。

4. useFrame(): 讓你在每一個 Three.js 繪製框架中更新 React 的元件。

5. useLoader(): 讓你載入 Three.js 資源，如模型，圖像，音樂等。

6. useCamera(): 讓你訪問和控制 Three.js 相機的位置和角度。

7. useRaycaster(): 讓你在 Three.js 中建立射線，用於碰撞偵測

_OrbitControls_:控制相機移動和旋轉的元素

autoRotate：是否自動旋轉相機。
autoRotateSpeed：自動旋轉相機的速度。
dampingFactor：相機移動和旋轉的阻尼係數。
enableDamping：是否啟用相機移動和旋轉的阻尼效果。
enableKeys：是否啟用鍵盤控制相機移動和旋轉。
enablePan：是否啟用滑鼠平移控制相機移動。
enableRotate：是否啟用滑鼠旋轉控制相機旋轉。
enableZoom：是否啟用滑鼠滾輪控制相機縮放。
keyPanSpeed：鍵盤平移速度。
keys：自定義鍵盤控制相機移動和旋轉的按鍵。
maxAzimuthAngle：相機旋轉的最大方位角。
maxDistance：相機與目標點之間的最大距離。
maxPolarAngle：相機旋轉的最大極角。
maxZoom：相機的最大縮放倍率。
minAzimuthAngle：相機旋轉的最小方位角。
minDistance：相機與目標點之間的最小距離。
minPolarAngle：相機旋轉的最小極角。
minZoom：相機的最小縮放倍率。
panSpeed：平移速度。
rotateSpeed：旋轉速度。
screenSpacePanning：是否在屏幕空間進行平移。
target：相機的目標點。
zoomSpeed：縮放速度。
