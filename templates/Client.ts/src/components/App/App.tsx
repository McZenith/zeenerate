import React from "react";
import { Button } from "wix-style-react";
import s from "./App.scss";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  return <Button>Hello World!</Button>;
};

export default App;
