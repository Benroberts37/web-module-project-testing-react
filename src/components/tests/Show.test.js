import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'

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

test('renders without errors', () => {
    render(<Show show={testData} selectedSeason={'none'}/>)
 });

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>)
    screen.getByText('Fetching data...')
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testData} selectedSeason={'none'}/>)
    const seasonOptions = screen.queryAllByTestId('season-option')
    expect(seasonOptions).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn()
    render(<Show show={testData} selectedSeason={"none"} handleSelect={handleSelect}/>)
    const select = screen.getByLabelText('Select a season')
    userEvent.selectOptions(select, ['1'])
    expect(handleSelect).toBeCalled()

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={testData} selectedSeason = {'none'}/>)
    let episodes = screen.getQueryByTestId('episodes-container')
    expect(episodes).not.toBeInTheDocument()
    rerender(<Show show={testData} selectedSeason={1}/>)
    episodes = screen.queryByTestId('episodes-container')
    expect(episodes).toBeInTheDocument()
});
