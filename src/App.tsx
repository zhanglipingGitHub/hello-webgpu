import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface NavigatorWithGPU extends Navigator {
  gpu?: any;
}

const navigatorWithGPU = navigator as NavigatorWithGPU;

function App() {
  const [gpuAvailable, setGPUAvailable] = useState(false);

  useEffect(() => {
    if (navigatorWithGPU.gpu) {
      /**
       * 1. navigator.gpu.requestAdapter() 可以异步获取一个 GPUAdapter 实例
       * 2. adapter.RequestDevice() 可以异步获取一个 GPUDevice 实例
       */
      navigatorWithGPU.gpu.requestAdapter().then((adapter: any) => {
        if (adapter) {
          adapter.requestDevice().then((device: any) => {
            if (device) {
              setGPUAvailable(true);
            }
          })
        }
      })

      // const adapter = await navigatorWithGPU.gpu.requestAdapter();
      // const device = await adapter.requestDevice();
    }
  }, [])
  return (
    <div>
      Current WebGPU: {gpuAvailable ? '可用' : '不可用'}
    </div>
  );
}

export default App;
