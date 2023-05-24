import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

import React from 'react'

export const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  )
}
