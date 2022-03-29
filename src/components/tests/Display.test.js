import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import fetchShow from '../../api/fetchShow';

const testData = {
    name: "Testing",
    summary: "Testing 123",
    seasons: [
        {
            id: 1,
            name: 'Testing 1',
            episodes: []
        },
        {
            id: 2,
            name: 'Testing 2',
            episodes: []
        }
    ]

}

test('renders without errors with no props', async () => { 
    render (<Display/>)
});

test('renders Show component when the button is clicked ', async () => { 
    fetchShow.mockResolvedValueOnce(testData)
    render(<Display/>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async () => { 
    fetchShow.mockResolvedValueOnce(testData)
    render(<Display/>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(2)
    })
});


