import React from 'react'
import { AppSideBar, AppHeader, AppContent, AppFooter } from './index'

const DefaultLayout = () => {
  return (
    <>
    <AppHeader />
    <AppSideBar />
    <AppContent />
    <AppFooter />
    </>
  )
}

export default DefaultLayout
