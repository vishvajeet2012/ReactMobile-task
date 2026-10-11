import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { RootLayout } from '../components/layout/root-layout'
import { SignUpPage } from '../pages/sign-up'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SignUpPage,
})

const routeTree = rootRoute.addChildren([signUpRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
