// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { render, cleanup } from 'react-testing-library'
import { ignoreConsoleErrors } from 'test-utils'

afterEach(cleanup)

test('ref', () => {
  const H1 = styled.h1`
    font-size: 12px;
  `
  let node

  render(
    <H1
      ref={val => {
        node = val
      }}
      id="thing"
    >
      hello world
    </H1>
  )
  expect(node).toBe(document.getElementById('thing'))
})

test('innerRef', () => {
  ignoreConsoleErrors(() => {
    const H1 = styled.h1`
      font-size: 12px;
    `
    let node

    render(
      <H1
        innerRef={val => {
          node = val
        }}
        id="thing"
      >
        hello world
      </H1>
    )
    expect(node).toBe(document.getElementById('thing'))
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "\`innerRef\` is deprecated and will be removed in the next major version of Emotion, please use the \`ref\` prop instead",
  ],
]
`)
  })
})

test('innerRef and ref', () => {
  ignoreConsoleErrors(() => {
    const H1 = styled.h1`
      font-size: 12px;
    `
    let innerRef = React.createRef()
    let ref = React.createRef()

    render(
      <H1 innerRef={innerRef} ref={ref} id="thing">
        hello world
      </H1>
    )
    expect(ref.current).toBe(document.getElementById('thing'))
    expect(innerRef.current).toBeNull()
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "\`innerRef\` is deprecated and will be removed in the next major version of Emotion, please use the \`ref\` prop instead",
  ],
]
`)
  })
})
