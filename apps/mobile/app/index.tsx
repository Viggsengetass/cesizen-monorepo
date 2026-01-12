// apps/mobile/app/index.ts
import React from 'react';
import { registerRootComponent } from 'expo';
import AppLoadingProvider from './providers/AppLoadingProvider';

export default function App(): JSX.Element {
    return <AppLoadingProvider />;
}

registerRootComponent(App);
