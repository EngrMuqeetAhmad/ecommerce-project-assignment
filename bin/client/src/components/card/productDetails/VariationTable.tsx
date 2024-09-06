import React, { FC } from 'react';
import Table from 'react-bootstrap/Table';
import { VariationType } from '../../../types/product.types';

export const VariationTable: FC<VariationType> = ({ variations }) => {
  const maxRows = Math.max(...variations.map((item) => item.values.length));

  return (
    <>
      <Table bordered size="sm">
        <thead>
          <tr>
            {variations.map((item, index) => (
              <th key={index}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Create rows based on the max number of values in any category */}
          {Array.from({ length: maxRows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {variations.map((item, colIndex) => (
                <td key={colIndex}>
                  {/* Display the value if it exists, otherwise display an empty cell */}
                  {item.values[rowIndex] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
