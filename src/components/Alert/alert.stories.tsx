import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Alert from './alert'

const defaultAlert = () => {
  return <Alert title="This is a Alert test"></Alert>
}

const stylesAlert = () => {
  return (
    <>
      <Alert title="This is Success" type="success"></Alert>
      <Alert title="This is Danger!" type="danger"></Alert>
      <Alert title="This is Warning!" type="warning" closable={false}></Alert>
    </>
  )
}
const descAlert = () => {
  return <Alert title="This is a title" description="This is a long description" onClose={action('closed')}></Alert>
}
storiesOf('Alert', module)
  .add('默认样式的 Alert', defaultAlert)
  .add('不同样式的 Alert', stylesAlert)
  .add('添加描述的 Alert', descAlert)