import React from 'react';
import './Home.styl';

import { Button, Icon } from 'antd';


interface HomeProps {

}

interface HomeState {

}

class Home extends React.Component<HomeProps, HomeState>{

  constructor(props: HomeProps) {
    super(props)
  }

  render() {
    console.log('553')
    return (
      <div className="home">
        <div className="header"></div>
        <article className="article">
          <Button type='primary'>按钮</Button>
        </article>
      </div>
    )
  }
}

export default Home;