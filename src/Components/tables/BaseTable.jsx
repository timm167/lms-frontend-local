import React from 'react';
import { useTable, useExpanded } from 'react-table';
import '../css/table.css';

const BaseTable = ({ data, columns }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useExpanded);

    return (
        <table {...getTableProps()} className="table base-table">
            <thead className="table-header">
                {headerGroups.map(headerGroup => {
                    const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                    return (
                        <tr key={headerGroupKey} {...headerGroupProps} className="table-header-row">
                            {headerGroup.headers.map(column => {
                                const { key: columnKey, ...columnProps } = column.getHeaderProps();
                                return (
                                    <th key={columnKey} {...columnProps} className="table-header-cell">
                                        {column.render('Header')}
                                    </th>
                                );
                            })}
                        </tr>
                    );
                })}
            </thead>
            <tbody {...getTableBodyProps()} className="table-body">
                {rows.map(row => {
                    prepareRow(row);
                    const { key: rowKey, ...rowProps } = row.getRowProps();
                    return (
                        <tr key={rowKey} {...rowProps} className="table-body-row">
                            {row.cells.map(cell => {
                                const { key: cellKey, ...cellProps } = cell.getCellProps();
                                return (
                                    <td key={cellKey} {...cellProps} className="table-body-cell">
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const ExpandableList = ({ data, label, itemKey, itemLabel }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    if (!data || data.length === 0) return <span>No {label}</span>;

    return (
        <div className="expandable-list-container">
            <button onClick={() => setIsExpanded(!isExpanded)} className="expandable-list-button">
                {isExpanded ? `▼ Hide ${label}` : `▶ Show ${label}`}
            </button>
            {isExpanded && (
                <ul className="expandable-list">
                    {data.map((item, index) => (
                        <div className="expandable-list-item-container">
                            <li key={`${item[itemKey]}-${index}`} className="expandable-list-item">
                                {item[itemLabel]}
                            </li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { ExpandableList, BaseTable };