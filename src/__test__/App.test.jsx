import { expect, describe, it, afterEach, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { act } from 'react-dom/test-utils'
import App from '../App'
expect.extend(matchers)

vi.mock('axios', () => ({
  __esModules: true,
  default: {
    request: () => ({
      data: {
        photos: [
          {
            id: 1,
            camera: { fullname: 'Mast Camera' },
            rover: { name: 'Curiosity' },
            earth_date: '2015-05-30',
            img_src: '',
          },
          {
            id: 2,
            camera: { fullname: 'Mast Camera' },
            rover: { name: 'Challenger' },
            earth_date: '2022-12-12',
            img_src: '',
          },
        ],
      },
    }),
  },
}))

describe('App layout', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
    vi.clearAllMocks()
  })

  it('should render the heading "Mars Photos Explorer"', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: /Mars Photos Explorer/i })
    expect(heading).toHaveTextContent(/Mars Photos Explorer/i)
  })

  it('should not render "Loading"', async () => {
    await act(async () => {
      render(<App />)
      const heading = screen.queryByText(/loading photos.../)
      await waitFor(() => expect(heading).not.toBeInTheDocument())
    })
  })
  // it('should render error in case there was a problem connecting to the API', async () => {
  //   await act(async () => {
  //     render(<App />)
  //     const heading = await screen.findByText(/There was an error loading photos/i, undefined, { timeout: 3000 })
  //     expect(heading).toBeInTheDocument()
  //   })
  // })
  it('should render 2 cards', async () => {
    await act(async () => {
      render(<App />)
      const cards = await screen.findAllByTestId(/photo-card/i)
      expect(cards).toHaveLength(2)
    })
  })
  it('should render at least 1 card with the text "Taken on: 2015-05-30"', async () => {
    await act(async () => {
      render(<App />)
      const cards = await screen.findAllByText(/Taken on: 2015-05-30/i)
      expect(cards).toBeTruthy()
    })
  })
  it('should show the modal when a card is clicked', async () => {
    await act(async () => {
      render(<App />)
      const card = await screen.findByText(/Taken on: 2015-05-30/i)
      fireEvent.click(card)
      const slider = await screen.findByTestId('slider')
      expect(slider).toBeTruthy()
    })
  })
  it('should close the modal when the close button is clicked', async () => {
    await act(async () => {
      render(<App />)
      const card = await screen.findAllByText(/Taken on: 2015-05-30/i)
      fireEvent.click(card[0])
      const slider = await screen.findByTestId('slider')
      const closeButton = await screen.findByText(/close/i)
      fireEvent.click(closeButton)
      expect(slider).not.toBeInTheDocument()
    })
  })

  
})
