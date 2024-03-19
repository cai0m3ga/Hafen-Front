import { render, screen, cleanup } from '@testing-library/react';
import DataList from "components/Utils/dataList.jsx";

test('Should render Loading', () => {

    render(<DataList loading={true} />);

    const element = screen.getByTestId('dataList-loading');
    expect(element).toBeInTheDocument;

});

test('Should render Table', () => {

    render(<DataList

        loading={false}
        tableData={[{ name: 'Name' }]}
        tableCollumns={[
            { name: 'name', size: 50, property: 'name' }
        ]} 
        
        />
    );

    const element = screen.getByTestId('dataList-table');
    expect(element).toBeInTheDocument;

});

test('Should render Collumn', () => {

    render(<DataList

        loading={false}
        tableData={[{ name: 'Name' }]}
        tableCollumns={[
            { name: 'testCollumn', size: 50, property: 'testCollumn' }
        ]} 
        
        />
    );

    const element = screen.getByTestId('dataList-collumn-testCollumn');
    expect(element).toBeInTheDocument;

});